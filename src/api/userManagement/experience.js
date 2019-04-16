import axios from '@/libs/api.request'

// 编辑经验类型修改
export const edit = (data) => {
  let params = new URLSearchParams()
  params.append('eid', data.eid)
  params.append('name', data.name)
  return axios.request({
    url: '/common/editExperience',
    data: params,
    method: 'post'
  })
}

// 获取经验类型列表
export const get = (data) => {
  return axios.request({
    url: '/common/getExperiences',
    method: 'post'
  })
}

// 获取经验类型添加
export const add = (data) => {
  let params = new URLSearchParams()
  params.append('name', data.name)
  return axios.request({
    url: '/common/addExperience',
    data: params,
    method: 'post'
  })
}

import axios from '@/libs/api.request'

// 编辑经验类型修改
export const edit = (data) => {
  let params = new URLSearchParams()
  params.append('sid', data.eid)
  params.append('name', data.name)
  return axios.request({
    url: '/common/editSalary',
    data: params,
    method: 'post'
  })
}

// 获取经验类型列表
export const get = (data) => {
  return axios.request({
    url: '/common/getSalarys',
    method: 'post'
  })
}

// 获取经验类型添加
export const add = (data) => {
  let params = new URLSearchParams()
  params.append('name', data.name)
  return axios.request({
    url: '/common/addSalary',
    data: params,
    method: 'post'
  })
}

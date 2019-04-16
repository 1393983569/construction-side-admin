import axios from '@/libs/api.request'

export const getPageListAll = (pageNum) => {
  let params = new URLSearchParams()
  params.append('pageSize', -1)
  return axios.request({
    url: 'worker/getPageList',
    data: params,
    method: 'post'
  })
}

export const add = (res) => {
  let params = new URLSearchParams()
  for (let key in res) {
    params.append(key, res[key])
  }
  return axios.request({
    url: 'workerbinding/add',
    data: params,
    method: 'post'
  })
}

export const getPageListProfession = () => {
  let params = new URLSearchParams()
  params.append('pageSize', -1)
  return axios.request({
    url: 'type/getPageList',
    data: params,
    method: 'post'
  })
}

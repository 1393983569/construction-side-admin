import axios from '@/libs/api.request'

export const getPageList = (pageNum, profession) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  if (profession) params.append('profession', profession)
  return axios.request({
    url: 'type/getPageList',
    data: params,
    method: 'post'
  })
}

export const edit = (tId) => {
  let params = new URLSearchParams()
  params.append('state', 0)
  params.append('tId', tId)
  return axios.request({
    url: 'type/edit',
    data: params,
    method: 'post'
  })
}
export const add = (profession) => {
  let params = new URLSearchParams()
  params.append('profession', profession)
  return axios.request({
    url: 'type/add',
    data: params,
    method: 'post'
  })
}

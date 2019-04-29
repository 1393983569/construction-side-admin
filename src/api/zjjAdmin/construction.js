import axios from '@/libs/api.request'

export const getPageListByDept = (pageNum, selectValue) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  return axios.request({
    url: 'project/getPageListByDept',
    data: params,
    method: 'post'
  })
}

export const projectGetPageList = (pageNum) => {
  return axios.request({
    url: 'project/getPageList',
    method: 'get'
  })
}

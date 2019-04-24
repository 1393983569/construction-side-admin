import axios from '@/libs/api.request'

export const getPageList = (pageNum, pid) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  params.append('pid', pid)
  return axios.request({
    url: 'workerbinding/getPageList',
    data: params,
    method: 'post'
  })
}

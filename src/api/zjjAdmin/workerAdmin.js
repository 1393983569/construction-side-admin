import axios from '@/libs/api.request'

export const getAdmins = (pageNum) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  params.append('accountType', 4)
  return axios.request({
    url: 'getAdmins',
    data: params,
    method: 'post'
  })
}

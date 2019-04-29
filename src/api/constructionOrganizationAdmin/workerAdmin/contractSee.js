import axios from '@/libs/api.request'

export const workerContractGetList = (wid) => {
  return axios.request({
    url: `workerContract/getPageList?id=${wid}&pageSize=100`,
    method: 'get'
  })
}

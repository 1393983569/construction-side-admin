import axios from '@/libs/api.request'

export const attendance = (pageNum, wid) => {
  return axios.request({
    url: `attendance/getPageList?wId=${wid}&pageNum=${pageNum}`,
    method: 'get'
  })
}

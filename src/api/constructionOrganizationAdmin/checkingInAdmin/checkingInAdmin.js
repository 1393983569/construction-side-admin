import axios from '@/libs/api.request'

export const getClockInList = (pageNum, pId, wId) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  params.append('pId', pId)
  params.append('wId', wId)
  return axios.request({
    url: 'cardInfo/getPageList',
    data: params,
    method: 'post'
  })
}

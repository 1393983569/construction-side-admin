import axios from '@/libs/api.request'

export const getPageList = (pageNum, select) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  if (select.investMain) params.append('investMain', select.investMain)
  if (select.projectNum) params.append('projectNum', select.projectNum)
  return axios.request({
    url: 'project/getPageList',
    data: params,
    method: 'post'
  })
}

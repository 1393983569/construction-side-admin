import axios from '@/libs/api.request'

export const queryOfWorkerTime = (pageNum, createTime, pId, state) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  params.append('pId', pId)
  params.append('state', 0)
  params.append('createTime', createTime)
  return axios.request({
    url: 'workerSalary/getPageListByOther',
    data: params,
    method: 'post'
  })
}

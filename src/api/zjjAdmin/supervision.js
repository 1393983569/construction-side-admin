import axios from '@/libs/api.request'

export const getPageDepts = () => {
  // let params = new URLSearchParams()
  // params.append('accountName', userName)
  // params.append('accountPass', password)
  return axios.request({
    url: 'dept/getPageDepts',
    // data: params,
    method: 'post'
  })
}

// 申请时间列表
export const getTime = (pid, dealState) => {
  let params = new URLSearchParams()
  params.append('pId', pid)
  // params.append('isWarning', -1)
  params.append('state', -1)
  if (dealState) params.append('dealState', dealState)
  return axios.request({
    url: 'proBank/getPageList',
    data: params,
    method: 'post'
  })
}

export const getPageListOfWarnWorker = (pageNum, corpCode, projectCode, isBackPay) => {
  let params = new URLSearchParams()
  if (corpCode) params.append('corpCode', corpCode)
  if (projectCode) params.append('projectCode', projectCode)
  params.append('pageNum', pageNum)
  params.append('pageSize', 10)
  if (isBackPay) params.append('isBackPay', isBackPay)
  return axios.request({
    url: 'workerSalary/getPageListOfWarnWorker',
    data: params,
    method: 'post'
  })
}

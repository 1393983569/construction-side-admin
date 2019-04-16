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

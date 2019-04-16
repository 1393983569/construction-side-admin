import axios from '@/libs/api.request'

export const getPropject = (did) => {
  let params = new URLSearchParams()
  params.append('pageSize', -1)
  params.append('did', did)
  return axios.request({
    url: 'project/getPageList',
    data: params,
    method: 'post'
  })
}

// 不分页 查询施工单位列表
export const getPageDepts = (type) => {
  let params = new URLSearchParams()
  params.append('pageSize', -1)
  if (type) params.append('type', type)
  return axios.request({
    url: 'dept/getPageDepts',
    data: params,
    method: 'post'
  })
}

// （银行）查询时间下的工人
export const workerSalaryGetPageList = (pageNum, state, pid, pbId) => {
  let params = new URLSearchParams()
  // params.append('state', state)
  for (let key in state) {
    params.append(key, state[key])
  }
  // params.append('pid', pid)
  params.append('pageNum', pageNum)
  if (pbId) params.append('pbId', pbId)
  return axios.request({
    url: 'workerSalary/getPageList',
    data: params,
    method: 'post'
  })
}

// 发工资
export const payoff = (id) => {
  let params = new URLSearchParams()
  params.append('wsId', id)
  params.append('state', 1)
  return axios.request({
    url: 'workerSalary/edit',
    data: params,
    method: 'post'
  })
}

// 申请时间列表
export const getTime = (pid, state, dealState) => {
  let params = new URLSearchParams()
  params.append('pId', pid)
  if (state) params.append('state', state)
  if (dealState) params.append('dealState', dealState)
  return axios.request({
    url: 'proBank/getPageList',
    data: params,
    method: 'post'
  })
}

// 申请时间列表
export const payOff = (pbId, pId, allSalary) => {
  let params = new URLSearchParams()
  params.append('pbId', pbId)
  params.append('pId', pId)
  params.append('allSalary', allSalary)
  return axios.request({
    url: 'workerSalary/payOff',
    data: params,
    method: 'post'
  })
}

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

/**
 * 查询当前银行可以看到的项目
 */
export const getListOfPro = () => {
  return axios.request({
    url: 'workerSalary/getListOfPro',
    method: 'get'
  })
}

/**
 * 查询项目参建单位下拉列表
 * @param {*} projectCode
 */
export const projectCorpGetList = (projectCode) => {
  return axios.request({
    url: `projectCorp/getList?projectCode=${projectCode}`,
    method: 'get'
  })
}

/**
 * 查询项目班组下拉列表
 * @param {*} projectCode
 */
export const projectCorpTeamGetList = (projectCode) => {
  return axios.request({
    url: `projectCorpTeam/getList?projectCorpId=${projectCode}`,
    method: 'get'
  })
}

export const getPageListGetList = (projectCropTeamId) => {
  return axios.request({
    url: `proBank/getPageList?projectCropTeamId=${projectCropTeamId}`,
    method: 'get'
  })
}

// （银行）查询时间下的工人
export const workerSalaryGetPageList = (pageNum, pbId, workerName) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  if (pbId) params.append('pbId', pbId)
  if (workerName) params.append('workerName', workerName)
  return axios.request({
    url: 'workerSalary/getPageList',
    data: params,
    method: 'post'
  })
}

// (住建局使用)根据预警时间查询工人
export const getPageListByOtherPageList = (pageNum, pbId) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  if (pbId) params.append('pbId', pbId)
  return axios.request({
    url: 'workerSalary/getPageListByOther',
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
export const payOff = (pbId, actualAmount) => {
  let params = new URLSearchParams()
  params.append('id', pbId)
  // params.append('pId', pId)
  params.append('actualAmount', actualAmount)
  return axios.request({
    url: 'workerSalary/edit',
    data: params,
    method: 'post'
  })
}

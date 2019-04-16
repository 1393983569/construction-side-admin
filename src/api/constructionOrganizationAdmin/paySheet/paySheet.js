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

// 获取项目列表
export const getProjectListAll = () => {
  let params = new URLSearchParams()
  params.append('pageSize', -1)
  return axios.request({
    url: 'project/getPageList',
    data: params,
    method: 'post'
  })
}

// 模拟打卡 添加保存工人打卡记录
export const cardInfoAdd = (cardNum, mainboardNum) => {
  let params = new URLSearchParams()
  params.append('cardNum', cardNum)
  params.append('frontDoor', '1')
  params.append('backDoor', '0')
  params.append('mainboardNum', mainboardNum)
  return axios.request({
    url: 'cardInfo/add',
    data: params,
    method: 'post'
  })
}

// 分页查询工人打卡记录列表
export const getPageListRecord = (pageNum, pId, wId) => {
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

// 添加保存工地向银行的申请信息
export const proBankAdd = (pId, wId, realSalary) => {
  let params = new URLSearchParams()
  params.append('realSalary', realSalary)
  params.append('pId', pId)
  params.append('wId', wId)
  return axios.request({
    url: 'proBank/add',
    data: params,
    method: 'post'
  })
}

// 查询预警时间
export const queryOfWorkerTime = (pId, wId) => {
  let params = new URLSearchParams()
  params.append('pId', pId)
  params.append('wId', wId)
  return axios.request({
    url: 'proBank/queryOfWorkerTime',
    data: params,
    method: 'post'
  })
}

// 查询预警时间
export const addOfWarn = (object) => {
  let params = new URLSearchParams()
  params.append('object', JSON.stringify(object))
  return axios.request({
    url: 'proBank/addOfWarn',
    data: params,
    method: 'post'
  })
}

// 分页查询考勤统计列表
export const statisticGetPageList = (pageNum, pId, wId, workerName, startDate, endDate) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  params.append('pId', pId)
  params.append('wId', wId)
  if (workerName) params.append('workerName', workerName)
  if (startDate) params.append('startDate', startDate)
  if (endDate) params.append('endDate', endDate)
  return axios.request({
    url: 'statistic/getPageList',
    data: params,
    method: 'post'
  })
}

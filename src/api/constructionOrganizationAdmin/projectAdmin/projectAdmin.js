import axios from '@/libs/api.request'

export const getPageList = (pageNum) => {
  return axios.request({
    url: `project/getPageList?pageNum=${pageNum}&pageSize=15`,
    method: 'get'
  })
}

/**
 * 添加保存项目培训
 */
export const trainAdd = (obj) => {
  let params = new URLSearchParams()
  params.append('object', JSON.stringify(obj))
  return axios.request({
    url: 'train/add',
    data: params,
    method: 'post'
  })
}

/**
 * 查询工人列表
 * @param {*} projectCode
 */
export const workerGetPageList = (projectCode) => {
  let params = new URLSearchParams()
  params.append('projectCode', projectCode)
  return axios.request({
    url: 'worker/getPageList',
    method: 'post'
  })
}

/**
 * 根据项目编码查询项目详情
 * @param {*} projectCode
 */
export const projectQuery = (projectCode) => {
  return axios.request({
    url: `project/query?projectCode=${projectCode}`,
    method: 'get'
  })
}

/**
 * 添加主板编码
 * @param {*} mainboardNum
 */
export const projectAddMainboardNum = (mainboardNum, projectCode) => {
  let params = new URLSearchParams()
  params.append('mainboardNum', mainboardNum)
  params.append('projectCode', projectCode)
  return axios.request({
    url: 'project/add',
    data: params,
    method: 'post'
  })
}

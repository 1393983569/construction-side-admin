import axios from '@/libs/api.request'

export const getPageDepts = (pageNum) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  return axios.request({
    url: 'project/getPageList',
    data: params,
    method: 'post'
  })
}

export const getAdmins = (pageNum) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  params.append('accountType', 3)
  return axios.request({
    url: 'admin/getAdmins',
    data: params,
    method: 'post'
  })
}

/**
 * 查询项目基本列表
 * @param pageNum 页码
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const projectGetPageList = (pageNum) => {
  return axios.request({
    url: `project/getPageList?pageNum=${pageNum}&pageSize=15`,
    method: 'get'
  })
}

/**
 * 修改项目(添加主板号，修改状态)
 * @param bondState
 * @param grantState
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const projectAdd = (bondState, grantState, id) => {
  let params = new URLSearchParams()
  if (bondState) params.append('bondState', bondState)
  if (grantState) params.append('grantState', grantState)
  if (id) params.append('id', id)
  return axios.request({
    url: 'project/add',
    data: params,
    method: 'post'
  })
}

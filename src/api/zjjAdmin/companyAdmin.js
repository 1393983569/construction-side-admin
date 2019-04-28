import axios from '@/libs/api.request'

export const getPageDepts = (pageNum, selectValue) => {
  return axios.request({
    url: `corp/getPageList?pageNum=${pageNum}${selectValue.deptName ? `&&deptName=${selectValue.deptName}` : ''}`,
    method: 'get'
  })
}

export const editState = (pid, dstate, reason) => {
  let params = new URLSearchParams()
  params.append('pid', pid)
  params.append('pstate', dstate)
  if (reason) params.append('remark', reason)
  return axios.request({
    url: 'project/editState',
    data: params,
    method: 'post'
  })
}

export const getProjectList = (did) => {
  let params = new URLSearchParams()
  params.append('did', did)
  params.append('pageSize', -1)
  return axios.request({
    url: 'project/getPageList',
    data: params,
    method: 'post'
  })
}

export const overProjectApi = (pid) => {
  let params = new URLSearchParams()
  params.append('pid', pid)
  params.append('pstate', -1)
  return axios.request({
    url: 'project/edit',
    data: params,
    method: 'post'
  })
}

export const projectQuery = (pid) => {
  let params = new URLSearchParams()
  params.append('pid', pid)
  return axios.request({
    url: 'project/query',
    data: params,
    method: 'post'
  })
}

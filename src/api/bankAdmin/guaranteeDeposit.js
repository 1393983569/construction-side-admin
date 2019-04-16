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

export const deptEditState = (pid, bondState, grantState) => {
  let params = new URLSearchParams()
  params.append('pid', pid)
  if (bondState) params.append('bondState', bondState)
  if (grantState) params.append('grantState', grantState)
  return axios.request({
    url: 'project/editState',
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

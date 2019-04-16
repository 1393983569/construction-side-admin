import axios from '@/libs/api.request'

export const add = (projectName, projectType, chargeName, chargePhone, parentId) => {
  let params = new URLSearchParams()
  params.append('projectName', projectName)
  params.append('projectType', projectType)
  params.append('chargeName', chargeName)
  params.append('chargePhone', chargePhone)
  params.append('parentId', parentId)
  params.append('type', 2)
  return axios.request({
    url: 'project/add',
    data: params,
    method: 'post'
  })
}

export const getPageList = (parentId) => {
  let params = new URLSearchParams()
  params.append('pageSize', -1)
  params.append('parentId', parentId)
  params.append('type', 2)
  return axios.request({
    url: 'project/getPageList',
    data: params,
    method: 'post'
  })
}

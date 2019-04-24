import axios from '@/libs/api.request'

export const add = (obj) => {
  let params = new URLSearchParams()
  for (let key in obj) {
    params.append(key, obj[key])
  }
  return axios.request({
    url: 'project/add',
    data: params,
    method: 'post'
  })
}

export const getPageList = (projectCode) => {
  return axios.request({
    url: `projectCorp/getPageList?projectCode=${projectCode}`,
    method: 'GET'
  })
}

export const addUnity = (obj) => {
  let params = new URLSearchParams()
  for (let key in obj) {
    if (obj[key]) {
      params.append(key, obj[key])
    }
  }
  return axios.request({
    url: 'projectCorp/add',
    data: params,
    method: 'post'
  })
}

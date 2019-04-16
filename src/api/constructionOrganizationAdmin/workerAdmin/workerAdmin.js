import axios from '@/libs/api.request'

export const getPageList = (pageNum, selectValue) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  for (let key in selectValue) {
    if (selectValue[key]) params.append(key, selectValue[key])
  }
  return axios.request({
    url: 'workerbinding/getPageList',
    data: params,
    method: 'post'
  })
}

export const getPageListOfWorker = (pageNum, selectValue) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  for (let key in selectValue) {
    if (selectValue[key]) params.append(key, selectValue[key])
  }
  return axios.request({
    url: 'workerSalary/getPageListOfWorker',
    data: params,
    method: 'post'
  })
}

export const workerQuery = (pageNum, selectValue) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  for (let key in selectValue) {
    if (selectValue[key]) params.append(key, selectValue[key])
  }
  return axios.request({
    url: 'worker/getPageList',
    data: params,
    method: 'post'
  })
}

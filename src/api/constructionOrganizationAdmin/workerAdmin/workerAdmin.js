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

/**
 * 查询工人列表
 * @param {*} pageNum
 * @param {*} selectValue
 */
export const workerQuery = (pageNum, selectList) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  if (selectList.length !== 0 && selectList.length) {
    selectList.forEach(item => {
      for (let key in item) {
        if (item[key]) params.append(key, item[key])
      }
    })
  }
  return axios.request({
    url: 'worker/getPageList',
    data: params,
    method: 'post'
  })
}

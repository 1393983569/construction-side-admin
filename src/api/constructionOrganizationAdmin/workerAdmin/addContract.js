import axios from '@/libs/api.request'

/**
 * 添加保存工人合同
 * @param {*} obj
 */
export const add = (obj) => {
  let params = new URLSearchParams()
  let data = {}
  for (let key in obj) {
    if (obj[key]) data[key] = obj[key]
  }
  data = JSON.stringify(data)
  params.append('object', data)
  return axios.request({
    url: 'workerContract/add',
    data: params,
    method: 'post'
  })
}

/**
 * 添加保存工人
 * @param {*} obj
 */
export const workerAdd = (obj) => {
  let params = new URLSearchParams()
  for (let key in obj) {
    if (obj[key])   params.append(key, obj[key])
  }
  return axios.request({
    url: 'worker/add',
    data: params,
    method: 'post'
  })
}

/**
 * 修改工人
 * @param {*} obj
 */
export const workerEdit = (obj) => {
  let params = new URLSearchParams()
  for (let key in obj) {
    if (obj[key])   params.append(key, obj[key])
  }
  return axios.request({
    url: 'worker/edit',
    data: params,
    method: 'post'
  })
}

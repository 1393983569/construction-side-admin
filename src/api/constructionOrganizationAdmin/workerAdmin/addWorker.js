import axios from '@/libs/api.request'

/**
 * 添加保存工人
 * @param {*} obj
 */
export const add = (obj) => {
  let params = new URLSearchParams()
  for (let key in obj) {
    if (obj[key]) params.append(key, obj[key])
  }
  return axios.request({
    url: 'worker/add',
    data: params,
    method: 'post'
  })
}

export const edit = (res) => {
  let params = new URLSearchParams()
  for (let key in res) {
    if (res[key]) params.append(key, res[key])
  }
  return axios.request({
    url: 'worker/edit',
    data: params,
    method: 'post'
  })
}

export const queryWork = (idCardNum) => {
  let params = new URLSearchParams()
  params.append('idCardNum', idCardNum)
  return axios.request({
    url: 'worker/query',
    data: params,
    method: 'post'
  })
}

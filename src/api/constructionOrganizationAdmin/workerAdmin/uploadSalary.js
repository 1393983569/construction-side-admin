import axios from '@/libs/api.request'

/**
 * 添加保存工人合同
 * @param {*} obj
 */
export const add = (obj) => {
  let params = new URLSearchParams()
  for (let key in obj) {
    if (obj[key]) params.append(key, obj[key])
  }
  return axios.request({
    url: 'proBank/add',
    data: params,
    method: 'post'
  })
}

/**
 * 工地向银行提交工资单时查询工人列表
 * @param {*} obj
 */
export const upWorkerSalary = (obj) => {
  let params = new URLSearchParams()
  for (let key in obj) {
    if (obj[key])   params.append(key, obj[key])
  }
  return axios.request({
    url: 'workerSalary/getPageListOfWorker',
    data: params,
    method: 'post'
  })
}

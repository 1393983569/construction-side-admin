import axios from '@/libs/api.request'

/**
 * 查询项目培训 列表
 * @param {*} wid
 */
export const trainGetPageList = (projectCode) => {
  return axios.request({
    url: `train/getPageList?projectCode=${projectCode}&pageSize=100`,
    method: 'get'
  })
}

export const trainQuery = (id) => {
  return axios.request({
    url: `train/query?id=${id}`,
    method: 'get'
  })
}

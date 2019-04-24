import axios from '@/libs/api.request'

/**
 * 查询地区编码列表
 * @param parentId
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const getAreaCodeList = (parentId) => {
  let url = 'getProvinceList'
  if (parentId) {
    url = `areaCode/getPageList?parentId=${parentId}`
  } else {
    url = 'areaCode/getPageList'
  }
  return axios.request({
    url: url,
    method: 'get'
  })
}

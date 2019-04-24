import axios from '@/libs/api.request'

export const add = (addObj) => {
  console.log(addObj)
  let params = new URLSearchParams()
  if (addObj.areaCode) {
    addObj.areaCode = addObj.areaCode[addObj.areaCode.length -1]
  }
  for (let key in addObj) {
    if (addObj[key]) {
      params.append(key, addObj[key])
    }
  }
  return axios.request({
    url: 'corp/add',
    data: params,
    method: 'post'
  })
}

export const getAdminsList = (accountType) => {
  let params = new URLSearchParams()
  params.append('accountType', accountType)
  return axios.request({
    url: 'getAdmins',
    data: params,
    method: 'post'
  })
}

export const getAreaCodeList = () => {
  return axios.request({
    url: 'areaCode/getPageList',
    method: 'get'
  })
}

import axios from '@/libs/api.request'

export const add = (addObj) => {
  const { deptName, deptPhone, deptNum, deptAddr, cityId, dLoginName, allowPic, bankId, buildId } = addObj
  console.log(addObj)
  let params = new URLSearchParams()
  params.append('deptName', deptName)
  params.append('deptPhone', deptPhone)
  params.append('allowPic', allowPic)
  params.append('deptNum', deptNum)
  params.append('deptAddr', deptAddr)
  params.append('cityId', cityId[2])
  params.append('dLoginName', dLoginName)
  params.append('bankId', bankId)
  params.append('buildId', buildId)
  return axios.request({
    url: 'dept/add',
    // headers: {
    //   'Content-Type': 'application/json;charset=UTF-8'
    // },
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

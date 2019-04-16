import axios from '@/libs/api.request'

export const add = ({ projectNum, projectName, projectAddr, buildSize,
                      investSize, projectType, investMain, cityId, mainboardNum,
                      endTime, startTime, bankId, chargeName, chargePhone, buildId }) => {
  let params = new URLSearchParams()
  params.append('projectNum', projectNum)
  params.append('projectName', projectName)
  params.append('projectAddr', projectAddr)
  params.append('buildSize', buildSize)
  params.append('investSize', investSize)
  params.append('projectType', projectType)
  params.append('investMain', investMain)
  params.append('mainboardNum', mainboardNum)
  params.append('startTime', startTime)
  params.append('bankId', bankId)
  params.append('endTime', endTime)
  params.append('cityId', cityId[2])
  params.append('chargeName', chargeName)
  params.append('chargePhone', chargePhone)
  params.append('buildId', buildId)
  return axios.request({
    url: 'project/add',
    data: params,
    method: 'post'
  })
}
// 分页查询管理员
export const getAdminsBank = () => {
  let params = new URLSearchParams()
  params.append('pageNum', -1)
  params.append('accountType', 3)
  return axios.request({
    url: 'getAdmins',
    data: params,
    method: 'post'
  })
}

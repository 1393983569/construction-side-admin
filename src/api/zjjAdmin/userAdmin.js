import axios from '@/libs/api.request'

export const getAdmins = (pageNum) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  params.append('accountType', 4)
  return axios.request({
    url: 'getAdmins',
    data: params,
    method: 'post'
  })
}

export const editPsw = (accountName, accountPass, newPass) => {
  let params = new URLSearchParams()
  params.append('accountName', accountName)
  params.append('accountPass', accountPass)
  params.append('newPass', newPass)
  return axios.request({
    url: 'editPsw',
    data: params,
    method: 'post'
  })
}

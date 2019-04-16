import axios from '@/libs/api.request'

export const edit = ({logid, workerType, workerSalary, workerNum, cardNum}) => {
  let params = new URLSearchParams()
  params.append('logid', logid)
  params.append('workerType', workerType)
  params.append('workerSalary', workerSalary)
  params.append('workerNum', workerNum)
  params.append('cardNum', cardNum)
  return axios.request({
    url: 'workerbinding/edit',
    data: params,
    method: 'post'
  })
}

export const getPageListProfession = () => {
  let params = new URLSearchParams()
  params.append('pageSize', -1)
  return axios.request({
    url: 'type/getPageList',
    data: params,
    method: 'post'
  })
}

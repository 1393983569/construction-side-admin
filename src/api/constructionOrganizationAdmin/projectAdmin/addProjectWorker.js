import axios from '@/libs/api.request'

export const getPageListAll = (pageNum) => {
  let params = new URLSearchParams()
  params.append('pageSize', -1)
  return axios.request({
    url: 'worker/getPageList',
    data: params,
    method: 'post'
  })
}

export const add = (res) => {
  let data = {}
  let params = new URLSearchParams()
  if (!res.entryTime) {
    delete res.entryAttachments
  }
  if (!res.exitTime) {
    delete res.exitAttachments
  }
  for (let key in res) {
    if (res[key]) {
      data[key] = res[key]
    }
  }
  params.append('object', JSON.stringify(data))
  return axios.request({
    url: 'projectCorpTeam/add',
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

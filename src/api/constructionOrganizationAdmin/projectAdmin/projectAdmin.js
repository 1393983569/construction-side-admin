import axios from '@/libs/api.request'

export const getPageList = (pageNum) => {
  console.log('sssssss')
  return axios.request({
    url: `project/getPageList?pageNum=${pageNum}&pageSize=15`,
    method: 'get'
  })
}

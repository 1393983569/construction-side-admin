import axios from '@/libs/api.request'

// 项目列表
export const salaryStatistic = (pageNum) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  return axios.request({
    url: 'workerSalary/salaryStatistic',
    data: params,
    method: 'post'
  })
}

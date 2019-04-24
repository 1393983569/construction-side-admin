import axios from '@/libs/api.request'

export const projectCorpTeam = (pageNum, projectCorpId, teamName) => {
  return axios.request({
    url: `projectCorpTeam/getPageList?pageNum=${pageNum}&${teamName ? `teamName=${teamName}` : ''}&projectCorpId=${projectCorpId}`,
    method: 'get'
  })
}

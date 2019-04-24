// http://localhost:8090/api/ReadMsg
import jsonp from 'jsonp'
/**
 * 获取身份证信息
 */
export const addReadMsg = () => {
  return new Promise((resolve, reject) => {
    jsonp('http://localhost:8090/api/ReadMsg', null, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

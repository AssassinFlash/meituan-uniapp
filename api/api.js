const listing = function (urling) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: urling,
      method: 'GET',
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
// post
const publicing = function (urling, shopdata) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: urling,
      data: shopdata,
      method: 'post',
      success: (res) => {
        resolve(res.data)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}
export { listing, publicing }

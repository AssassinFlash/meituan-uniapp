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
export { listing }

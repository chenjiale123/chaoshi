const baseUrl = 'http://120.206.184.170:8887/';
const url = 'http://dev.static.qianyipan.com/'

const http = ({ url = '', param = {}, ...other } = {}) => {
  wx.showLoading({
    title: '请求中，请耐心等待..'
  });
  let timeStart = Date.now();
  return new Promise((resolve, reject) => {
    console.log(url, other)
    wx.request({
      url: getUrl(url),
      data: param,
      header: {
        'content-type': other.method == 'get' ? 'application/json' : 'application/x-www-form-urlencoded'
      },
      ...other,
      complete: (res) => {
        wx.hideLoading();
        console.log(`耗时${Date.now() - timeStart}`);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else {
          reject(res)
        }
      }
    })
  })
}

const getUrl = (url) => {
  if (url.indexOf('://') == -1) {
    url = baseUrl + url;
  }
  return url
}

// get方法
const _get = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'get'
  })
}

const _post = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'post'
  })
}

const _put = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'put'
  })
}

const _delete = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'put'
  })
}
module.exports = {
  url,
  baseUrl,
  _get,
  _post,
  _put,
  _delete
}
export const commonParams = {
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

export const options = {
  param: 'jsonpCallback',
  prefix: 'jp'
}

export const ERR_OK = 0

export const prefixHost = {
  prefixHost: process.env.NODE_ENV === 'development' ? 'https://u.y.qq.com/cgi-bin/musics.fcg' : 'http://192.168.1.104:9000'
}
export default function (req, res, next) {
  const host = req.headers.host
  const url = req.url
  const env = process.env.NODE_ENV
  const forceDomain = 'http://shadow-of-tales.ru
  '

  if (env === 'production' && host === 'shadowfoftales.ru') {
    res.writeHead(301, { Location: forceDomain + url })
    return res.end()
  }

  return next()
}

export default function(req, res, next) {
  const host = req.headers.host
  const url = req.url
  const env = process.env.NODE_ENV
  const forceDomain = 'https://www.shadow-of-tales.ru'

  if (env === 'production' && host === 'shadow-of-tales.ru') {
    res.writeHead(301, { Location: forceDomain + url })
    return res.end()
  }

  return next()
}

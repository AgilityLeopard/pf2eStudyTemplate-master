export default function (req, res, next) {
  const host = req.headers.host
  const url = req.url
  const env = process.env.NODE_ENV
  const forceDomain = 'http://www.shadow-of-tales.ru'

  if (env === 'production' && host === 'pf2e-ru-builder.netlify.app') {
    res.writeHead(301, { Location: forceDomain + url })
    return res.end()
  }

  return next()
}

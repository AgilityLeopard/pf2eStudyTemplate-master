export default function (req, res, next) {
  const host = req.headers.host
  const url = req.url
  const env = process.env.NODE_ENV
  const forceDomain = 'http://localhost:3000'

  if (env === 'production' && host === 'localhost:3000') {
    res.writeHead(301, { Location: forceDomain + url })
    return res.end()
  }

  return next()
}

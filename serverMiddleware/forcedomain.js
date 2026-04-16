export default function (req, res, next) {
  const host = req.headers.host
  const url = req.url
  const env = process.env.NODE_ENV
  const forceDomain = 'http://www.shadow-of-tales.ru'

  // ❌ НЕ трогаем API и SSR внутренние запросы
  if (
    url.startsWith('/api') ||
    url.startsWith('/_nuxt') ||
    url.startsWith('/__webpack_hmr')
  ) {
    return next()
  }

  if (env === 'production') {
    res.writeHead(301, { Location: forceDomain + url })
    return res.end()
  }

  return next()
}
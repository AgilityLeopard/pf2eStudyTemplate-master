import { createClient } from 'contentful'

export default (context, inject) => {
  const client = createClient({
    space: process.env.NUXT_ENV_CTF_SPACE_ID,
    accessToken: process.env.NUXT_ENV_CTF_CD_ACCESS_TOKEN,
  })

  inject('cf', client)
}
import { createClient } from 'contentful'

export default (context, inject) => {
  const client = createClient({
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_TOKEN,
  })

  inject('cf', client)
}
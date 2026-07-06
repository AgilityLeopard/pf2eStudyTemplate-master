import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  'https://kouqjqecpkjdkvwxuevc.supabase.co',
  'sb_publishable_gwYzXsbnimdKImln0x3HTA_PnhIVDMf'
)

export default async ({ store }, inject) => {

  inject('supabase', supabase)

  const loadProfile = async (user) => {
    if (!user) {
      store.commit('SET_PROFILE', null)
      return
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('userid', user.id) // 🔥 FIX
      .single()



    store.commit('SET_PROFILE', data)
  }

  // init
  const session = supabase.auth.session()

  store.commit('SET_USER', session?.user || null)

  await loadProfile(session?.user) // 🔥 ВАЖНО

  store.commit('SET_AUTH_READY', true)

  // live auth changes
  supabase.auth.onAuthStateChange(async (_event, session) => {
    const user = session?.user || null

    store.commit('SET_USER', user)

    await loadProfile(user) // 🔥 ВАЖНО
  })
}
export default ({ app, store }) => {

  const user = app.$supabase.auth.user()

  store.commit('SET_USER', user)

  // ✅ правильный источник
  app.$supabase.auth.onAuthStateChange((event, session) => {
    store.commit('SET_USER', session?.user || null)
  })

}
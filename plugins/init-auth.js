export default async ({ app, store }) => {

    const session = app.$supabase.auth.session()

    store.commit('SET_USER', session?.user || null)
    store.commit('SET_AUTH_READY', true)

    app.$supabase.auth.onAuthStateChange((event, session) => {
        store.commit('SET_USER', session?.user || null)
    })

}
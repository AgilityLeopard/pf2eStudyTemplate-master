export default function ({ app, store, redirect }) {

    const user = app.$supabase.auth.user()

    if (user) {
        store.commit('SET_USER', user)
        return redirect('/profile')
    }
}
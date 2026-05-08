export default async function ({ app, redirect }) {
    const { data } = await app.$supabase.auth.getUser()

    if (!data.user) {
        return redirect('/login')
    }
}
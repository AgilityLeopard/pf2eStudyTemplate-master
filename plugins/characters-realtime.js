export default ({ app, store }) => {

    app.router.beforeEach((to, from, next) => {

        // ⛔ пока auth не готов — НИЧЕГО не рендерим
        if (!store.state.authReady) {
            return next(false) // 🔥 ВАЖНО: стоп роутера
        }

        const user = app.$supabase.auth.user()

        if (!user && to.path === '/profile') {

            return next('/login')
        }

        if (user && to.path === '/login') {
            return next('/profile')
        }

        next()
    })
}
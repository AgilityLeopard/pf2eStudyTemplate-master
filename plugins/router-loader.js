// plugins/router-loader.js
export default ({ app, store }) => {
    // только на клиенте
    if (!process.client) return

    // при переходе — включаем
    app.router.beforeEach((to, from, next) => {
        // лог для отладки
        // eslint-disable-next-line no-console
        console.log('[loader] beforeEach -> set loading true')
        store.commit('ui/SET_LOADING', true)
        next()
    })

    // после перехода — выключаем с небольшой паузой, чтобы увидеть анимацию
    app.router.afterEach(() => {
        // eslint-disable-next-line no-console
        console.log('[loader] afterEach -> will set loading false in 120ms')
        setTimeout(() => store.commit('ui/SET_LOADING', false), 120)
    })
}

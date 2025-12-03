export default ({ app, store }) => {
    if (process.client) {
        app.router.afterEach(() => {
            store.commit('ui/SET_LOADING', false)
        })
    }
}

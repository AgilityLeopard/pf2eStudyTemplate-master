export default function ({ store }) {
    if (process.client) {
        store.commit('ui/SET_LOADING', true)
    }
}

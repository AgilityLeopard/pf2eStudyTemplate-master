// store/ui.js
export const state = () => ({
    loading: false
})

export const mutations = {
    SET_LOADING(state, value) {
        state.loading = !!value
    }
}

export const getters = {
    loading: (s) => s.loading
}

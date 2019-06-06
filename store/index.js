export const state = () => ({
  products: [],
  product_details: []
})

export const mutations = {
  SET_PRODUCTS(state, payload) {
    state.products = payload
  },
  SET_PRODUCT_DETAILS(state, payload) {
    state.product_details = payload
  }
}

export const actions = {
  async GET_PRODUCTS({ commit }, search) {
    const response = await this.$axios.$get('/sites/MLB/search', {
      params: {
        q: search,
        limit: 4
      }
    })

    commit('SET_PRODUCTS', response)
  },
  async GET_PRODUCT_DETAILS({ commit }, id) {
    const response = await Promise.all([
      await this.$axios.$get(`/items/${id}`),
      await this.$axios.$get(`/items/${id}/description`)
    ])

    commit('SET_PRODUCT_DETAILS', response)
  }
}

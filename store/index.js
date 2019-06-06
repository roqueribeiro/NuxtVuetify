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
    const response = await this.$axios.$get('/products', {
      params: {
        search: search
      }
    })

    commit('SET_PRODUCTS', response)
  },
  async GET_PRODUCT_DETAILS({ commit }, id) {
    const response = await Promise.all([
      await this.$axios.$get(`/productAttributes/${id}`),
      await this.$axios.$get(`/productDescription/${id}`)
    ])

    commit('SET_PRODUCT_DETAILS', response)
  }
}

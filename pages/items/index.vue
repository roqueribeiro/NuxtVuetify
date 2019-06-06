<template>
  <v-container class="pt-3 pl-0 pr-0 pb-0">
    <ProductsList :products="products"></ProductsList>
  </v-container>
</template>

<script>
import ProductsList from '~/components/commons/ProductsList.vue'

export default {
  components: {
    ProductsList
  },
  head() {
    return {
      title: 'Products',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Products'
        }
      ]
    }
  },
  data() {
    return {
      products: []
    }
  },
  watch: {
    $route(to, from) {
      if (to.query.search === from.query.search) return false
      this.getProducts(to.query.search)
    }
  },
  async asyncData({ store, query }) {
    await store.dispatch('GET_PRODUCTS', query.search)
    return { products: store.state.products.results }
  },
  mounted() {
    this.$bus.$emit('BREADCRUMBS_CATEGORIES', this.$route.query.search)
  },
  methods: {
    async getProducts(search) {
      await this.$store.dispatch('GET_PRODUCTS', search).then(() => {
        this.products = this.$store.state.products.results
        this.$bus.$emit('BREADCRUMBS_CATEGORIES', search)
      })
    }
  }
}
</script>

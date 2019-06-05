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
      products: [],
      categories: []
    }
  },
  watch: {
    $route(to, from) {
      if (to.query.search === from.query.search) return false
      this.getProducts(to.query.search)
    }
  },
  mounted() {
    this.getProducts(this.$route.query.search)
  },
  methods: {
    async getProducts(search) {
      this.$bus.$emit('LOADING', true)
      await this.$axios
        .$get(
          '/sites/MLB/search',
          {
            params: {
              q: search,
              limit: 4
            }
          },
          { useCache: true }
        )
        .then(response => {
          this.products = response.results
        })
        .finally(() => {
          this.$bus.$emit('LOADING', false)
          this.$bus.$emit('BREADCRUMBS_CATEGORIES', search)
        })
    }
  }
}
</script>

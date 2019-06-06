<template>
  <v-layout class="pl-0 pt-3 pb-0 caption">
    <v-breadcrumbs :items="categories" divider=">" class="pa-0 ma-0">
      <template v-slot:item="props">
        <a class="grey--text" @click="goToSearch(props.item.name)">
          {{ props.item.name }}
        </a>
      </template>
    </v-breadcrumbs>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      categories: []
    }
  },
  async asyncData({ store, query }) {
    await store.dispatch('GET_PRODUCTS', query.search)
    return {
      categories: store.state.products.filters[0].values[0].path_from_root
    }
  },
  mounted() {
    this.$bus.$on('BREADCRUMBS_CATEGORIES', search => {
      this.getCategories(search)
    })
  },
  methods: {
    goToSearch(search) {
      this.$router.push({
        path: '/items',
        query: { search: search }
      })
    },
    async getCategories(search) {
      await this.$store.dispatch('GET_PRODUCTS', search).then(() => {
        if (this.$store.state.products.filters.length > 0)
          this.categories = this.$store.state.products.filters[0].values[0].path_from_root
        else this.categories = []
      })
    }
  }
}
</script>

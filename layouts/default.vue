<template>
  <v-app class="grey lighten-3">
    <v-toolbar class="yellow accent-3" fixed flat app>
      <v-layout justify-center align-center>
        <v-flex xs12 sm10 md8>
          <SearchBar />
        </v-flex>
      </v-layout>
    </v-toolbar>
    <v-content>
      <v-container class="pt-0">
        <Breadcrumb />
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import SearchBar from '~/components/commons/SearchBar.vue'
import Breadcrumb from '~/components/commons/Breadcrumb.vue'

export default {
  components: {
    SearchBar,
    Breadcrumb
  },
  data() {
    return {
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'home',
          title: 'Home',
          to: '/'
        }
      ],
      title: 'Server Side Rendering'
    }
  },
  mounted() {
    this.$bus.$on('SEARCH_FIELD', search => {
      this.$router.push({
        path: '/items',
        query: { search: search }
      })
    })
  }
}
</script>

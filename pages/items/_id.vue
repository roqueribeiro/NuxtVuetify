<template>
  <v-container class="pt-3 pl-0 pr-0 pb-0">
    <v-card flat>
      <v-layout row wrap class="pa-4">
        <v-flex xs12 sm8 md8>
          <v-layout>
            <v-flex xs12>
              <v-layout column>
                <v-img :src="picture" aspect-ratio="2" class="ma-5" contain>
                  <template v-slot:placeholder>
                    <v-layout fill-height align-center justify-center ma-0>
                      <v-progress-circular indeterminate></v-progress-circular>
                    </v-layout>
                  </template>
                </v-img>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-card-title primary-title>
            <div>
              <div class="headline mt-4 mb-4">Descripción del producto</div>
              <pre class="body-1 font-weight-regular">
                {{ description }}
              </pre>
            </div>
          </v-card-title>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-card-text>
            <div
              class="caption text-uppercase"
              v-text="`${condition} - ${sold_quantity} vendidos`"
            ></div>
            <div class="headline font-weight-medium mt-1" v-text="title"></div>
            <div class="display-1 mt-3">{{ price | currency }}</div>
          </v-card-text>
          <v-card-actions class="pa-3">
            <v-btn block depressed color="primary">Comprar</v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      price: 0,
      condition: '',
      picture: '',
      sold_quantity: 0,
      description: '',
      categories: []
    }
  },
  mounted() {
    this.getProductDetailsAndDescriptions(this.$route.params.id)
  },
  methods: {
    async getProductDetails(id) {
      const data = await this.$axios.$get(`/items/${id}`)
      return data
    },
    async getProductDescriptions(id) {
      const data = await this.$axios.$get(`/items/${id}/description`)
      return data
    },
    async getProductDetailsAndDescriptions(id) {
      this.$bus.$emit('LOADING', true)
      await Promise.all([
        this.getProductDetails(id),
        this.getProductDescriptions(id)
      ])
        .then(response => {
          this.title = response[0].title
          this.price = response[0].price
          this.condition = response[0].condition
          this.picture = response[0].pictures[0].url
          this.sold_quantity = response[0].sold_quantity
          this.description = response[1].plain_text
          this.$bus.$emit('BREADCRUMBS_CATEGORIES', response[0].title)
        })
        .finally(() => {
          this.$bus.$emit('LOADING', false)
        })
    }
  }
}
</script>
<style>
pre {
  font-family: Arial, Helvetica, sans-serif;
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
</style>

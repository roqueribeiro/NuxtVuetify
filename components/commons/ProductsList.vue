<template>
  <v-card v-if="products.length > 0" flat>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex
          v-for="(product, i) in products"
          :key="i"
          xs12
          @click="goToProductDetails(product.id)"
        >
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              flat
              :class="{ 'grey lighten-4': hover }"
              class="clickable"
            >
              <v-layout row wrap>
                <v-flex xs12 sm2 md2>
                  <v-img
                    :src="product.thumbnail"
                    height="125px"
                    class="ma-2"
                    contain
                  >
                    <template v-slot:placeholder>
                      <v-layout fill-height align-center justify-center ma-0>
                        <v-progress-circular
                          indeterminate
                        ></v-progress-circular>
                      </v-layout>
                    </template>
                  </v-img>
                </v-flex>
                <v-flex xs18 sm8 md8>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline mb-2">
                        {{ product.price | currency }}
                      </div>
                      <div>{{ product.title }}</div>
                    </div>
                  </v-card-title>
                </v-flex>
                <v-flex xs12 sm2 md2>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ product.address.city_name }}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-flex>
              </v-layout>
              <v-divider
                v-if="i + 1 < products.length"
                :key="i"
                class="grey lighten-4"
              ></v-divider>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  methods: {
    goToProductDetails(id) {
      this.$router.push({
        path: `/items/${id}`
      })
    }
  }
}
</script>

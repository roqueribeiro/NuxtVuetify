<template>
  <v-form ref="form" @submit.prevent="sendSearch(search)">
    <v-text-field
      v-model="search"
      flat
      solo
      clearable
      hide-details
      label="Nunca Dejes de Buscar"
    >
      <template v-slot:prepend>
        <v-img
          src="/logo.png"
          aspect-ratio="1"
          width="50"
          height="28"
          contain
        />
      </template>
      <template v-slot:append>
        <v-btn text icon flat color="primary" class="ma-0 pa-0" type="submit">
          <v-icon>search</v-icon>
        </v-btn>
      </template>
    </v-text-field>
  </v-form>
</template>
<script>
export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
    sendSearch(search) {
      this.$bus.$emit('SEARCH_FIELD', search)
    }
  }
}
</script>

<template>
  <v-snackbar
    v-model="snack"
    color="teal darken-4"
    :right="x === 'right'"
    :timeout="timeout"
    :top="y === 'top'"
  >
    {{ text }}
    <v-btn color="teal accent-4" flat @click="snack = false">Fechar</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Alerta',

  props: {
    // eslint-disable-next-line vue/require-default-prop
    text: String
  },

  data () {
    return {
      y: 'top',
      x: 'right',
      mode: '',
      timeout: 5000,
      snack: false
    }
  },

  created () {
    this.$root.$on('change-snack', this.changeSnack)
  },

  methods: {
    changeSnack (snack) {
      this.snack = snack
    }
  }
}
</script>

<style>
</style>

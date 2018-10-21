<template>
  <v-snackbar
    color="teal darken-4"
    :right="x === 'right'"
    v-model="snack"
    :timeout="timeout"
    :top="y === 'top'"
  >
    {{ text }}
    <v-btn
      color="teal accent-4"
      flat
      @click="snack = false"
    >
      Fechar
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "alerta",

  data() {
    return {
      y: "top",
      x: "right",
      mode: "",
      timeout: 5000,
      text: "Cadastro efetuado com sucesso!",
      snack: false
    };
  },

  created() {
    this.$root.$on("change-snack", this.changeSnack);
  },

  methods: {
    changeSnack(snack) {
      this.snack = snack;
    }
  }
};
</script>

<style>
</style>

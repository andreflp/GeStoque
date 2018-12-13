<template>
  <v-card class="elevation-8">
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm11 md11>
            <v-text-field v-model="form.login" prepend-icon="person" label="Login" type="text"></v-text-field>
          </v-flex>
          <v-flex xs12 sm11 md11>
            <v-text-field
              id="password"
              v-model="form.senha"
              prepend-icon="lock"
              label="Senha"
              type="password"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="login()">Login</v-btn>
    </v-card-actions>
    <v-snackbar
      color="teal darken-4"
      :right="x === 'right'"
      v-model="snack"
      :timeout="timeout"
      :top="y === 'top'"
    >
      {{ text }}
      <v-btn color="red" flat @click="snack = false">Fechar</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    form: {
      login: "",
      senha: ""
    },
    y: "top",
    x: "right",
    mode: "",
    timeout: 7000,
    text: "Usuário ou senha incorretos",
    snack: false,
    error: null
  }),
  props: {
    source: String
  },

  computed: {
    snackView() {
      this.snack;
    }
  },

  methods: {
    login() {
      let user = this.form;
      this.$store
        .dispatch("login", user)
        .then(response => {
          this.$router.push("/");
        })
        .catch(error => {
          if (error.response.status === 401) {
            this.snack = this.$store.state.Login.snack;
          }
        });
    }
  }
};
</script>

<style>
</style>

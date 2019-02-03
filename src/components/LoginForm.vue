<template>
  <v-card class="elevation-8">
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm11 md11>
            <v-text-field v-model="form.usuario" prepend-icon="person" label="Login" type="text"></v-text-field>
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
      <v-btn @click="authentication()">Login</v-btn>
    </v-card-actions>
    <v-snackbar
      v-model="snackBar"
      color="teal darken-4"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
    >
      {{ text }}
      <v-btn color="red" flat @click="snackBar = false">Fechar</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data: () => ({
    form: {
      usuario: '',
      senha: ''
    },
    y: 'top',
    x: 'right',
    mode: '',
    timeout: 7000,
    text: 'Usuário ou senha incorretos',
    snackBar: false,
    error: null
  }),

  computed: {
    snackView () {
      return this.snackBar
    },

    ...mapState('Login', ['snack'])
  },

  methods: {
    ...mapActions('Login', ['login']),

    authentication () {
      return new Promise(async (resolve, reject) => {
        try {
          const resp = await this.login(this.form)
          if (resp.status === 200) {
            this.$router.push('/')
            console.log('snackbar', this.snackBar)
            console.log('snack', this.snack)
          }
        } catch (error) {
          console.log(error.response.status)
          console.log({ errorAuth: error })
          this.snackBar = this.snack
        }
      })
    }
  }
}
</script>

<style></style>

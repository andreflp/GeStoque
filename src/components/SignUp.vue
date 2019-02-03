<template>
  <v-card class="elevation-8">
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm11 md5>
            <v-text-field
              v-model="form.nome"
              v-validate="'required'"
              label="Nome"
              data-vv-name="nome"
              :error-messages="errors.collect('nome')"
              type="text"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm11 md6>
            <v-text-field
              v-model="form.sobrenome"
              v-validate="'required'"
              label="Sobrenome"
              data-vv-name="sobrenome"
              :error-messages="errors.collect('sobrenome')"
              type="text"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm11 md11>
            <v-text-field
              v-model="form.usuario"
              v-validate="'required'"
              label="Usuário"
              data-vv-name="usuário"
              :error-messages="errors.collect('usuário')"
              type="text"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm11 md11>
            <v-text-field
              ref="e-mail"
              v-model="form.email"
              v-validate="'required|email'"
              label="E-mail"
              data-vv-name="e-mail"
              :error-messages="errors.collect('e-mail')"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm11 md11>
            <v-text-field
              v-model="emailConfirm"
              v-validate="'required|email|confirmed:e-mail'"
              label="Confirmação de e-mail"
              data-vv-name="confirmação de e-mail"
              data-vv-as="confirmação de e-mail"
              :error-messages="errors.collect('confirmação de e-mail')"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm11 md11>
            <v-text-field
              ref="senha"
              v-model="form.senha"
              v-validate="'required'"
              label="Senha"
              type="password"
              data-vv-name="senha"
              :error-messages="errors.collect('senha')"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm11 md11>
            <v-text-field
              v-model="senhaConfirm"
              v-validate="'required|confirmed:senha'"
              label="Confirmação de senha"
              type="password"
              data-vv-name="confirmação de senha"
              data-vv-as="confirmação de senha"
              :error-messages="errors.collect('confirmação de senha')"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <alerta :snack="snack" text="Usuário cadastrado com sucesso."></alerta>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline yellow lighten-4">Aviso</v-card-title>
        <v-card-text>{{ msgErro }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.native="dialogUser = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="clear()">Limpar</v-btn>
      <v-btn @click="signup()">Enviar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'
import Alerta from '@/components/Alerta'
export default {
  components: {
    Alerta
  },
  $_veeValidate: {
    validator: 'new'
  },
  data: () => ({
    form: {
      nome: '',
      sobrenome: '',
      usuario: '',
      senha: '',
      email: ''
    },
    msgErro: '',
    senhaConfirm: '',
    emailConfirm: '',
    snack: true,
    dialog: false
  }),

  methods: {
    signup () {
      return new Promise(async (resolve, reject) => {
        try {
          const user = this.form
          const url = 'http://localhost:3000/usuario/signup'
          const valid = await this.$validator.validateAll()
          if (valid) {
            const resp = await axios.post(url, user)
            if (resp.status === 200) {
              this.changeSnack()
              this.clear()
            }
          }
        } catch (error) {
          if (error.response.status === 400) {
            this.msgErro = error.response.data.msg
            this.dialog = true
          }
        }
      })
    },

    changeSnack () {
      this.$root.$emit('change-snack', this.snack)
    },

    changeSnackUsuario () {
      this.$root.$emit('change-snack', this.snackUsuario)
    },

    clear () {
      this.form.nome = ''
      this.form.sobrenome = ''
      this.form.email = ''
      this.emailConfirm = ''
      this.form.usuario = ''
      this.form.senha = ''
      this.senhaConfirm = ''
      this.$validator.reset()
    }
  }
}
</script>

<style>
.back {
  background-image: url("/static/background.jpg");
  background-size: cover;
}

#inspire {
  background: none;
}
</style>

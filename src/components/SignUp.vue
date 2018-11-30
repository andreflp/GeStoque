<template>
  <v-card class="elevation-8">
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm11 md5>
            <v-text-field
              label="Nome" 
              v-model="form.nome" 
              v-validate="'required'" 
              data-vv-name="nome"
              :error-messages="errors.collect('nome')"
              type="text">
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm11 md6>
            <v-text-field
              label="Sobrenome" 
              v-model="form.sobrenome" 
              v-validate="'required'" 
              data-vv-name="sobrenome"
              :error-messages="errors.collect('sobrenome')"
              type="text">
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm11 md11>
            <v-text-field
              label="Usuário" 
              v-model="form.login" 
              v-validate="'required'" 
              data-vv-name="usuário"
              :error-messages="errors.collect('usuário')"
              type="text">
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm11 md11>
            <v-text-field
              label="E-mail"
              v-model="form.email"
              v-validate="'required|email'" 
              data-vv-name="e-mail"
              :error-messages="errors.collect('e-mail')"
              ref="e-mail"
              >
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm11 md11>
            <v-text-field
              label="Confirmação de e-mail"
              v-validate="'required|email|confirmed:e-mail'" 
              data-vv-name="confirmação de e-mail"
              data-vv-as="confirmação de e-mail"
              :error-messages="errors.collect('confirmação de e-mail')"
              >
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm11 md11>
            <v-text-field 
              label="Senha"
              v-model="form.senha"
              type="password"
              v-validate="'required'" 
              data-vv-name="senha"
              :error-messages="errors.collect('senha')"
              ref="senha"
            >
            </v-text-field>
            
          </v-flex>
          <v-flex xs12 sm11 md11>
            <v-text-field
              label="Confirmação de senha" 
              type="password"
              v-validate="'required|confirmed:senha'"
              data-vv-name="confirmação de senha"
              data-vv-as="confirmação de senha"
              :error-messages="errors.collect('confirmação de senha')"
              name="password_confirmation"
            >
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="clear()">Limpar</v-btn>
      <v-btn @click="signup()">Enviar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  $_veeValidate: {
    validator: "new"
  },
  data: () => ({
    form: {
      nome: "",
      sobrenome: "",
      login: "",
      senha: "",
      email: ""
    }
  }),
  props: {
    source: String
  },

  methods: {
    signup() {
      const user = this.form;
      const url = "http://localhost:8080/Gestoque/usuario/sign-up";
      axios
        .post(url, user)
        .then(resp => {
          alert("Usuário cadastrado");
        })
        .catch(error => {
          console.log(error);
        });
    },

    clear() {
      this.form.nome = "";
      this.form.sobrenome = "";
      this.form.email = "";
      this.form.login = "";
      this.form.senha = "";
    }
  }
};
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

<template>
  <v-card class="elevation-8">
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>    
          <v-flex xs12 sm11 md11>  
            <v-text-field
              v-model="form.login" 
              prepend-icon="person" 
              label="Login" 
              type="text">
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm11 md11>
            <v-text-field id="password" 
              v-model="form.senha" 
              prepend-icon="lock" 
              label="Senha" 
              type="password">
            </v-text-field>
          </v-flex> 
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="login()">Login</v-btn>
    </v-card-actions>
  </v-card>
  </template>

<script>
export default {
  data: () => ({
    form: {
      login: "",
      senha: ""
    },
    error: null
  }),
  props: {
    source: String
  },

  methods: {
    login() {
      let user = this.form;
      this.$store.dispatch("login", user).then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>

<style>
</style>

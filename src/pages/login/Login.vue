<template>
  <div class="back">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-tabs color="teal accent-4" slider-color="teal accent-1" dark>
                <v-tab>Login</v-tab>
                <v-tab>Cadastrar-se</v-tab>
                <v-tab-item :transition="false" :reverse-transition="false">
                  <login-form/>
                </v-tab-item>
                <v-tab-item :transition="false" :reverse-transition="false">
                  <sign-up/>
                </v-tab-item>
              </v-tabs>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import SignUp from '../../components/SignUp'
import LoginForm from '../../components/LoginForm'

export default {
  components: {
    SignUp,
    LoginForm
  },

  data: () => ({}),

  methods: {}
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

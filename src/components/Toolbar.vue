<template>
  <v-toolbar app flat color="teal accent-4" dark>
    <v-toolbar-side-icon @click="drawer = !drawer"/>
    <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-tooltip left style="margin-top: 8px">
        <v-btn slot="activator" icon dark @click="logoutTeste()">
          <v-icon>exit_to_app</v-icon>
        </v-btn>Logout
      </v-tooltip>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Toolbar',
  data () {
    return {
      drawer: false
    }
  },

  computed: {},

  watch: {
    drawer (val) {
      this.$root.$emit('updateDrawer')
    }
  },

  methods: {
    ...mapActions('Login', ['logout']),

    logoutTeste () {
      return new Promise(async (resolve, reject) => {
        try {
          await this.logout()
          this.$router.push('/login')
        } catch (error) {
          console.log(error)
        }
      })
    }
  }
}
</script>

<style></style>

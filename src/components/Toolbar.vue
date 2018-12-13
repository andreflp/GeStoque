<template>
  <v-toolbar app flat color="teal accent-4" dark>
    <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title>{{$route.name}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-tooltip left style="margin-top: 8px">
        <v-btn @click="logout()" icon slot="activator" dark>
          <v-icon>exit_to_app</v-icon>
        </v-btn>Logout
      </v-tooltip>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "toolbar",
  data() {
    return {
      drawer: false
    };
  },

  watch: {
    drawer(val) {
      this.$root.$emit("updateDrawer");
    }
  },

  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style>
</style>

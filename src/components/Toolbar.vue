<template>
  <v-toolbar app flat color="teal accent-4" dark>
    <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title>{{$route.name}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
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
  }
};
</script>

<style>
</style>

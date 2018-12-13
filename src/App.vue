<template>
  <v-app id="app">
    <router-view/>
  </v-app>
</template>

<script>
import MyMenu from "@/components/Menu";
import Toolbar from "@/components/Toolbar";
import MyBody from "@/components/Body";

export default {
  name: "App",
  components: {
    MyMenu,
    Toolbar,
    MyBody
  }
};
</script>

<style>
.router-anim-enter-active {
  animation: coming 0.7s;
  animation-delay: 0.1s;
  opacity: 0;
}

@keyframes coming {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>

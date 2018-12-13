<template>
  <v-content class="body">
    <slot>
      <MyMenu/>
      <Toolbar/>
      <transition name="router-anim">
        <router-view/>
      </transition>
    </slot>
  </v-content>
</template>

<script>
import MyMenu from "@/components/Menu";
import Toolbar from "@/components/Toolbar";
export default {
  components: {
    MyMenu,
    Toolbar
  },
  name: "my-body"
};
</script>

<style>
.body {
  padding: 20px;
}
</style>
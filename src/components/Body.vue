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
import MyMenu from '@/components/Menu'
import Toolbar from '@/components/Toolbar'
export default {
  name: 'MyBody',
  components: {
    MyMenu,
    Toolbar
  }
}
</script>

<style>
.body {
  padding: 20px;
}
</style>

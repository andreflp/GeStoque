<template>
    <v-content class="body">
        <slot></slot>
    </v-content>
</template>

<script>
export default {
  name: "my-body"
};
</script>

<style>
.body {
  padding: 20px;
}
</style>
<template>
  <component :is="layout" :userAuth="userAuth">
    <router-view :userAuth="userAuth" />
  </component>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    layout() {
      return this.$route.meta.layout || "home";
    },
    ...mapState(["userAuth"])
  }
};
</script>

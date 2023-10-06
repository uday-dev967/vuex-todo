<template>
  <v-app>
    <nav-bar></nav-bar>
    <router-view :key="$route.fullPath" />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",

  data() {
    return {
      searchInput: "",
    };
  },
  components: {
    "nav-bar": Navbar,
  },
  methods: {
    updateSearchvalue(data) {
      this.searchInput = data;
    },
  },
};
</script>

<template>
  <div class="nav-bar">
    <v-app-bar color="deep-purple accent-4" dense dark>
      <router-link :to="{ name: 'home' }" class="app-title">
        <v-toolbar-title class="white--text" @click="resetHome"
          >Vuex Todo</v-toolbar-title
        >
      </router-link>

      <v-spacer></v-spacer>
      <template v-if="getLoggedInStatus">
        <input
          type="text"
          class="search-field"
          placeholder="Search Todo"
          v-model="searchInput"
        />
        <v-btn icon @click="changeSearchInput(searchInput)">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <router-link :to="{ name: 'create-todo' }">
          <v-btn icon>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </router-link>
        <v-btn icon @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Nav-bar",
  data() {
    return {
      searchInput: "",
    };
  },
  computed: {
    ...mapGetters("user", ["getLoggedInStatus"]),
  },
  methods: {
    ...mapActions("search", ["changeSearchInput"]),
    resetHome() {
      this.searchInput = "";
      this.changeSearchInput("");
    },
    logout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userCreds");
      this.$router.push({ name: "login" });
      this.$store.dispatch("user/logout");
    },
  },
};
</script>
<style>
.nav-bar {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  z-index: 100;
}
.app-title {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  color: #39b982;
  text-decoration: none;
}
.search-field {
  background-color: #fff;
  outline: none;
  color: #000000;
  width: 400px;
  padding: 2px;
  border-radius: 5px;
  padding-left: 15px;
}
</style>

<template>
  <div class="home-container">
    <v-form class="form-container" ref="taskForm" @submit.prevent="submitForm">
      <h1>LOGIN</h1>
      <v-text-field
        v-model="creds.email"
        :rules="emailValidationRules"
        label="Email"
        required
      ></v-text-field>
      <v-text-field
        v-model="creds.password"
        :rules="passwordValidationRules"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <p v-if="user.error.isError">{{ user.error.errMsg }}</p>
      <v-btn class="mr-4" type="submit" color="blue"> Login </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Login-view",
  data() {
    return {
      creds: {
        email: "",
        password: "",
      },
      emailValidationRules: [
        (value) => !!value || "This field is required",
        (value) =>
          value.indexOf("@") !== 0 ||
          "Please Enter a valid Email eg:'abc@xyz.com'",
        (value) =>
          value.includes("@") !== 0 ||
          "Please Enter a valid Email eg:'abc@xyz.com'",
        (value) =>
          value.indexOf(".") - value.indexOf("@") > 1 ||
          "Please Enter a valid Email eg:'abc@xyz.com'",
      ],
      passwordValidationRules: [(value) => !!value || "This field is required"],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    submitForm() {
      this.$store.dispatch("user/fetchUsers", this.creds);
      if (!this.user.error.isError) {
        localStorage.setItem("authToken", "loggedIn");
        const credentials = JSON.stringify(this.creds);
        localStorage.setItem("userCreds", credentials);
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>

<style>
.home-container {
  margin-top: 50px;
}
</style>

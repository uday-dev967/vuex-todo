<template>
  <v-form class="form-container" ref="taskForm" @submit.prevent="submitForm">
    <h1>Create a New task</h1>
    <v-text-field
      v-model="todo.title"
      :rules="titleRules"
      :counter="100"
      label="Title"
      required
    ></v-text-field>
    <v-text-field
      v-model="todo.description"
      :rules="descriptionRules"
      label="Description"
      required
    ></v-text-field>
    <v-btn class="mr-4" type="submit"> submit </v-btn>
    <v-btn @click="clear"> clear </v-btn>
  </v-form>
</template>
<script>
export default {
  name: "create-todo",
  data() {
    return {
      todo: this.createFreshTodo(),
      titleRules: [(value) => !!value || "This field is required"],
      descriptionRules: [(value) => !!value || "This field is required"],
    };
  },
  components: {},
  computed: {},
  methods: {
    clear() {
      this.todo.title = "";
      this.todo.description = "";
      this.$refs.taskForm.reset();
    },
    createFreshTodo() {
      const user = this.$store.state.user.name;
      return {
        user: user,
        title: "",
        status: "incomplete",
      };
    },
    submitForm() {
      console.log(this.$refs.taskForm);
      if (this.$refs.taskForm.validate()) {
        this.$store
          .dispatch("todo/createTodo", this.todo)
          .then(() => {
            this.$refs.taskForm.reset();
            this.todo = this.createFreshTodo();
          })
          .catch(() => {
            console.log("There is a Problem with Creating a new Todo");
          });
      }
    },
  },
};
</script>
<style>
.form-container {
  margin: 10px;
  margin-top: 50px;
  padding: 10px;
}
</style>

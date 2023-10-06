<template>
  <div class="home-container">
    <h1>welcome {{ uppercase(getUser.name) }}!</h1>
    <v-card v-if="!haveTodos" class="mt-16 mx-auto" width="450px">
      <div class="no-todo">
        <h2>Looks like you have no tasks to do at the moment</h2>
        <v-card-actions>
          <v-btn color="blue" class="white--text" @click="goToCreatePage"
            >ADD</v-btn
          >
        </v-card-actions>
      </div>
    </v-card>
    <todo-card
      v-for="todo in getFilteredTodos"
      :key="todo.id"
      :todo="todo"
    ></todo-card>
  </div>
</template>

<script>
import TodoCard from "@/components/TodoCard.vue";
import { mapGetters, mapActions } from "vuex";
import mixins from "@/mixins/mixins.js";
export default {
  name: "Home-view",
  data() {
    return {};
  },

  components: {
    "todo-card": TodoCard,
  },
  created() {
    this.fetchTodos();
  },
  mounted() {
    const creds = localStorage.getItem("userCreds");
    const parsedCreds = JSON.parse(creds);
    this.$store.dispatch("user/fetchUsers", parsedCreds);
  },
  computed: {
    ...mapGetters("user", ["getUser"]),
    ...mapGetters("todo", ["getFilteredTodos", "getTodos"]),
    haveTodos() {
      return this.getTodos.length > 0;
    },
  },
  mixins: [mixins],
  methods: {
    ...mapActions("todo", ["fetchTodos"]),
    goToCreatePage() {
      this.$router.push({ path: "/create" });
    },
  },
};
</script>
<style>
.home-container {
  margin-top: 50px;
}
.no-todo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

<template>
  <div class="todo-container">
    <v-card elevation="6">
      <v-card-title :class="{ finished: todoFinished }">{{
        uppercase(todo.title)
      }}</v-card-title>
      <v-card-text class="text--primary pb-0">
        <div :class="{ finished: todoFinished }">{{ todo.description }}</div>
      </v-card-text>
      <v-card-subtitle class="pb-0">
        {{ todo.status }}
      </v-card-subtitle>
      <v-card-actions>
        <v-btn color="orange" text v-if="todoFinished" @click="markAsToBeDone">
          INCOMPLETE
        </v-btn>

        <v-btn color="green" text v-if="!todoFinished" @click="markAsDone">
          DONE
        </v-btn>

        <v-btn color="red" text v-on:click="deleteTodo(todo.id)">
          DELETE
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import { mapActions } from "vuex";
export default {
  props: { todo: Object },
  computed: {
    todoFinished() {
      return this.todo.status === "finished";
    },
  },
  mixins: [mixins],
  methods: {
    ...mapActions("todo", ["deleteTodo", "updateFinished", "updateIncomplete"]),
    markAsDone() {
      const updatedTodo = { ...this.todo, status: "finished" };
      this.updateFinished(updatedTodo);
    },
    markAsToBeDone() {
      const updatedTodo = { ...this.todo, status: "incomplete" };
      this.updateIncomplete(updatedTodo);
    },
  },
};
</script>
<style>
.todo-container {
  margin: 10px;
}
.finished {
  text-decoration: line-through;
}
</style>

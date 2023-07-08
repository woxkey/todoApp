<template>
  <div>
    <v-text-field
      @keyup.enter="addTodo"
      v-model="newTodo"
      type="text"
      placeholder="Whats need to be done"
    />
    <TodoListItem
      v-for="(todo, index) in todosFiltered"
      :key="todo.id"
      :todo="todo"
      :index="index"
      @remove-todo="removeTodo"
    />
    <!-- <div class="d-flex align-center">
        <v-checkbox v-model="todo.completed" />
        <div
          :class="{
            'text-decoration-line-through': todo.completed,
          }"
          @dblclick="editTodo(todo)"
          v-if="!todo.isEditing"
        >
          {{ todo.title }}
        </div>
        <v-text-field
          autofocus
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          v-else
          v-model="todo.title"
          @keyup.esc="cancelEdit(todo)"
        />
      </div>
      <v-btn @click="removeTodo(index)"> delete </v-btn> -->
    <div class="d-flex align-center justify-space-between">
      <div>
        <v-checkbox
          @change="checkAllTodos"
          :value="anyRemaining"
          label="Check all"
        />
      </div>
      <div>{{ remaining }} items left</div>
    </div>
    <div class="d-flex align-center justify-space-between">
      <div>
        <v-btn :plain="filter !== 'all'" @click="filter = 'all'" class="mr-4"
          >All</v-btn
        >
        <v-btn
          :plain="filter !== 'active'"
          @click="filter = 'active'"
          class="mr-4"
          >Active</v-btn
        >
        <v-btn
          :plain="filter !== 'completed'"
          @click="filter = 'completed'"
          class="mr-4"
          >Completed</v-btn
        >
      </div>
      <div>
        <v-btn v-if="showClearCompleted" @click="clearCompleted"
          >Clear completed</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TodoListItem from "./TodoListItem.vue";
import ITodo from "../interfaces/ITodo";

@Component({
  components: {
    TodoListItem,
  },
})
export default class TodoList extends Vue {
  newTodo = "";
  idForTodo = 3;
  filter = "all";

  get remaining() {
    return this.todos.filter((todo) => !todo.completed).length;
  }

  get anyRemaining() {
    return this.remaining === 0;
  }

  get todosFiltered() {
    if (this.filter === "completed") {
      return this.todos.filter((todo) => todo.completed);
    } else if (this.filter === "active") {
      return this.todos.filter((todo) => !todo.completed);
    }
    return this.todos;
  }

  get showClearCompleted() {
    return this.todos.filter((todo) => todo.completed === true).length > 0;
  }

  todos = [
    {
      id: 1,
      title: "Finsih vue screen cast",
      completed: false,
      isEditing: false,
    },
    {
      id: 2,
      title: "Take over the world",
      completed: false,
      isEditing: false,
    },
  ];

  addTodo() {
    if (this.newTodo.trim().length === 0) {
      return;
    }

    this.todos.push({
      id: this.idForTodo,
      title: this.newTodo,
      completed: false,
      isEditing: false,
    });
    this.idForTodo++;
    this.newTodo = "";
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
  }

  

  checkAllTodos(checked: boolean) {
    this.todos.forEach((todo) => (todo.completed = checked));
  }

  clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
  }
}
</script>

<style scoped></style>

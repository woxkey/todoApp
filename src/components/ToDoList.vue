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
    <div class="d-flex align-center justify-space-between">
      <div>
        <v-checkbox
          @change="checkAllTodos"
          :value="anyRemaining"
          label="Check all"
        />
      </div>
      <TodoItemsRemaining/>
    </div>
    <div class="d-flex align-center justify-space-between">
      <div>
        <v-btn :plain="filter !== 'all'" @click="setFilter('all')" class="mr-4"
          >All</v-btn
        >
        <v-btn
          :plain="filter !== 'active'"
          @click="setFilter('active')"
          class="mr-4"
          >Active</v-btn
        >
        <v-btn
          :plain="filter !== 'completed'"
          @click="setFilter('completed')"
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
import ITodo from "@/interfaces/ITodo";
import TodoItemsRemaining from './TodoItemsRemaining.vue'

@Component({
  components: {
    TodoListItem,
    TodoItemsRemaining
  },
})
export default class TodoList extends Vue {
  newTodo = "";
  idForTodo = 3;

  get filter () {
    return this.$store.state.filter
  }

  setFilter(value: string) {
    this.$store.commit('setFilter', value)
  }

  get remaining() {
    return this.$store.getters.remaining
  }

  get anyRemaining() {
    return this.$store.getters.anyRemaining
  }

  get todosFiltered() {
    return this.$store.getters.todosFiltered
  }

  get showClearCompleted() {
    return this.$store.getters.showClearCompleted
  }

  addTodo() {
    if (this.newTodo.trim().length === 0) {
      return;
    }

    this.$store.state.Todo.todos.push({
      id: this.idForTodo,
      title: this.newTodo,
      completed: false,
      isEditing: false,
    });
    this.idForTodo++;
    this.newTodo = "";
  }

  removeTodo(index: number) {
    this.$store.state.Todo.todos.splice(index, 1);
  }

  checkAllTodos(checked: boolean) {
    this.$store.state.Todo.todos.forEach(
      (todo: ITodo) => (todo.completed = checked)
    );
  }

  clearCompleted() {
    this.$store.state.Todo.todos = this.$store.state.Todo.todos.filter(
      (todo: ITodo) => !todo.completed
    );
  }
}
</script>

<style scoped></style>

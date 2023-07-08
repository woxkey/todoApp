<template>
    <div>
      <input
        @keyup.enter="addToDo"
        type="text"
        v-model="todo"
        placeholder="Enter todo"
      />
      <button @click="addToDo">Add</button>
      <Todos :todos="todos" />
    </div>
  </template>
  
  <script lang="ts">
  import Todos, { ITodo } from "./Todos.vue";
  import { Component, ProvideReactive, Vue } from "vue-property-decorator";
  
  @Component({
    components: {
      Todos,
    },
  })
  export default class ToDoList extends Vue {
    todo = "";
    idForToDo = 3;
    
  
    @ProvideReactive() todos = [
      {
        id: 1,
        title: "Finish vue screencast",
        completed: false,
      },
      {
        id: 2,
        title: "Take over the world",
        completed: false,
      },
    ];
  
    addToDo() {
      if (this.todo.trim().length === 0) {
          return
      }
  
      const newTodo: ITodo = {
        id: this.idForToDo,
        title: this.todo,
        completed: false,
      };
  
      this.todos.push(newTodo);
  
      this.idForToDo++;
      this.todo = '';
    }
  }
  </script>
  
<template>
    <div>
      <div v-for="todo in todos" :key="todo.id">
          <ToDoItem :title="todo.title" :id="todo.id"/>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export interface ITodo {
    id: number;
    title: string;
    completed: boolean;
  }
  import { Vue, Component, Prop } from "vue-property-decorator";
  import ToDoItem from "./ToDoItem.vue";
  
  @Component({
    components: {
      ToDoItem
    }
  })
  export default class Todos extends Vue {
    @Prop({required: true}) todos!: ITodo[];
  }
  </script>
  
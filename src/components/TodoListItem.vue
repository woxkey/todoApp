<template>
  <div class="d-flex justify-space-between">
    <div class="d-flex align-center">
      <v-checkbox v-model="todo.completed" />
      <div
        :class="{
          'text-decoration-line-through': todo.completed,
        }"
        @dblclick="editTodo"
        v-if="!todo.isEditing"
      >
        {{ todo.title }}
      </div>
      <v-text-field
        autofocus
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        v-else
        v-model="todo.title"
        @keyup.esc="cancelEdit"
      />
    </div>
    <v-btn @click="removeTodo(index)"> delete </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import ITodo from "../interfaces/ITodo";

@Component
export default class TodoListItem extends Vue {
  beforeEditCache = "";
  @Prop({ required: true }) todo!: ITodo;
  @Prop({ required: true }) index!: number;
  @Emit()
  removeTodo(index: number) {
    return index;
  }

  editTodo() {
    this.beforeEditCache = this.todo.title;
    this.todo.isEditing = true;
  }

  doneEdit() {
    if (this.todo.title.trim() === "") {
      this.todo.title = this.beforeEditCache;
    }
    this.todo.isEditing = false;
  }

  cancelEdit() {
    this.todo.isEditing = false;
    this.todo.title = this.beforeEditCache;
  }
}
</script>

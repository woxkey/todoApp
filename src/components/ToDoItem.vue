<template>
    <div>
        <p @dblclick="handleDoubleClick" v-if="!isEditing">{{ title }}</p>
        <input v-else type="text">
        <button @click="handleDelete">Delete</button>
    </div>
</template>

<script lang="ts">
import {Component, InjectReactive, Prop, Vue} from 'vue-property-decorator'
import { ITodo } from './Todos.vue';

@Component
export default class ToDoItem extends Vue{
    @Prop({required: true}) title!: string
    @Prop({required: true}) id!: number
    @InjectReactive() todos!: ITodo[]

    isEditing = false;

    // @Emit() 
    // onEditChange(e: Event) {
    //     return (e.target as HTMLInputElement).value
    // }

    handleDelete() {
        const index = this.todos.findIndex(todo => todo.id === this.id)
        this.todos.splice(index, 1)
    }

    handleDoubleClick() {
        this.isEditing = true;
    }
}
</script>
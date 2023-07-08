<template>
  <v-container>
    <h1>This is an todo page</h1>
    <TodoList />


  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import TodoList from '../components/TodoList.vue'


@Component({
  components: {
    TodoList
  }
})
export default class TodosView extends Vue {}
</script>
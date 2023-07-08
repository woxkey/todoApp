<template>
  <div class="todos">
    <h1>This is an todo page</h1>
    <Todos />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import Todos from '../components/Todos.vue'

@Component({
  components: {
    Todos
  }
})
export default class TodosView extends Vue {}
</script>
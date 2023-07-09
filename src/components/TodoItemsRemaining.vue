<template>
    <div>{{ remaining }} items left</div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class TodoItemsRemaining extends Vue {

    get remaining() {
        return this.$store.getters.remaining

    }
}
</script>
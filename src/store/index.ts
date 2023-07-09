import Vue from "vue";
import Vuex from "vuex";

import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import ITodo from "@/interfaces/ITodo";

@Module({ name: "todo" })
export default class Todo extends VuexModule {
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
  filter = "all";

  @Mutation
  public setFilter(val: string) {
    this.filter = val
  }

  get remaining() {
    return this.todos.filter((todo: ITodo) => !todo.completed).length;
  }

  get anyRemaining() {
    return this.remaining === 0;
  }

  get todosFiltered() {
    if (this.filter === "completed") {
      return this.todos.filter((todo: ITodo) => todo.completed);
    } else if (this.filter === "active") {
      return this.todos.filter((todo: ITodo) => !todo.completed);
    }
    return this.todos;
  }

  get showClearCompleted() {
    return (
      this.todos.filter((todo: ITodo) => todo.completed === true).length > 0
    );
  }
}

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {},
  modules: {
    Todo,
  },
});

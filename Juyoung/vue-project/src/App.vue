<template>
  <div class="container">
    <h4>count : {{ count }}</h4>
    <h4>doublecount computed : {{ doubleCount }}</h4> 
    <h4>doublecount computed : {{ doubleCount }}</h4>
    <!-- computed 는 값을 저장하고 있기 때문에 한번 실행을 하고, 두번째 호출할때 그 값을 넣는다. -->
    <h4>doubleCountMethod : {{ doubleCountMethod() }}</h4>
    <h4>doubleCountMethod : {{ doubleCountMethod() }}</h4>
    <!-- 함수는 값을 저장하고 있지 않기 때문에 호출을 두번하면 함수가 두 번 돌아간다. -->
    <button @click="count++">add one</button>

    <h2>To-Do List</h2>
    <TodoSimpleForm 
      @add-todo="addTodo"
    />
    <div v-if="!todos.length">
      추가된 Todo가 없습니다.
    </div>
    <TodoList 
      :todos="todos" 
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: {
    TodoSimpleForm,
    TodoList
  },
  setup() {
    const todos = ref([]);
    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    }
    const addTodo = (todo) => {
      todos.value.push(todo);
    }

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    }

    const toggleTodo = (index) => {
      console.log(todos.value[index].completed);
      todos.value[index].completed = !todos.value[index].completed;
      console.log(todos.value[index].completed);
    }

    const count = ref(1);
    const doubleCount = computed(() => {
      console.log('computed');
      return count.value *2;
      // computed 는 인수를 받을 수 없으며, 값이 변하면 실행된다.
    })

    const doubleCountMethod = () => {
      console.log('method');
      return count.value*2;
    }

    return {
      addTodo,
      todos,
      todoStyle,
      deleteTodo,
      toggleTodo,
      count,
      doubleCount,
      doubleCountMethod,
    };
  }
}
</script>

<style>
  .todo {
    color: gray;
    text-decoration: line-through;
  }
</style>
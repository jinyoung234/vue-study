<template>
  <div class="container">
    <h2>To-Do List</h2>
    <input
      class="form-control"
      type="text" 
      v-model="searchText"
      placeholder="Search"
    >
    <hr />
    <TodoSimpleForm @add-todo="addTodo"/>
    <div style="color: red">{{ error }}</div>

    <div v-if="!filteredToods.length">
      There is nothing to display
    </div>
    <TodoList 
      :todos="filteredToods" 
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#">Previous</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">1</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">3</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';

export default {
  components: {
    TodoSimpleForm,
    TodoList
  },
  setup() {
    const todos = ref([]);
    const error = ref('');
    const totalPage = ref(0);
    const limit = 5;
    const page = ref(1);

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    }

    const getTodos = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/todos?_page=${page.value}&_limit=${limit}`
        );
        totalPage.value = res.headers['x-total-count'];
        todos.value = res.data;
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong';
      }
    }

    getTodos();

    const addTodo = async (todo) => {
      // e데이터베이스에 투두를 저장
      error.value = '';
      try {
        const res = await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed,
        })
        todos.value.push(res.data);
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong';
      }
    }

    const deleteTodo = async (index) => {
      error.value = '';
      // e데이터베이스에 투두를 삭제
      const id = todos.value[index].id;
      try {
        await axios.delete('http://localhost:3000/todos/' + id);
        todos.value.splice(index, 1);
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong';
      }
    }

    const toggleTodo = async (index) => {
      const id = todos.value[index].id;
      try { 
        await axios.patch('http://localhost:3000/todos/' + id, {
          completed: !todos.value[index].completed
        });
        todos.value[index].completed = !todos.value[index].completed;
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong';
      }
    }

    const searchText = ref('');
    const filteredToods = computed(() => {
      if (searchText.value) {
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value);
        });
      }
      // empty string이면 모든 todo를 보여준다.
      return todos.value;
    })

    return {
      addTodo,
      todos,
      todoStyle,
      deleteTodo,
      toggleTodo,
      searchText,
      filteredToods,
      error,
      getTodos
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
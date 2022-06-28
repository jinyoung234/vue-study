import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages';
import Todos from '../pages/todos';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/todos',
      name: 'Todos',
      component: Todos
    },
  ]
});

export default router;
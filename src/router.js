import Vue from 'vue';
import VueRouter from 'vue-router';
import ViewBook from './views/ViewBook.vue';
import BookForm from './views/BookForm.vue';

//const test = require('./views/test.vue').default;

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: ViewBook,
    },
    {
      path: '/add',
      name: 'add',
      component: BookForm,
    },
    {
        path: '/books/:bookid',
        name: 'edit',
        component: BookForm
    },
    {
        path: '/books/retrieve/:bookid',
        name: 'details',
        component: BookForm
    }
  ],
});

export default router;

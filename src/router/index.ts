import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'country',
      component: HomePage,
    },
    // {
    //   path: '/country/:id',
    //   name: 'country-details',
    //   component: () => import('../views/CountryDetailsView.vue'), // Lazy-loaded
    //   props: true, // Pass the route param `id` as a prop to the component
    // },
    // {
    //   path: '/:catchAll(.*)', // Catch-all route for 404
    //   name: 'not-found',
    //   component: () => import('../views/NotFoundView.vue'), // Lazy-loaded
    // },
  ],
});

export default router;

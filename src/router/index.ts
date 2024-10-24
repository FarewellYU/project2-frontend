import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LayoutView from '@/views/country/LayoutView.vue'
import DetailView from '@/views/country/DetailView.vue'
import SportListView from '@/views/country/SportListView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'country',
      component: HomePage,
    },
    {
      path: '/countries/:countryid',
      name: 'layout-view',
      component: LayoutView,
      props: true,
      children: [
        {
          path: '',
          name: 'detail-view',
          component: DetailView,
          props: true,
        },
        {
          path: 'sports',
          name: 'sport-list-view',
          component: SportListView,
          props: true,
        },
      ],
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0}
    }
  }
})

export default router

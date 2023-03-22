import { createRouter, createWebHashHistory } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';


const routes:RouteRecordRaw[] = [
  {
    path: '/',
    component: ()=>import('@/layouts/welcome.vue'),
    children: [{
      path: '/',
      component: ()=>import('@/pages/index.vue'),
    }],
  },
  {
    path: '/about',
    component: () => import('@/pages/about.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/404.vue'),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
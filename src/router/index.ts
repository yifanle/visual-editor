import { createRouter, createWebHashHistory } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';


const routes:RouteRecordRaw[] = [
  {
    path: '/',
    component: ()=>import('@/layouts/index.vue'),
    children: [{
      path: '/',
      component: ()=>import('@/pages/index.vue'),
    },
    {
      path: '/editor',
      component: ()=>import('@/layouts/editor.vue'),
    }],
  },
  {
    path: '/admin',
    component: ()=>import('@/layouts/admin.vue'),
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
import { type RouteRecordRaw } from 'vue-router';
import ClubDashboard from '@/views/user/club/dashboard.vue';

const routes: RouteRecordRaw = {
  path: 'clubs',
  component: () => import('../../views/user/club/club.vue'),
  children: [
    {
      path: ':id/:code',
      component: ClubDashboard,
      name: 'Club Home',
      meta: { title: 'Home' }
    }
  ]
};

export default routes;

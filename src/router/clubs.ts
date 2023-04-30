import { RouteConfig } from 'vue-router';
// import ClubsDashboard from '@/views/admin/clubs/dashboard.vue';
// import ViewClub from '@/views/admin/clubs/view-club.vue';
// import ClubHome from '@/views/admin/clubs/club-home.vue';
// import ClubForm from '@/views/admin/clubs/club-form.vue';

const routes: RouteConfig = {
  path: 'clubs',
  component: () => import('../views/admin/clubs/clubs-home.vue'),
  children: [
    {
      path: '',
      component: () => import('../views/admin/clubs/dashboard.vue'),
      name: 'Clubs Home',
      meta: { title: 'Home' },
    },
    {
      path: 'new',
      name: 'New Club',
      component: () => import('../views/admin/clubs/club-form.vue'),
      meta: { title: 'New Club' },
      props: { isUpdate: false },
    },
    {
      path: ':id/:code',
      component: () => import('../views/admin/clubs/club-home.vue'),
      children: [
        {
          path: '',
          name: 'View Club',
          component: () => import('../views/admin/clubs/view-club.vue'),
          meta: { title: 'Club Home' },
        },
        {
          path: 'update',
          name: 'Update Club',
          component: () => import('../views/admin/clubs/club-form.vue'),
          meta: { title: 'Update Club' },
          props: { isUpdate: true },
        },
      ],
      meta: { title: 'View Club' },
    },
  ],
};

export default routes;

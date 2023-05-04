import { createRouter, type RouteRecordRaw } from 'vue-router';

/** ADMIN ROUTES */
import clubs from './clubs';
import players from './players';
import managers from './managers';
import competitions from './competitions';
// import Calendar from '@/views/admin/calendar/calendar.vue';
/** ADMIN ROUTES */

/** USER ROUTES */
import userClubRoutes from './user/club';
// import AllFixtures from '@/views/user/seasons/fixtures.vue';
/** USER ROUTES */

// import AdminHome from '@/views/admin/dashboard.vue';
import AppView from '@/views/app-view.vue';
// import UserDashboard from '@/views/user/dashboard.vue';
// import Auth from '@/views/auth/auth.vue';
// import Login from '@/views/auth/login.vue';
// import Register from '@/views/auth/register.vue';
import Credits from '@/views/credits.vue';
import { createWebHistory } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';
import type { NavigationGuardNext } from 'vue-router';

export function replaceParams(
  path: string,
  replacements: { search: string; replace: string }[]
): string {
  replacements.forEach(r => {
    path.replace(r.search, r.replace);
  });

  return path;
}

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: async () => await import('@/views/auth/auth.vue'),
    name: 'Auth',
    redirect: 'auth/login',
    children: [
      {
        path: 'login',
        component: async () => await import('@/views/auth/login.vue'),
        name: 'Login',
      },
      {
        path: 'join',
        component: async () => await import('@/views/auth/register.vue'),
        name: 'Register',
      },
    ],
  },
  {
    path: '/credits',
    component: Credits,
    name: 'Credits',
  },
  {
    path: '/',
    component: AppView,
    name: 'AppView',
    redirect: 'u',
    children: [
      {
        path: 'a',
        component: async () => await import('@/views/admin/admin.vue'),
        children: [
          {
            path: '',
            component: async () => await import('@/views/admin/dashboard.vue'),
            name: 'Admin Home',
          },
          {
            path: 'calendar',
            component: async () => await import('@/views/admin/calendar/calendar.vue'),
            name: 'Calendar',
          },
          competitions,
          clubs,
          players,
          managers,
        ],
        meta: { title: 'Admin' },
      },
      {
        path: 'u',
        component: async () => await import('@/views/user/user.vue'),
        children: [
          {
            path: '',
            component: async () => await import('@/views/user/dashboard.vue'),
            name: 'User Home',
          },

          {
            path: 'fixtures',
            component: async () => await import('@/views/user/seasons/fixtures.vue'),
            name: 'All Fixtures',
          },
          {
            path: 'stats/:type/:season_id',
            component: async () => await import('@/views/user/seasons/stats.vue'),
            name: 'Season Stats',
          },
          {
            path: 'lobby',
            component: async () => await import('@/views/user/lobby.vue'),
            name: 'User Lobby',
          },

          userClubRoutes,
        ],
        meta: { title: 'User' },
      },
      {
        path: '/matchzone/:fixture',
        component: async () => await import('@/views/game/matchzone.vue'),
        name: 'MatchZone',
      },
      {
        path: '/finish/season/:season_id',
        component: async () => await import('@/views/misc/end-of-season.vue'),
        name: 'Finish Season',
      },
      {
        path: '/finish/year/:calendar_id',
        component: async () => await import('@/views/misc/end-of-year.vue'),
        name: 'Finish Year',
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const isAuthenticated = window.localStorage.getItem('fspro-user');

  if (!RegExp(/\/auth/).test(_to.path) && !isAuthenticated) {
    next({ name: 'Auth' });
  } else {
    next();
  }
});

export default router;

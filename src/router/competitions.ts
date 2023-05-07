import { type RouteRecordRaw } from 'vue-router';
import CompetitionsHome from '@/views/admin/competitions/dashboard.vue';
import CompetitionSeasonsHome from '@/views/admin/seasons/dashboard.vue';
import ViewCompetition from '@/views/admin/competitions/view-competition.vue';
import CompetitionForm from '@/views/admin/competitions/competition-form.vue';
import CompetitionHome from '@/views/admin/competitions/competition-home.vue';
import SeasonForm from '@/views/admin/seasons/season-form.vue';
import SeasonHome from '@/views/admin/seasons/view-season.vue';
import { replaceParams } from './index';
import type { RouteLocationNormalized } from 'vue-router';

const routes: RouteRecordRaw = {
  path: 'competitions',
  component: async () =>
    await import('../views/admin/competitions/Competitions.vue'),
  children: [
    {
      path: '',
      name: 'Competition Home',
      component: CompetitionsHome,
      meta: {
        title: 'Home'
      }
    },
    {
      path: ':id/:code',
      component: CompetitionHome,
      children: [
        {
          path: '',
          name: 'View Competition',
          component: ViewCompetition,
          props: (route: RouteLocationNormalized) => ({
            title: (route.params.code as string).toUpperCase(),
            to: () => {
              return replaceParams(route.path, [
                { search: ':id', replace: route.params.id },
                { search: ':code', replace: route.params.code }
              ]);
            }
          })
        },
        {
          path: 'update',
          name: 'Update Competition',
          component: CompetitionForm,
          props: (route: RouteLocationNormalized) => ({
            title: 'Update',
            to: () => {
              return replaceParams(route.path, [
                { search: ':id', replace: route.params.id },
                { search: ':code', replace: route.params.code }
              ]);
            },
            isUpdate: true
          })
        },
        {
          path: 'seasons',
          component: async () =>
            await import('../views/admin/seasons/seasons-home.vue'),
          children: [
            {
              path: '',
              component: CompetitionSeasonsHome,
              name: 'Seasons Home'
            },
            {
              path: ':seasonId/:seasonCode',
              component: SeasonHome,
              name: 'View Season'
            },
            {
              path: 'new',
              name: 'New Season',
              component: SeasonForm,
              props: (route: RouteLocationNormalized) => ({
                title: 'New Season',
                to: () => {
                  return replaceParams(route.path, [
                    { search: ':id', replace: route.params.id },
                    { search: ':code', replace: route.params.code }
                  ]);
                }
              })
            }
          ],
          meta: { title: 'Seasons' }
        }
      ],
      props: (route: RouteLocationNormalized) => ({
        title: (route.params.code as string).toUpperCase(),
        to: () => {
          return replaceParams(route.path, [
            { search: ':id', replace: route.params.id },
            { search: ':code', replace: route.params.code }
          ]);
        }
      })
    },
    {
      path: 'new',
      name: 'New Competition',
      component: CompetitionForm,
      meta: { title: 'New Competition' },
      props: { isUpdate: false }
    }
  ],
  meta: {
    title: 'Competitions Home'
  }
};
export default routes;

<template>
  <router-view />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { type ICalendar } from '@/interfaces/calendar';

@Component({})
export default class User extends Vue {
  // get current calendar...
  currentCalendar: ICalendar | unknown = {};

  getCurrentCalendar() {
    this.$axios
      .get('/current')
      .then(response => {
        console.log('Current calendar: ', response.data);
      })
      .catch(response => {
        console.log(response);
      });
  }

  mounted() {
    this.$store.dispatch('SET_CALENDAR');

    this.$nextTick(() => {
      console.log('Inside nextTick at ', new Date());
      // this.$store.dispatch('SET_SEASONS');
      this.$store.dispatch('SET_USER_CLUBS');
    });
  }
}
</script>

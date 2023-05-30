<template>
  <v-slide-group
    v-model="selectedDayIndex"
    show-arrows
    mandatory
    center-active
    @click:next="nextDay()"
  >
    <v-slide-item
      v-for="(day, i) in days$"
      :key="i"
      v-slot="{ active, toggle }"
    >
      <calendar-day
        :day="day"
        :active="active"
        :toggle="toggle"
        :club="club"
        :single-league="singleLeague"
      />
    </v-slide-item>
  </v-slide-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CalendarDay from './day.vue';

export default defineComponent({
  components: {
    CalendarDay
  },
  props: {
    days: {
      type: Array<object>,
      required: true
    },
    singleLeague: {
      type: Boolean,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    club: String
  },
  emits: ['selected-day-index-changed'],
  data() {
    return {
      selectedDayIndex: 0
    };
  },
  computed: {
    days$() {
      return this.days;
    },
    currentDay() {
      return this.$store.getters.calendar.CurrentDay;
    }
  },
  watch: {
    selectedDayIndex: {
      handler(val: number) {
        this.$emit('selected-day-index-changed', val);
      }
    }
  },
  methods: {
    nextDay() {
      console.log('Next clicked');
    }
  }
});
</script>

<style></style>

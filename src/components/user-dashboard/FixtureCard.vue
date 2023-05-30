<template>
  <v-card height="300px">
    <v-card-subtitle>
      {{ props.match.Fixture.LeagueCode }}
      <v-icon size="small" color="amber-lighten-3">mdi-trophy</v-icon>
    </v-card-subtitle>
    <p class="mb-0 mt-0 text-caption">
      Week
      {{ props.match.Week }}
    </p>

    <v-card-text>
      <v-avatar>
        <v-icon>${{ props.match.Fixture.Home }}</v-icon>
      </v-avatar>
      vs
      <v-avatar>
        <v-icon>${{ props.match.Fixture.Away }}</v-icon>
      </v-avatar>

      <div class="pa-0 text-center">
        <p class="mb-2 text-caption text-white">
          {{ props.match.Fixture.Title }}
        </p>

        <p class="mb-0 text-caption">
          {{ props.match.Fixture.Stadium }}
        </p>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn variant="flat" color="success" block :disabled="props.match.Fixture.Played"
        :to="'/matchzone/' + props.match.Fixture._id.toString()">
        Play
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { type ICalendarMatch } from '@/interfaces/calendar';

const props = defineProps<{
  match: ICalendarMatch;
}>();
</script>

<style scoped></style>

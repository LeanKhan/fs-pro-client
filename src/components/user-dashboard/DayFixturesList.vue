<template>
  <!-- eslint-disable vuetify/no-deprecated-components -->
  <!-- eslint-disable vue/no-v-text-v-html-on-component -->
  <v-list>
    <v-list-item-group
      v-model="selectedMatch"
      :mandatory="mandatorySelect"
      two-line
      color="primary"
      @change="$emit('match-selected', props.matches[selectedMatch])"
    >
      <v-list-item
        v-for="(match, i) in props.matches"
        :key="i"
        :title="match.Fixture.Title + ' -> ' + match.Competition"
      >
        <v-list-item-icon>
          <v-icon>${{ match.Fixture.Home }}</v-icon>
          vs
          <v-icon>${{ match.Fixture.Away }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <div v-if="detail == 'details'">
            <v-list-item-title>
              {{ match.Fixture.Title }}
            </v-list-item-title>

            <v-list-item-subtitle v-text="match.Fixture.Competition" />
          </div>

          <div v-if="detail == 'results' && match.Fixture.Details">
            {{ match.Fixture.Details.HomeTeamScore }} :
            {{ match.Fixture.Details.AwayTeamScore }}
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script setup lang="ts">
import { type ICalendarMatch } from '@/interfaces/calendar';
import { defineProps, ref } from 'vue';

const $emit = defineEmits(['match-selected']);

const selectedMatch = ref<any>(null);

const props = defineProps({
  matches: {
    type: Array as () => ICalendarMatch[],
    required: true
  },
  detail: {
    type: String as () => 'details' | 'results',
    required: false,
    default: 'details'
  },
  mandatorySelect: {
    type: Boolean,
    required: false,
    default: true
  }
});
</script>

<style scoped></style>

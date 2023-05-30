<template>
  <v-timeline>
    <v-timeline-item
      v-for="(event, i) in usefulEvents"
      :key="i"
      :dot-color="eventColor(event.type)"
      :icon="eventIcon(event.type)"
    >
      <template #opposite>
        <span class="font-weight-bold">"{{ event.time }}</span>
      </template>
      {{ event.message }}
    </v-timeline-item>
  </v-timeline>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-facing-decorator';

@Component({})
export default class Timeline extends Vue {
  @Prop({ required: true }) Events!:
    | any
    | { message: string; time: string | number; type: string };

  get usefulEvents() {
    return this.Events.filter(
      (ev: any) => !['dribble', 'tackle'].includes(ev.type)
    );
  }

  eventColor(type: string) {
    switch (type) {
      case 'match':
        return 'yellow';

      case 'save':
        return 'blue';

      case 'miss':
        return 'red';
      case 'goal':
        return 'green accent-3';
    }
  }
  eventIcon(type: string) {
    switch (type) {
      case 'match':
        return 'mdi-flag';

      case 'save':
        return 'mdi-shield';

      case 'miss':
        return 'mdi-close-thick';
      case 'goal':
        return 'mdi-soccer';
    }
  }
}
</script>

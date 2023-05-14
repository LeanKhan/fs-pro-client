<template>
  <div class="align-center d-flex flex-column" :class="isHome">
    <v-card-subtitle>
      {{ clubName }} -
      <b>{{ clubCode }}</b>
    </v-card-subtitle>

    <v-badge
      v-if="winner == side"
      bordered
      top
      color="gold"
      dot
      offset-x="10"
      offset-y="10"
    >
      <v-avatar tile size="30px">
        <v-icon color="gold" style="font-size: 30px; height: 30px" size="large">
          mdi-trophy
        </v-icon>
      </v-avatar>
    </v-badge>

    <v-avatar tile size="100px">
      <v-img :src="`${api}/img/clubs/logos/${clubCode}.png`" width="100px" />
    </v-avatar>

    <div>
      <v-rating
        :model-value="clubRating"
        :half-increments="true"
        :readonly="true"
        size="14px"
        :color="isHome ? 'deep-purple darken-3' : 'pink accent-3'"
        class="bg-secondary-lighten-1"
      />
      <span class="text-caption text-muted ml-1">
        {{ $filters.roundTo(clubRating, 1) }}
      </span>
    </div>

    <div v-if="clubStandings.standing" class="text-caption">
      <span class="ma-0 pr-2">
        {{ $filters.ordinal(clubStandings.position) }}
      </span>
      -
      <span class="ma-0 pl-2">{{ clubStandings.standing.Points }} Pts</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-facing-decorator';
import { apiUrl } from '@/store';

@Component({})
export default class ClubWidget extends Vue {
  @Prop({ required: true }) readonly clubName: any;
  @Prop({ required: true }) readonly isHome: any;
  @Prop({ required: true }) readonly rating: any;
  @Prop({ required: true }) readonly clubCode: any;
  @Prop({ required: false }) readonly clubStandings: any;
  @Prop({ required: false }) readonly winner!: string;

  api = apiUrl;

  get clubRating() {
    if (this.rating) {
      return Math.round(this.rating) / 20;
    } else {
      return 0;
    }
  }

  get side() {
    return this.isHome ? 'home' : 'away';
  }
}
</script>

<template>
  <div>
    <v-tabs v-model="tab" fixed-tabs>
      <v-tab>Squad</v-tab>

      <v-tab>Setup</v-tab>

      <v-tab>Today</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <div class="px-0 py-2">
          <DugoutClub
            :match-finished="matchFinished"
            :club="home"
            :club-squad="homeSquad"
            :is-home="true"
          />

          <v-divider />
          <!-- Away Squad -->
          <DugoutClub
            :match-finished="matchFinished"
            :club="away"
            :club-squad="awaySquad"
            :is-home="false"
          />
        </div>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>Coming soon...</v-card-text>
      </v-tab-item>

      <v-tab-item>
        <v-card-text>
          <DayFixturesList
            :matches="currentDay.Matches"
            detail="results"
            :mandatory-select="false"
            @match-selected="matchSelected"
          />
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-facing-decorator';
import DugoutClub from './dugout-club.vue';
import DayFixturesList from '@/components/user-dashboard/DayFixturesList.vue';

@Component({
  components: {
    DugoutClub
  }
})
export default class Dugout extends Vue {
  @Prop({ required: true }) home!: any;
  @Prop({ required: true }) away!: any;
  @Prop({ required: false }) homeSquad!: any;
  @Prop({ required: false }) awaySquad!: any;
  @Prop({ required: false }) match!: any;
  @Prop({ required: false, default: false }) matchFinished!: any;
  @Prop({ required: false }) currentDay!: any;
  @Prop({ required: true }) currentFixture!: any;

  tab: any = null;

  showHomeSquad = false;
  showAwaySquad = false;

  get HomeSideDetails() {
    if (this.match) return this.match.HomeSideDetails;
    else return false;
  }

  get AwaySideDetails() {
    if (this.match) return this.match.AwaySideDetails;
    else return false;
  }

  get otherFixtures() {
    if (this.currentDay) {
      // TODO: replace 'any' tyoe
      return this.currentDay.Matches.map((f: any) => f.Fixture);
    }
  }

  matchSelected(match: any) {
    console.log('Selceted match => ', match);
    // change slectedLeague
    this.$emit('match-selected', match);
  }
}
</script>

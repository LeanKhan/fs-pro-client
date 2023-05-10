<template>
  <div id="end-of-season">
    <v-container v-if="season" fluid class="pa-0">
      <v-toolbar dense color="dark">
        <v-toolbar-title class="mx-auto">
          {{ season.Year }} {{ season.CompetitionCode }} Season Statistics
        </v-toolbar-title>

        <v-spacer />

        <v-btn variant="flat" size="small" icon @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-row>
        <template v-for="(attr) in statsAttributes" :key="attr">
          <v-col cols="3">
            <v-card>
              <v-card-title class="capitalize">Highest {{ attr }}</v-card-title>

              <v-list v-if="topPlayers[attr].length > 0">
                <v-list-item
                  v-for="(p, i) in (topPlayers[attr] as any)"
                  :key="i"
                >
                  <v-list-item-avatar>
                    <v-icon style="font-size: 30px; height: 30px" size="large">
                      ${{ p.player.ClubCode }}
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-title>
                    {{ p.player.FirstName }} {{ p.player.LastName }}
                  </v-list-item-title>

                  <v-list-item-avatar size="40px" color="blue">
                    <span class="text-white font-weight-bold">
                      {{ $filters.roundTo(p[attr], 2) }}
                    </span>
                  </v-list-item-avatar>
                </v-list-item>
              </v-list>

              <v-sheet v-else>
                <v-btn
                  :disabled="loadingPlayerStats"
                  :loading="loadingPlayerStats"
                  @click="loadStats(attr)"
                >
                  Load
                </v-btn>
              </v-sheet>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-container>

    <!-- loading overlay -->
    <v-overlay :model-value="loading">
      <v-progress-circular indeterminate size="68" />
    </v-overlay>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import Standings from '@/components/seasons/standings.vue';

@Component({
  components: {
    Standings
  }
})
export default class SeasonStats extends Vue {
  // after end of season, check if the Year is alos over (that is, all the seasons are finished...)
  // then go to End Of Year...

  loading = false;

  season: any = {};

  loadingPlayerStats = false;

  statsAttributes = ['points', 'goals', 'assists', 'saves'];

  topPlayers: {
    points: [];
    goals: [];
    assists: [];
    saves: [];
    [key: string]: [];
  } = {
    points: [],
    goals: [],
    assists: [],
    saves: []
  };

  get seasonId() {
    return this.$route.params.season_id;
  }

  close() {
    this.$router.push('/u');
  }

  loadStats(attribute: string) {
    this.loadingPlayerStats = true;
    this.$axios
      .get(
        `/players/stats?match_k=season._id&match_v=${this.seasonId}&sort_k=${attribute}&sort_v=-1`
      )
      .then(response => {
        if (response.data.success) {
          this.topPlayers[attribute] = response.data.payload;
        }
      })
      .catch(err => {
        console.log(`Error fetching player with most ${attribute} => `, err);
      })
      .finally(() => {
        this.loadingPlayerStats = false;
      });
  }

  mounted() {
    console.log('Fetching Season...');
    this.loading = true;

    this.$axios
      .get(`/seasons/${this.seasonId}?populate=false`)
      .then(response => {
        this.season = response.data.payload;
      })
      .catch(err => {
        console.log('Error fetching Season => ', err);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>

<style></style>

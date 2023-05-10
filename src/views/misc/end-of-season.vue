<template>
  <div id="end-of-season">
    <v-container v-if="season" fluid class="pa-0">
      <v-toolbar dense color="dark">
        <v-toolbar-title class="mx-auto">
          End of {{ season.Year }} {{ season.CompetitionCode }} Season
        </v-toolbar-title>

        <v-spacer />

        <v-btn
          v-if="!season.isFinished"
          variant="flat"
          size="small"
          icon
          @click="close()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-btn v-else color="pink-accent-3" @click="close()">CONTINUE</v-btn>
      </v-toolbar>
      <v-row>
        <v-col cols="9" class="px-1">
          <v-card rounded="0" height="100%">
            <v-toolbar color="pink-accent-3" dense flat>Results</v-toolbar>

            <v-sheet v-if="!season.isFinished" class="pa-4 danger">
              Ending Season
              <br />
              <v-btn
                color="warning"
                :loading="loading"
                :disabled="loading"
                @click="finishSeason()"
              >
                Finish Now
              </v-btn>
            </v-sheet>

            <v-sheet
              v-else-if="season.CompiledStandings || standings.length > 0"
              class="d-flex flex-column pa-3 v-toolbar v-toolbar--prominent justify-center text-center"
            >
              <p>
                Having Successfully completed
                {{ season.Fixtures.length }} matches and come out on top,
                {{ season.Winner.Name }} is thereby crowned champions of the
                league.
              </p>
              <div>
                <template v-if="standings.length > 0">
                  <v-img
                    class="mx-auto"
                    :src="`${api}/img/clubs/logos/${standings[0].ClubCode}.png`"
                    width="140px"
                  />
                </template>

                <template v-else-if="season.CompiledStandings">
                  <v-img
                    class="mx-auto"
                    :src="`${api}/img/clubs/logos/${season.CompiledStandings[0].ClubCode}.png`"
                    width="140px"
                  />
                </template>

                <p class="text-subtitle-1">
                  Champions {{ season.CompetitionCode }}
                  {{ season.Year }} Season
                </p>
              </div>
            </v-sheet>

            <div v-else>
              Season is over, but data is not displayed here yet...
            </div>

            <template v-if="season.isFinished">
              <PlayerAwards ref="awardsComponent" :season-id="seasonId" />
            </template>

            <!-- Show top Players! -->
            <PlayerStats :season-id="seasonId" />
          </v-card>
        </v-col>

        <v-col cols="3" class="px-1">
          <v-card rounded="0" height="100%">
            <v-toolbar color="pink-accent-3" dense flat>
              Final Standings
            </v-toolbar>

            <p v-if="!season.isFinished">Ending Season {{ season.Title }}</p>

            <!-- TODO: highlight promoted or relegated -->
            <Standings
              v-else-if="standings || season.CompiledStandings"
              :week-standings="season.CompiledStandings || standings"
            />

            <div v-else>
              Season is over, but data is not displayed here yet...
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- loading overlay -->
    <v-overlay :model-value="loading">
      <v-progress-circular indeterminate size="68" />
    </v-overlay>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-facing-decorator';
import Standings from '@/components/seasons/standings.vue';
import PlayerStats from '@/components/seasons/player-stats.vue';
import PlayerAwards from '@/components/seasons/player-awards.vue';
import { apiUrl } from '@/store';

@Component({
  components: {
    Standings,
    PlayerStats,
    PlayerAwards
  }
})
export default class EndOfSeason extends Vue {
  @Ref('awardsComponent') readonly awardsComponent!: PlayerAwards;
  // after end of season, check if the Year is alos over (that is, all the seasons are finished...)
  // then go to End Of Year...

  loading = false;

  api = apiUrl;

  season: any = {};

  standings: any = {};

  failToEnd = false;

  get seasonId() {
    return this.$route.params.season_id;
  }
  close() {
    this.$router.push('/u');
  }

  finishSeason() {
    console.log('Finishing Season...');
    this.loading = true;
    this.$axios
      .post(`/seasons/${this.seasonId}/finish`)
      .then(response => {
        if (response.data.success) {
          this.standings = response.data.payload.standings;
          this.season = response.data.payload.season;

          this.$nextTick(() => {
            console.log('Inside nextTick at ', new Date());
            console.log(this.$refs.awardsComponent);

            this.awardsComponent.fetchAwards();
          });
        } else {
          this.failToEnd = true;
        }
      })
      .catch(err => {
        console.log('Error finishing => ', err);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  mounted() {
    console.log('Fetching Season...');
    this.loading = true;

    this.$axios
      .get(`/seasons/${this.seasonId}?populate=Fixtures Winner`)
      .then(response => {
        this.season = response.data.payload;

        if (this.season.isFinished) {
          this.$nextTick(() => {
            this.awardsComponent.fetchAwards();
          });
        }
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

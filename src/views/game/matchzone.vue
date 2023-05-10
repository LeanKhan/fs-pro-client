<template>
  <div class="home">
    <v-app-bar dense color="dark">
      <v-avatar tile size="30px">
        <v-icon style="font-size: 30px; height: 30px" size="large">
          ${{ fixture.Home }}
        </v-icon>
      </v-avatar>

      vs

      <v-badge
        bordered
        bottom
        color="green-accent-3"
        dot
        offset-x="10"
        offset-y="10"
      >
        <v-avatar tile size="30px">
          <v-icon style="font-size: 30px; height: 30px" size="large">
            ${{ fixture.Away }}
          </v-icon>
        </v-avatar>
      </v-badge>

      <div class="mx-auto">
        MATCHZONE

        <v-chip v-if="lastMatchOfSeason || fixture.isFinalMatch">
          LAST MATCH
        </v-chip>

        Matchday {{ fixture.MatchDay }}

        <v-chip v-if="simulateRest" small color="primary">simulation</v-chip>
      </div>

      <v-spacer />

      <v-btn
        v-if="!matchFinished"
        variant="flat"
        size="small"
        icon
        @click="$router.push('/u')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-btn
        v-else-if="!lastMatchOfSeason"
        color="pink-accent-3"
        @click="$router.push('/u')"
      >
        FINISH MATCH
      </v-btn>

      <v-btn
        v-else-if="lastMatchOfSeason"
        color="green-accent-3"
        @click="finishSeason()"
      >
        &lt; FINISH SEASON &gt;
      </v-btn>
    </v-app-bar>

    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <!-- <v-col cols="2" class="pr-2">
          <v-card tile height="100%">
            <v-toolbar color="green accent-3" dense flat tile>
              Press
            </v-toolbar>
            <v-sheet>
              No match?
            </v-sheet>
          </v-card>
        </v-col> -->
        <v-col cols="9" class="px-1">
          <v-card rounded="0" height="100%">
            <v-toolbar color="green-accent-3" dense flat>
              Field
              <v-spacer />

              <v-switch v-model="simulateRest" label="Simulate Rest" />
            </v-toolbar>
            <!-- Data -->

            <v-row no-gutters>
              <v-col cols="8">
                <v-card
                  flat
                  rounded="0"
                  color="secondary-darken-4"
                  class="py-2"
                  width="100%"
                >
                  <div
                    class="d-flex justify-center align-center flex-column text-caption"
                  >
                    <span class="text-body-2 text-cyan-accent-3">90:00</span>
                    <span class="text-grey">
                      {{ fixture.LeagueCode }}
                    </span>
                  </div>

                  <!-- Match stuff -->
                  <v-row>
                    <v-col cols="5" class="text-center">
                      <!-- Home team -->
                      <template v-if="fixture.HomeTeam">
                        <club-widget
                          :winner="winner"
                          :club-name="fixture.HomeTeam.Name"
                          :club-code="fixture.Home"
                          :is-home="true"
                          :rating="fixture.HomeTeam.Rating"
                          :club-standings="homeStandings"
                        />
                      </template>
                    </v-col>

                    <!-- Scores and stats -->
                    <v-col
                      cols="2"
                      class="align-center d-flex flex-column justify-center text-center py-4 px-0"
                    >
                      <div style="width: 100%">
                        <div class="text-h3 ma-0 d-flex justify-space-around">
                          <div>
                            <span>
                              {{ HomeTeamScore || '0' }}
                            </span>

                            <v-divider
                              style="
                                border-width: 2px !important;
                                border-radius: 2px !important;
                              "
                              class="bg-deep-purple-darken-3"
                            />
                          </div>
                          <span class="text-muted text-secondary-lighten-1">
                            :
                          </span>
                          <div>
                            <span>
                              {{ AwayTeamScore || '0' }}
                            </span>
                            <v-divider
                              style="
                                border-width: 2px !important;
                                border-radius: 2px !important;
                              "
                              class="bg-pink-accent-3"
                            />
                          </div>
                        </div>

                        <div>
                          <!-- <v-chip small class="mt-4">
                            Kickoff
                          </v-chip> -->
                          <v-btn
                            v-if="!allReady"
                            class="mt-2"
                            color="green-accent-3"
                            @click="openLobby = true"
                          >
                            START
                          </v-btn>
                        </div>
                      </div>
                    </v-col>

                    <v-col cols="5" class="text-center">
                      <!-- Away team -->
                      <template v-if="fixture.AwayTeam">
                        <club-widget
                          :won="winner"
                          :club-name="fixture.AwayTeam.Name"
                          :club-code="fixture.Away"
                          :is-home="false"
                          :rating="fixture.AwayTeam.Rating"
                          :club-standings="awayStandings"
                        />
                      </template>
                    </v-col>
                  </v-row>

                  <!-- Setup button -->
                  <v-overlay absolute :model-value="starting && !matchFinished">
                    <v-progress-circular
                      color="success"
                      size="130"
                      width="15"
                      indeterminate
                    />
                  </v-overlay>

                  <v-row no-gutters class="mt-2">
                    <v-col
                      class="align-center text-caption d-flex flex-column justify-center text-center"
                    >
                      <div class="text-caption text-grey">
                        <span>
                          {{ fixture.SeasonCode }} - {{ fixture.Title }}
                        </span>
                        <p class="ma-0">
                          {{ fixture.Stadium }}
                        </p>
                        <p class="ma-0">
                          {{ fixture.Week }}
                        </p>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>

                <v-row no-gutters>
                  <v-col cols="8" class="pr-1">
                    <v-card flat rounded="0" min-height="320px">
                      <v-toolbar color="green-accent-3" dense flat>
                        Results
                      </v-toolbar>
                      <v-card-text class="d-flex justify-center flex-column">
                        <template v-if="!matchFinished">
                          No data yet...
                        </template>

                        <results
                          v-if="matchFinished"
                          :home="fixture.Home"
                          :away="fixture.Away"
                          :match-details="{
                            Home: fixture.HomeSideDetails,
                            Away: fixture.AwaySideDetails
                          }"
                        />
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col cols="4" class="pl-1">
                    <v-card flat rounded="0" min-height="320px">
                      <v-toolbar color="green-accent-3" dense flat>
                        MOTM
                      </v-toolbar>
                      <v-card-text>
                        <template v-if="!matchFinished">No data</template>

                        <template v-else>
                          <motm :motm_id="MOTM" />
                        </template>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
              <!-- Events -->
              <v-col cols="4">
                <v-card
                  flat
                  rounded="0"
                  height="100%"
                  max-height="550px"
                  style="overflow-y: auto"
                >
                  <!-- <v-toolbar color="green accent-3" dense flat tile>
                    Timeline
                  </v-toolbar> -->
                  <v-card-subtitle class="text-center text-cyan-accent-3">
                    Timeline
                  </v-card-subtitle>
                  <v-card-text>
                    <template v-if="!matchFinished">No data yet...</template>
                    <!-- TODO: I think this Timeline should be moved to where 'MOTM' widget is and here will be the actual field.  -->
                    <!-- Thank you Jesus! -->
                    <timeline v-else :events="fixture.Events" />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <!-- Other stuff.. userland -->
        <v-col cols="3" class="pl-2">
          <v-card rounded="0" height="100%">
            <v-toolbar color="green-accent-3" dense flat>Dugout</v-toolbar>
            <dugout
              v-if="fixture.HomeTeam"
              :home="fixture.HomeTeam"
              :away="fixture.AwayTeam"
              :home-squad="mappedHomeSquad"
              :away-squad="mappedAwaySquad"
              :match="fixture"
              :match-finished="matchFinished"
              :current-day="currentDay"
              :current-fixture="fixture._id"
              @match-selected="matchSelected"
            />
          </v-card>
        </v-col>
      </v-row>
      <game-lobby
        v-if="fixture.HomeTeam && fixture.AwayTeam"
        v-model:show="openLobby"
        :home="{ Name: fixture.HomeTeam.Name, ClubCode: fixture.Home }"
        :away="{ Name: fixture.AwayTeam.Name, ClubCode: fixture.Away }"
        @all-ready="ready"
      />

      <v-skeleton-loader v-else class="mx-auto" max-width="500" type="card" />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import ClubWidget from '@/components/matchzone/club.vue';
import GameLobby from '@/components/matchzone/game-lobby.vue';
// Widgets //
import {
  Dugout,
  Results,
  Timeline,
  Motm
} from '../../components/matchzone/widgets';
import { apiUrl } from '@/store';

@Component({
  name: 'MatchZone',
  components: {
    ClubWidget,
    Motm,
    GameLobby,
    Dugout,
    Results,
    Timeline
  }
})
export default class MatchZone extends Vue {
  public api: string = apiUrl;

  public whistle: any;

  fixture: any = {};

  currentMatch: any = {};

  currentDay: any = {};

  allReady = false;

  openLobby = false;

  kickoffTimer = 0;

  starting = false;

  lastMatchOfSeason = false;

  showPlayOverlay = true;

  imSetup = false;

  // Match data //
  matchDetails: any = {};

  matchEvents: any = {};

  homeSquad: any = {};

  awaySquad: any = {};

  otherResults: any = [];

  standings: any = null;

  // Simulate rest
  simulateRest = false;

  /** Computed */

  get user() {
    return this.$store.getters.user;
  }

  get winner() {
    if (
      this.fixture &&
      this.fixture.HomeSideDetails &&
      this.fixture.AwaySideDetails
    )
      return this.fixture.HomeSideDetails.Won &&
        !this.fixture.AwaySideDetails.Won
        ? 'home'
        : 'away';
    else return 'draw';
  }

  get fixtureId() {
    return this.$route.params.fixture;
  }

  get AwayTeamScore() {
    if (!this.fixture.Details) {
      return null;
    }

    return this.fixture.Details.AwayTeamScore;
  }

  get HomeTeamScore() {
    if (!this.fixture.Details) {
      return null;
    }

    return this.fixture.Details.HomeTeamScore;
  }

  get MOTM() {
    if (!this.fixture.Details) {
      return null;
    }

    return this.fixture.Details.MOTM;
  }

  // same as isPlayed
  get matchFinished() {
    return this.fixture.Played;
  }

  get isPlayed() {
    return this.fixture.Played;
  }

  /** Mathods */

  ready() {
    this.openLobby = false;

    this.allReady = true;

    this.starting = true;

    this.playGame();
  }

  timer() {
    let left = 0;

    const t = setInterval(() => {
      if (left > 3) {
        clearInterval(t);
      }

      this.kickoffTimer = 3 - left;
      left += 1;
    }, 1000);
  }

  getFixture() {
    this.$axios
      .get(`/fixtures/${this.fixtureId}`, {
        params: {
          populate: JSON.stringify([
            { path: 'HomeTeam', populate: ['Players', 'Manager'] },
            { path: 'AwayTeam', populate: ['Players', 'Manager'] }
          ])
        }
      })
      .then(response => {
        // Check for errors here o
        this.fixture = response.data.payload;

        this.getStandings();
      })
      .catch(response => {
        console.log('Error initiating game => ', response);
      })
      .finally(() => {
        this.starting = false;
      });
  }
  finishSeason() {
    const ans = confirm(
      'Season is over hurray!\nEnd Season now... you must say okay.'
    );

    if (!ans) return false;

    // go to Season finishing page...
    this.$router.push(`/finish/season/${this.fixture.Season}`);
  }

  get mappedHomeSquad() {
    if (this.matchFinished && this.fixture.HomeSideDetails.PlayerStats) {
      return this.fixture.HomeTeam.Players.map((p: any) => ({
        ...p,
        stats: this.fixture.HomeSideDetails.PlayerStats.find(
          (s: any) => p._id == s.Player
        )
      }));
    }

    return this.fixture.HomeTeam.Players;
  }

  get mappedAwaySquad() {
    if (this.matchFinished && this.fixture.AwaySideDetails.PlayerStats) {
      return this.fixture.AwayTeam.Players.map((p: any) => ({
        ...p,
        stats: this.fixture.AwaySideDetails.PlayerStats.find(
          (s: any) => p._id == s.Player
        )
      }));
    }

    return this.fixture.AwayTeam.Players;
  }

  get homeStandings() {
    // find the clubs position in the league

    if (!this.standings) {
      return { position: 0, standing: null };
    }

    const position =
      this.standings.findIndex((c: any) => this.fixture.Home == c.ClubCode) + 1;

    return { position, standing: this.standings[position - 1] };
  }

  get awayStandings() {
    // find the clubs position in the league
    if (!this.standings) {
      return { position: 0, standing: null };
    }
    const position =
      this.standings.findIndex((c: any) => this.fixture.Away == c.ClubCode) + 1;

    return { position, standing: this.standings[position - 1] };
  }

  playGame() {
    this.timer();

    this.whistle.play();

    // TODO: give specific type
    const params:
      | { simulate_rest: boolean; send_other_results: boolean }
      | any = {};

    if (this.simulateRest) {
      params.simulate_rest = true;
      // don't send the results of other matches...
      params.send_other_results = false;
    }

    this.$axios
      .get(`/game/kickoff-new/${this.fixtureId}`, { params })
      .then(response => {
        // Check for errors here o
        // console.log(response.data);
        let main = response.data.payload;

        if (response.data.payload.main) {
          main = response.data.payload.main;
        }

        const { match, HomeSideDetails, AwaySideDetails } = main;

        // TODO: please clean this up so you don't repeat stuff!
        this.fixture = {
          ...this.fixture,
          ...match,
          HomeTeam: this.fixture.HomeTeam,
          AwayTeam: this.fixture.AwayTeam,
          HomeSideDetails,
          AwaySideDetails
        };
        this.lastMatchOfSeason = main.lastMatchOfSeason;
        this.getStandings();
        // fetch day again...
        this.getFixtureDay();
      })
      .catch(response => {
        console.log('Error playing match => ', response);
      });
  }

  getFixtureDay() {
    this.$axios
      .get(`/calendar/day-of-fixture/${this.fixtureId}`)
      .then(response => {
        console.log(response.data);
        this.currentDay = response.data.payload;
      })
      .catch(response => {
        console.log('Error fetching Day of Fixture => ', response);
      });
  }

  // TODO: put these network fetching methods separately...
  getStandings() {
    console.log('Fetching Standings');
    if (this.fixture.Season) {
      this.$axios
        .get(`/seasons/${this.fixture.Season}/standings`)
        .then(response => {
          console.log(response.data);
          this.standings = response.data.payload;
        })
        .catch(response => {
          console.log('Error fetching Standings => ', response);
        });
    }
  }

  matchSelected(match: any) {
    if (this.fixture.Played) {
      this.$router.push({ params: { fixture: match.Fixture._id } });
      this.initializeGame();
    }
  }

  initializeGame() {
    this.getFixture();
    this.getFixtureDay();
  }

  mounted() {
    this.whistle = new Audio('../../assets/sounds/whistle1.mp3');

    this.initializeGame();
  }
}
</script>

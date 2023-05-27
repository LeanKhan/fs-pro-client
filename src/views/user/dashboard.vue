<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <v-card background="transparent" color="transparent">
    <v-toolbar dense>
      <!-- Current day -->
      <v-toolbar-title class="text-subtitle-1 font-weight-bold text-indigo">
        Day {{ calendar.CurrentDay }} - Year {{ calendar.YearString }}
      </v-toolbar-title>

      <v-spacer />

      <v-toolbar-items>
        <!-- select league -->
        <select
          v-model="selectedLeagueId"
          class="text-indigo indigo-text"
          name="select_league"
          @blur="changeSelectedLeague(selectedLeagueId)"
        >
          <option disabled value="">Select League</option>
          <option v-for="(league, i) in leagues" :key="i" :value="league._id">
            {{ league.Name }}
          </option>
        </select>

        <v-btn
          v-if="calendar.allSeasonsCompleted"
          color="warning"
          @click="endYear()"
        >
          END YEAR
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- Main -->

    <v-row>
      <v-col cols="8">
        <!-- Fixtures and next matches -->
        <v-card color="transparent">
          <v-sheet width="100%" color="indigo">
            <div v-if="selectedDay" class="text-center">
              <template v-if="!selectedDay.isFree">
                <v-row class="px-2">
                  <v-col cols="6">
                    <!-- TODO: Make selectedMatch work for FixtureCard  -->
                    <FixtureCard :match="selectedDay.Matches[0]" />
                  </v-col>

                  <v-col cols="6">
                    <v-card
                      style="height: 300px; max-height: 300px; overflow-y: auto"
                    >
                      <DayFixturesList
                        :matches="selectedDay.Matches"
                        detail="details"
                        @match-selected="matchSelected"
                      />
                    </v-card>
                  </v-col>
                </v-row>
              </template>

              <template v-else>
                <v-card color="grey" height="190px">
                  <v-card-text>
                    No matches today
                    <v-icon>mdi-ball</v-icon>
                  </v-card-text>
                </v-card>
              </template>
            </div>
          </v-sheet>

          <!-- Fixtures scroller -->

          <v-sheet width="100%" color="dark" class="mt-5">
            <div>
              <h3>
                Upcoming Fixtures
                <v-spacer />
                <v-btn
                  variant="flat text"
                  size="small"
                  color="indigo"
                  to="u/fixtures"
                >
                  View All
                </v-btn>
              </h3>
            </div>
            <v-col cols="12">
              <day-scroll
                :days="days"
                :single-league="false"
                @selected-day-index-changed="selectDay"
              />
            </v-col>
          </v-sheet>
        </v-card>

        <!-- Standings and other stuff -->
        <v-card class="mt-3">
          <div class="text-center">
            <template v-if="seasons">
              <v-tabs v-model="seasonTab" fixed-tabs>
                <v-tab v-for="(season, i) in seasons" :key="i">
                  {{ season.CompetitionCode }}
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="seasonTab">
                <v-tab-item v-for="(season, i) in seasons" :key="i">
                  <standings-scroller :standings="season.Standings" />
                </v-tab-item>
              </v-tabs-items>
            </template>
          </div>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <h3>Season Stats</h3>
          <v-list>
            <v-list-item v-for="(s, i) in seasons" :key="i" lines="three">
              <v-list-item-title>{{ s.CompetitionCode }}</v-list-item-title>
              <span>
                <v-btn :to="`/u/stats/season/${s._id}`">
                  View Stats
                  <v-icon class="ml-1" color="primary">
                    mdi-chart-areaspline
                  </v-icon>
                </v-btn>
              </span>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import DayScroll from '../../components/calendar/day-scroll.vue';
import StandingsScroller from '@/components/seasons/standings-scroller.vue';
import FixtureCard from '@/components/user-dashboard/FixtureCard.vue';
import DayFixturesList from '@/components/user-dashboard/DayFixturesList.vue';
import { defineComponent } from 'vue';
import type { IDay } from '@/interfaces/calendar';
import type { Competition } from '@/interfaces/competition';

export default defineComponent({
  components: {
    DayScroll,
    StandingsScroller,
    FixtureCard,
    DayFixturesList
  },
  emits: ['match-selected', 'selected-day-index-changed'],
  data() {
    return {
      match: {},

      selectedDayIndex: 0,

      seasonTab: null,

      leagues: [] as Competition[],

      // id of the selected League
      selectedLeagueId: '',
      selectedLeague: {},

      selectedMatch: '',

      days: [],

      seasons: [] as any[]
    };
  },
  computed: {
    currentDay() {
      return this.$store.state.calendar.CurrentDay;
    },

    lobby() {
      return this.$store.getters.lobby;
    },

    calendar() {
      return this.$store.state.calendar;
    },

    selectedDay(): IDay {
      return this.days[this.selectedDayIndex];
    },

    $selectedLeague() {
      return this.$store.getters.selectedLeague;
    },

    yearString(): string {
      return this.$store.state.calendar.YearString;
    }
  },
  watch: {
    currentDay: {
      handler(day: number) {
        this.getDays(day);
      },
      immediate: true
    },
    lobby: {
      handler(toLobby: boolean) {
        if (toLobby) {
          this.$router.push('/u/lobby');
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.$nextTick(function () {
      if (this.lobby) {
        this.$router.push('/u/lobby');
      }
    });

    // fetch all leagues
    this.getLeagues();
  },
  methods: {
    endYear() {
      this.$router.push(`/finish/year/${this.calendar._id}`);
    },

    changeSelectedLeague(league_id: string) {
      if (league_id) {
        console.log('Selected League is => ', league_id);
        // fetch the league and populate...

        this.$store.dispatch('SET_SELECTED_LEAGUE', league_id);

        this.getLeagues(league_id);
        this.fetchCurrentSeason();
      }
    },

    matchSelected(match: any) {
      console.log('Selceted match => ', match);
      // change slectedLeague
      this.selectedLeagueId = match.CompetitionId;
      this.changeSelectedLeague(match.CompetitionId);
      this.selectedMatch = match;
    },

    fetchLeague(league_id: string) {
      console.log('Selected League is => ', this.selectedLeagueId, league_id);
      // fetch the league and populate...

      this.$router.push(`/finish/year/${this.calendar._id}`);
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getDays(_day: number) {
      // if the currentDay is greater than 14 get the next page...
      if (!this.calendar) return;

      const limit = 7;
      const week =
        this.calendar.CurrentDay == 0
          ? 1
          : Math.ceil(this.calendar?.CurrentDay / limit);

      // TODO: might put week back - 24/1/22
      const query = `/calendar/${this.yearString}/days?paginate=true&populate=true&limit=${limit}&week=${week}&not_played=true`;
      this.$axios
        .get(query)
        .then(response => {
          this.days = response.data.payload;
        })
        .catch(error => {
          console.log('Error getting days of Calendar Year!', error);
        });
    },

    getLeagues(league_id?: string) {
      let query = JSON.stringify({ Type: 'league' });
      let path = `/competitions/all?select=Name+Type+CompetitionCode&query=${query}`;

      if (league_id) {
        query = JSON.stringify({ _id: league_id });
        path = `/competitions/all?query=${query}`;

        this.$axios
          .get(path)
          .then(response => {
            this.selectedLeague = response.data.payload[0];
          })
          .catch(error => {
            console.log('Error getting all Leagues', error);
          });
      } else {
        this.$axios
          .get(path)
          .then(response => {
            this.leagues = response.data.payload;
          })
          .catch(error => {
            console.log('Error getting all Leagues', error);
          });
      }
    },

    fetchCurrentSeason() {
      if (this.calendar && this.calendar.YearString) {
        this.$axios
          .get(
            `/seasons?query=${JSON.stringify({
              Year: this.calendar.YearString,
              Competition: this.selectedLeagueId
            })}`
          )
          .then(response => {
            // Check for errors here o
            if (response.data.success) {
              this.seasons = response.data.payload;
            }
          })
          .catch(response => {
            console.log('Error fetching current Seasons! => ', response);
          });
      }
    },

    selectDay(val: number) {
      this.selectedDayIndex = val;
    }
  }
});
</script>

<style></style>

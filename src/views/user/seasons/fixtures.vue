<template>
  <v-card>
    <v-toolbar flat color="indigo-darken-1">
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title class="ml-1">All Fixtures</v-toolbar-title>
      <v-spacer />

      <!-- <v-btn
              :disabled="!shouldReload"
              @click="fetchClub"
              icon
              color="white"
            >
              <v-icon>
                mdi-reload
              </v-icon>
            </v-btn> -->
    </v-toolbar>

    <v-card-text>
      <v-tabs
        v-model="tab"
        bg-color="transparent"
        color="indigo"
        next-icon="mdi-arrow-right-bold-box-outline"
        prev-icon="mdi-arrow-left-bold-box-outline"
        show-arrows
      >
        <v-tabs-slider color="indigo" />
        <v-tab v-for="(season, i) in seasons" :key="i">
          {{ season.CompetitionCode }}
        </v-tab>
      </v-tabs>

      <div>
        <template v-if="fixturesLoading">
          <v-progress-circular indeterminate />
        </template>

        <template v-if="fixtures">
          <fixtures-table :fixtures="fixtures" />
        </template>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import FixturesTable from '@/components/seasons/fixtures-table.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    calendar: {
      type: Object
    }
  },
  components: {
    FixturesTable
  },
  data() {
    return {
      tab: 0,

      fixtures: {},

      fixturesLoading: false,

      selectedYear: ''
    };
  },
  computed: {
    currentYear() {
      return this.$store.getters.currentYear;
    },

    seasons() {
      return this.$store.state.seasons;
    },

    selectedSeason() {
      return this.seasons[this.tab];
    }
  },
  watch: {
    tab: {
      handler(val: number) {
        console.log('Tab Changed! =>', val);
        this.getFixtures();
      }
    }
  },
  mounted() {
    this.getFixtures();
    this.fetchCurrentSeasons();
  },
  methods: {
    getFixtures() {
      this.fixturesLoading = true;
      const select = JSON.stringify('Title Home Away Details Played');
      this.$axios
        .get(`/seasons/${this.selectedSeason._id}/fixtures?select=${select}`)
        .then(response => {
          this.fixtures = response.data.payload;
          console.log(response.data.payload);
        })
        .catch(error => {
          console.log('Error getting fixtures for Season :/', error);
        })
        .finally(() => {
          this.fixturesLoading = false;
        });
    },

    fetchCurrentSeasons() {
      if (this.calendar && this.calendar.YearString) {
        this.$axios
          .get(`/seasons?query=${JSON.stringify({ Year: this.currentYear })}`)
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
    }
  }
});
</script>

<style></style>

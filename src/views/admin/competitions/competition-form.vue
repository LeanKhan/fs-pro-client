<template>
  <div>
    <!-- Inset form here!  -->
    <v-dialog v-model="openClubModal" persistent max-width="800px">
      <clubs-table @close-club-modal="closeModal" />
    </v-dialog>
    <v-form @submit.prevent="submit">
      <v-card>
        <v-toolbar flat color="primary">
          <v-toolbar-title>
            {{ isUpdate ? 'Update' : 'Create' }} Competition
          </v-toolbar-title>
        </v-toolbar>

        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="form.Name" label="Name" />
            </v-col>

            <v-col cols="6">
              <v-text-field v-model="form.CompetitionCode" label="Code" />
            </v-col>

            <v-col cols="6">
              <v-radio-group
                v-model="form.Type"
                label="Type"
                @update:modelValue="typeChanged"
              >
                <v-radio
                  v-for="(type, i) in types"
                  :key="i"
                  :label="type"
                  :value="type.toLowerCase()"
                />
              </v-radio-group>
            </v-col>

            <v-col cols="6">
              <v-select
                v-model="form.Country"
                label="Country"
                :items="countries"
                item-title="Name"
                item-value="_id"
              />
            </v-col>

            <v-col cols="6">
              <v-select
                v-model="form.Division"
                label="Division"
                :items="divisions"
                hint="Whether it's in the first division and so on..."
              />
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="form.NumberOfTeams"
                required
                type="number"
                label="Number of Teams"
                max="40"
                min="1"
              />
            </v-col>

            <v-col v-if="form.Division != 1" cols="6">
              <v-text-field
                v-model="form.TeamsPromoted"
                required
                type="number"
                label="TeamsPromoted"
                max="5"
                min="0"
              />
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="form.TeamsRelegated"
                required
                type="number"
                label="TeamsRelegated"
                max="5"
                min="0"
              />
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="form.NumberOfWeeks"
                required
                type="number"
                max="40"
                min="1"
                label="Number of Weeks"
              />
            </v-col>

            <v-col cols="6">
              <club-list
                v-if="isUpdate"
                :clubs="competition.Clubs"
                :actions="true"
                @open-club-modal="openClubModal = true"
              />

              <v-card v-else>
                <v-sheet
                  color="pink-lighten-1"
                  height="100%"
                  width="100%"
                  class="px-3 py-2 text-center"
                  style="white-spaces: no-wrap"
                >
                  <div>
                    For now you can only add clubs to this competition after
                    creating it. Create the competition then update it :)
                  </div>
                </v-sheet>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn :color="`${isUpdate ? 'warning' : 'success'}`" @click="submit">
            {{ isUpdate ? 'Update' : 'Create Competition' }}
          </v-btn>

          <v-btn color="secondary" @click="$router.push('/competitions')">
            Cancel
          </v-btn>

          <v-btn v-if="isUpdate" color="error" @click="deleteCompetition">
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-facing-decorator';
import { type Competition } from '@/interfaces/competition';
import ClubList from '@/components/clubs/club-list.vue';
import ClubsTable from '@/components/clubs/clubs-table.vue';

@Component({
  components: {
    ClubList,
    ClubsTable
  }
})
export default class ComponentForm extends Vue {
  @Prop({ required: false }) readonly isUpdate!: boolean;
  competition: any = {};
  types = ['League', 'Cup', 'Tournament'];
  divisions = [1, 2, 3, 4, 0];

  openClubModal = false;

  form: any = {
    Name: '',
    Type: '',
    CompetitionCode: '',
    NumberOfTeams: '',
    NumberOfWeeks: '',
    TeamsPromoted: '',
    TeamsRelegated: '',
    Country: '',
    League: false,
    Cup: false,
    Tournament: false,
    Division: '',
    Clubs: [],
    Seasons: []
  };

  get countries(): string[] {
    return this.$store.getters.countries;
  }

  mounted(): void {
    if (this.isUpdate) {
      const competitionID = this.$route.params['id'];
      // const competitionCode = this.$route.params['code'];

      this.$axios
        .get(`/competitions/${competitionID}?populate=false`)
        .then(response => {
          this.competition = response.data.payload as Competition;
          this.form = response.data.payload as Competition;
        })
        .catch(response => {
          console.log('Response => ', response);
        });
    }
  }

  submit(): void {
    const competitionID = this.$route.params['id'];

    const url = this.isUpdate
      ? `/competitions/${competitionID}/update`
      : '/competitions/new?model=competition';

    this.$axios
      .post(url, { data: this.form })
      .then(response => {
        console.log('Response => ', response);
        let id = '';
        let code = '';
        if (this.isUpdate) {
          id = this.$route.params._id as string;
          code = this.$route.params.CompetitionCode as string;
        } else {
          id = response.data.payload._doc._id;
          code = response.data.payload._doc.CompetitionCode;
        }
        this.$router.push({ name: 'View Competition', params: { id, code } });
      })
      .catch(response => {
        console.log('Response => ', response);
      });
  }

  public typeChanged(type: string): void {
    switch (type) {
      case 'league':
        this.form.League = true;
        this.form.Cup = false;
        this.form.Tournament = false;
        break;
      case 'cup':
        this.form.Cup = true;
        this.form.League = false;
        this.form.Tournament = false;
        break;
      case 'tournament':
        this.form.Tournament = true;
        this.form.League = false;
        this.form.Cup = false;
        break;
      default:
        break;
    }
  }

  public closeModal(event: any): void {
    // SHIIIT Don't add clubs automatically while creating o! lol
    // TODO: Look into it! Abeg thank you Jesus
    this.openClubModal = false;
    if (event) {
      const competitionID = this.$route.params['id'];
      let compCode;

      if (Array.isArray(this.$route.params['code'])) {
        compCode = this.$route.params['code'][0].toUpperCase();
      } else {
        compCode = this.$route.params['code'].toUpperCase();
      }

      this.$axios
        .post(`/competitions/${competitionID}/add-club`, {
          clubId: event.id,
          leagueCode: compCode
        })
        .then(response => {
          console.log('Successfully added club to competition => ', response);
          // this.$router.push('/competitions');
        })
        .catch(response => {
          console.log('Error deleting comp =>', response.data);
        });
    }
  }

  deleteCompetition() {
    const answer = confirm(
      'Are you sure you want to delete ' + this.form.Name + '?!!'
    );

    if (answer) {
      const competitionID = this.$route.params['id'];

      this.$axios
        .delete(`/competitions/${competitionID}`)
        .then(response => {
          console.log('Successfully deleted competition => ', response);
          this.$router.push('/a/competitions');
        })
        .catch(response => {
          console.log('Error deleting comp =>', response.data);
        });
    }
  }
}
</script>

<style></style>

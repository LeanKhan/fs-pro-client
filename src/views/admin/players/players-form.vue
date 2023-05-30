<template>
  <div>
    <!-- Inset form here!  -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar flat color="indigo-darken-1">
            <v-btn icon @click="goBack">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <v-toolbar-title class="ml-1">
              {{ isUpdate ? 'Update Player' : 'Create Player' }}
            </v-toolbar-title>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
    <v-form @submit.prevent="submit">
      <v-row>
        <v-col cols="3">
          <v-card height="300" width="245" style="position: fixed">
            <v-card-title>Player</v-card-title>

            <v-card-text class="d-flex justify-center pb-0 bg-accent">
              <player-avatar :appearance="form.Appearance" />
            </v-card-text>

            <v-card-actions>Rating: {{ rating }}</v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="9">
          <v-card>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="form.FirstName"
                    color="indigo-darken-1"
                    label="First Name"
                  />
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model="form.LastName"
                    color="indigo-darken-1"
                    label="Last Name"
                  />
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model="form.Age"
                    color="indigo-darken-1"
                    type="number"
                    min="16"
                    max="45"
                    label="Age"
                  />

                  <v-select
                    v-model="form.Nationality"
                    color="indigo-darken-1"
                    label="Nationality"
                    :items="countries"
                    item-title="Name"
                    item-value="_id"
                  />

                  <v-select
                    v-model="form.Position"
                    color="indigo-darken-1"
                    label="Position"
                    :items="positions"
                  />

                  <v-radio-group
                    v-model="form.Attributes.PreferredFoot"
                    label="Preferred Foot"
                  >
                    <v-radio label="Left" value="left" />
                    <v-radio label="Right" value="right" />
                  </v-radio-group>

                  <div class="text-subtitle-1">Mindset</div>
                  <v-checkbox
                    v-model="form.Attributes.AttackingMindset"
                    label="Attacking"
                  />
                  <v-checkbox
                    v-model="form.Attributes.DefensiveMindset"
                    label="Defensive"
                  />

                  <div class="text-subtitle-1">Appearance</div>
                  <div v-for="(f, x) in appearances" :key="x">
                    <span>{{ f.feature }}</span>
                    <ul v-for="(v, y) in f.variants" :key="y">
                      <li>{{ v }} - {{ f.styles[y] }}</li>
                    </ul>
                  </div>
                </v-col>

                <v-col class="px-2" cols="6">
                  <div class="text-subtitle-1">Attributes</div>
                  <v-list lines="two">
                    <v-list-item v-for="(attr, i) in attributes" :key="i">
                      <template #default>
                        <v-list-item-avatar>
                          <v-avatar
                            size="65 65"
                            :color="attrColor(form.Attributes[attr])"
                          >
                            {{ form.Attributes[attr] }}
                          </v-avatar>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-subtitle class="pl-2">
                            {{ attr }}
                          </v-list-item-subtitle>

                          <v-list-item-subtitle class="px-2">
                            <v-slider
                              v-model="form.Attributes[attr]"
                              density="compact"
                              color="indigo"
                              track-color="grey"
                              min="0"
                              max="99"
                            >
                              <template #prepend>
                                <v-icon
                                  color="indigo-lighten-3"
                                  @click="form.Attributes[attr]--"
                                >
                                  mdi-minus
                                </v-icon>
                              </template>

                              <template #append>
                                <v-icon
                                  color="indigo-lighten-3"
                                  @click="form.Attributes[attr]++"
                                >
                                  mdi-plus
                                </v-icon>
                              </template>
                            </v-slider>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-container>

            <v-divider />

            <v-card-actions>
              <v-spacer />
              <v-btn
                :color="`${isUpdate ? 'warning' : 'success'}`"
                @click="submit"
              >
                {{ isUpdate ? 'Update' : 'Create Player' }}
              </v-btn>

              <v-btn color="secondary" @click="$router.push('../players')">
                Cancel
              </v-btn>

              <v-btn v-if="isUpdate" color="error" @click="deletePlayer">
                Remove
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Vue, Prop } from 'vue-facing-decorator';
import PlayerAvatar from '@/components/players/player-avatar.vue';
import { calculatePlayerRating } from '@/helpers/players';

@Component({
  components: {
    PlayerAvatar
  }
})
export default class PlayerForm extends Vue {
  @Prop({ required: false, default: false }) readonly isUpdate!: boolean;
  player: any = {};

  form: any = {
    FirstName: '',
    LastName: '',
    Nationality: '',
    Age: '',
    Position: '',
    Attributes: {
      Speed: 0,
      Shooting: 0,
      LongPass: 0,
      ShortPass: 0,
      Mental: 0,
      Control: 0,
      Tackling: 0,
      Strength: 0,
      Stamina: 0,
      Keeping: 0,
      Dribbling: 0,
      SetPiece: 0,
      Vision: 0,
      PreferredFoot: '',
      AttackingMindset: null,
      DefensiveMindset: null
    },
    Appearance: {
      head: {
        variant: 'default',
        style: 'light'
      },
      complexion: 'light',
      hair: {
        variant: 'default',
        style: 'brown'
      },
      eyes: {
        variant: 'default',
        style: 'black'
      },
      eyebrows: {
        variant: 'default',
        style: 'brown'
      },
      nose: {
        variant: 'default',
        style: 'light'
      },
      mouth: {
        variant: 'default',
        style: 'light'
      }
    }
  };

  //   TODO: Be able to change Players shirt number from Club -> Edit Player view

  // TODO: upload files to server!

  // as at 20/08/21 -> Stov does not exist!
  public appearances: any[] = [];

  positions: string[] = ['GK', 'ATT', 'DEF', 'MID'];

  attributes: string[] = [
    'Keeping',
    'Speed',
    'Shooting',
    'LongPass',
    'ShortPass',
    'SetPiece',
    'Dribbling',
    'Mental',
    'Control',
    'Vision',
    'Tackling',
    'Strength',
    'Stamina'
  ];

  get countries(): string[] {
    return this.$store.getters.countries;
  }

  get rating(): number {
    return calculatePlayerRating(this.form.Attributes, this.form.Position);
  }

  attrColor(value: number): string {
    if (value <= 50) return 'red';
    if (value < 80) return 'orange';
    return 'green';
  }

  submit(): void {
    const playerId = this.$route.params['id'];

    const url = this.isUpdate
      ? `/players/${playerId}/update`
      : '/players/new?model=player';

    this.$axios
      .post(url, { data: { ...this.form, Rating: this.rating } })
      .then(response => {
        console.log('Response => ', response);
        this.$router.push({ name: 'Players Home' });
      })
      .catch(response => {
        console.log('Response => ', response);
      });
  }

  goBack() {
    this.$router.back();
  }

  deletePlayer() {
    const answer = confirm(
      'Are you sure you want to delete ' +
        this.form.FirstName +
        ' ' +
        this.form.LastName +
        '?!!'
    );

    if (answer) {
      const playerId = this.$route.params['id'];

      this.$axios
        .delete(`/players/${playerId}`)
        .then(response => {
          console.log('Successfully deleted Player => ', response);
          this.$router.push({ name: 'Players Home' });
        })
        .catch(response => {
          console.log('Error deleting Player =>', response.data);
        });
    }
  }

  mounted(): void {
    if (this.isUpdate) {
      const playerId = this.$route.params['id'];
      // const clubCode = this.$route.params['code'];
      this.$axios
        .get(`/players/${playerId}`)
        .then(response => {
          this.player = response.data.payload;
          this.form = response.data.payload;
        })
        .catch(response => {
          console.log('Response => ', response);
        });
    }

    this.$axios
      .get('/players/appearance')
      .then(response => {
        this.appearances = response.data.payload;
      })
      .catch(err => {
        console.log('Error fetching appearance', err);
      });
  }
}
</script>

<style></style>

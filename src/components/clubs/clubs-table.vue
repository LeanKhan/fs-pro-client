<template>
  <v-card>
    <v-card-title>
      Add Club to competition
      <v-spacer />

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      />
    </v-card-title>

    <v-data-table
      v-model="selectedClub"
      :headers="headers"
      :items="clubs"
      item-key="ClubCode"
      show-select
      :single-select="true"
      :search="search"
      loading-text="Fetching Clubs..."
      no-data-text="No Clubs"
      class="elevation-1"
    >
      <!-- <template v-slot:item.Actions="{ item }">
        <v-btn text icon color="success lighten-2">
          <v-icon small @click="viewSeason(item)">
            mdi-eye
          </v-icon>
        </v-btn>
        <v-btn text icon color="blue lighten-2">
          <v-icon small @click="editSeason(item)">
            mdi-pencil
          </v-icon>
        </v-btn>
      </template> -->

      <template #item.Address="{ item }">
        {{ item.Address.City }}, {{ item.Address.Country.Name }}
      </template>

      <template #item.Stadium="{ item }">
        {{ item.Stadium.Name }}
      </template>

      <template #item.Players="{ item }">
        {{ item.Players.length }}
      </template>
    </v-data-table>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn color="secondary" @click="close">Close</v-btn>
      <v-btn v-if="selectedClub[0]" color="success" @click="addClub">Add</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { type Club } from '@/interfaces/club';

@Component({})
export default class ClubsTable extends Vue {
  //   @Prop({ required: true }) readonly clubs!: Club;

  clubs: any[] = [];

  selectedClub: Club[] | [] = [];

  headers: any[] = [
    {
      text: 'Code',
      align: 'start',
      value: 'ClubCode'
    },
    {
      text: 'Name',
      value: 'Name'
    },
    { text: 'Address', value: 'Address', filterable: true, sortable: true },
    { text: 'Manager', value: 'Manager', filterable: true, sortable: false },
    { text: 'Stadium', value: 'Stadium', filterable: true, sortable: false },
    { text: 'League', value: 'LeagueCode', filterable: true, sortable: true },
    { text: 'Players', value: 'Players', filterable: true, sortable: true }
  ];

  search = '';

  addClub(): void {
    this.$emit('close-club-modal', {
      id: this.selectedClub[0]._id,
      name: this.selectedClub[0].Name
    });
  }

  close(): void {
    this.$emit('close-club-modal');
  }

  mounted() {
    this.$axios
      .get('/clubs/all')
      .then(res => {
        this.clubs = res.data.payload as Club[];
      })
      .catch(err => {
        console.log('Error! => ', err);
      });
  }
}
</script>

<style></style>

<template>
  <v-card>
    <v-card-title>
      Players
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        color="indigo-darken-1"
        label="Search"
        single-line
        hide-details
        :clearable="true"
      />
      <v-btn
        v-if="viewClub"
        append-icon="mdi-plus"
        color="success"
        @click="$emit('add-player')"
      >
        Add
      </v-btn>
      <!-- TODO: Add filter for isSigned -->
      <!-- <v-checkbox v-model="isSigned" label="Signed">
        Signed
      </v-checkbox> -->
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="players"
      :loading="!players"
      no-data-text="No Players fetched"
      no-results-text="No Players"
      :search="search"
      loading-text="Fetching Players..."
      class="elevation-1"
    >
      <template #item.Id="{ item }">
        <v-img
          :src="`${api}/img/clubs/kits/${item.ClubCode}-kit.png`"
          max-height="50px"
          max-width="120px"
        />
      </template>
      <template #item.Rating="{ item }">
        <v-chip :color="getColor(item.Rating)" dark>
          {{ Math.round(item.Rating) }}
        </v-chip>
      </template>

      <template #item.Nationality="{ item }">
        {{ item.Nationality ? item.Nationality.Name : '-' }}
      </template>

      <template #item.isSigned="{ item }">
        <v-chip
          style="background-color: transparent"
          :color="item.isSigned ? 'green' : 'orange'"
        >
          {{ item.isSigned }}
        </v-chip>
      </template>

      <!-- Players actions -->
      <template #item.Actions="{ item }">
        <v-btn
          icon
          color="success-lighten-2"
          @click="viewPlayer(item._id, item.PlayerID)"
        >
          <v-icon size="small">mdi-eye-outline</v-icon>
        </v-btn>
        <v-btn
          icon
          color="blue-lighten-2"
          @click="updatePlayer(item._id, item.PlayerID)"
        >
          <v-icon size="small">mdi-pencil-outline</v-icon>
        </v-btn>
        <!-- remove player -->
        <v-btn
          v-if="viewClub"
          icon
          color="red-lighten-2"
          @click="removePlayer(item._id)"
        >
          <v-icon size="small">mdi-delete-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-facing-decorator';
import { type Player } from '@/interfaces/player';
import { apiUrl } from '@/store';

@Component({})
export default class PlayersTable extends Vue {
  @Prop({ required: true }) readonly players!: Player[];
  @Prop({ required: true, default: false }) readonly viewClub!: boolean;

  api = apiUrl;

  headers: any[] = [
    {
      text: 'First Name',

      value: 'FirstName'
    },
    {
      text: 'Last Name',
      value: 'LastName'
    },
    { text: 'Club', value: 'ClubCode' },
    { text: 'Age', value: 'Age', filterable: false },
    { text: 'Position', value: 'Position', filterable: false },
    { text: 'Role', value: 'Role', filterable: true },
    { text: 'Country', value: 'Nationality', filterable: false },
    { text: 'Value', value: 'Value', filterable: false },
    {
      text: 'Signed',
      value: 'isSigned',
      sortable: false,
      filter: (value: boolean) => {
        if (!this.isSigned) return true;

        return value == this.isSigned;
      }
    },
    { text: 'Rating', value: 'Rating', filterable: false },
    { text: 'Actions', value: 'Actions', filterable: false, sortable: false }
  ];

  search = '';

  isSigned = null;

  public getColor(rating: number): string {
    if (rating >= 80) return 'green';
    else if (rating >= 50) return 'orange';
    else return 'red';
  }

  public viewPlayer(id: string, code: string) {
    this.$router.push({ name: 'View Player', params: { id, code } });
  }

  public updatePlayer(id: string, code: string) {
    this.$router.push({ name: 'Update Player', params: { id, code } });
  }

  public removePlayer(id: string) {
    if (this.viewClub) {
      this.$emit('remove-player', id);
    }
  }
}
</script>
<style scoped></style>

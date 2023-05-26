<!-- eslint-disable vuetify/no-deprecated-components -->
<template>
  <v-card rounded="0" elevation="1">
    <v-list>
      <v-list-item class="d-flex justify-content-between rounded-1">
        Clubs
        <v-spacer />
        <b>{{ clubs ? clubs.length : 'undefined' }}</b>
      </v-list-item>
      <v-list-item-group color="primary">
        <v-list-item v-for="(club, i) in clubs" :key="i" color="#7535ed" link>
          <v-list-item-avatar>
            <v-img
              :src="`${api}/img/clubs/logos/${club.ClubCode}.png`"
              width="40px"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ club.Name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-divider />

    <v-card-actions v-if="actions">
      <v-spacer />

      <v-btn
        variant="text"
        icon
        color="primary-lighten-2"
        class="mr-3"
        @click="addClub"
      >
        <v-icon size="small">mdi-plus</v-icon>
        Add
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-facing-decorator';
import { type Club } from '@/interfaces/club';
import { apiUrl } from '@/store';

@Component({})
export default class ClubList extends Vue {
  @Prop({ required: true }) readonly clubs!: Club[];
  @Prop({ default: false, required: false }) readonly actions!: boolean;

  public api: string = apiUrl;

  addClub(): void {
    this.$emit('open-club-modal');
  }
}
</script>

<style></style>

<template>
  <div>
    <v-card>
      <v-card-title>Manager</v-card-title>
      <v-card-text>
        <template v-if="club.Manager && club.Manager.FirstName">
          {{ club.Manager.FirstName }} {{ club.Manager.LastName }}
        </template>
        <template v-else>
          <p>No manager yet. Hire one!</p>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="club.Manager"
          color="error"
          variant="flat"
          @click="fireManager"
        >
          Fire Manager
        </v-btn>
        <v-btn v-else color="info" variant="flat" @click="hireManager">
          Hire Manager
        </v-btn>
      </v-card-actions>
    </v-card>

    <ManagerPicker
      v-model:show="openManagerPicker"
      :club="club._id"
      @update-available="$emit('update-available')"
    />
    <ManagerFirer
      v-model:show="openFireManager"
      :manager="club.Manager"
      :club="club._id"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-facing-decorator';
import { ManagerPicker, ManagerFirer } from '@/components/clubzone';
@Component({
  components: {
    ManagerPicker,
    ManagerFirer
  }
})
export default class ClubZone extends Vue {
  @Prop({ required: true }) club!: any;

  openManagerPicker = false;
  openFireManager = false;

  hireManager() {
    // hiring manager, thank you Jesus!
    this.openManagerPicker = !this.openManagerPicker;
  }

  fireManager() {
    this.openFireManager = !this.openFireManager;
  }

  refresh() {
    this.$emit('update-available');
  }
}
</script>

<style></style>

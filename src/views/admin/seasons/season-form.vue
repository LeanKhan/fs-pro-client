<template>
  <div>
    <v-form @submit.prevent="submit">
      <v-card>
        <v-toolbar flat color="primary">
          <v-toolbar-title>
            {{ isUpdate ? 'Update Season' : 'Create Season' }}
          </v-toolbar-title>
        </v-toolbar>

        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="form.Title" label="Title" />
            </v-col>

            <v-col cols="6">
              <v-date-picker v-model="form.StartDate" />
            </v-col>
          </v-row>
        </v-container>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn :color="`${isUpdate ? 'warning' : 'success'}`" @click="submit">
            {{ isUpdate ? 'Update' : 'Create Season' }}
          </v-btn>
          <v-btn color="secondary" @click="$router.push('/a/competitions')">
            Cancel
          </v-btn>
          <!-- <v-btn v-if="isUpdate" @click="deleteSeason" color="error">
            Remove
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-facing-decorator';

@Component({})
export default class SeasonForm extends Vue {
  @Prop({ required: false }) readonly isUpdate!: boolean;
  season: any = {};

  openClubModal = false;

  form: any = {
    Title: '',
    StartDate: ''
  };

  submit(): void {
    const Competition = this.$route.params['id'];
    const CompetitionCode = this.$route.params['code'];

    // TODO: find out how you will get the season ID and stuff

    const url = this.isUpdate
      ? `/${Competition}/seasons/update/`
      : '/seasons?model=season';

    this.$axios
      .post(url, { data: { ...this.form, CompetitionCode, Competition } })
      .then(response => {
        console.log('Response => ', response.data.payload);
        this.$router.push({
          name: 'View Competition',
          params: { Competition, CompetitionCode }
        });
      })
      .catch(response => {
        console.log('Response => ', response);
      });
  }
}
</script>

<style></style>

<template>
  <v-table>
    <template #default>
      <thead>
        <tr>
          <th class="text-left">Title</th>
          <th class="text-left">Result</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="fx in fixtures" :key="fx._id" @click="goToMatch(fx._id)">
          <td>
            <v-icon size="large">${{ fx.Home }}</v-icon>
            {{ fx.Title }}
            <v-icon size="large">${{ fx.Away }}</v-icon>
          </td>
          <td>{{ fx.Played ? fx.Details.FullTimeScore : '- : -' }}</td>
        </tr>
      </tbody>
    </template>
  </v-table>
</template>

<script lang="ts">
// import { Component, Vue, }
// TODO: Highlight the winner of the match
// TODO: Allow filtering, maybe show only played matches?
// TODO: Should be able to visit the Match page of played matches
// TODO: Should show Day information...
import { Component, Vue, Prop } from 'vue-facing-decorator';

@Component({
  name: 'Fixtures'
})
export default class FixturesTable extends Vue {
  @Prop({ required: true }) fixtures!: any;

  /**
   * ID -  Fixture Id
   */
  goToMatch(id: string) {
    this.$router.push('/matchzone/' + id);
  }
}
</script>

<style scoped>
tr {
  cursor: pointer;
}
</style>

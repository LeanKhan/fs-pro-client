<template>
  <v-list density="compact" lines="two">
    <squad-player
      v-for="(player, i) in squad"
      :key="i"
      :player="player"
      :match-finished="matchFinished"
    />
  </v-list>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-facing-decorator';
import SquadPlayer from './squadlist-player.vue';

@Component({
  components: {
    SquadPlayer
  }
})
export default class SquadList extends Vue {
  @Prop({ required: true, type: Array }) squad!: any;
  @Prop({ required: false, default: false }) matchFinished!: any;

  get list() {
    return this.squad.sort();
  }
}
</script>

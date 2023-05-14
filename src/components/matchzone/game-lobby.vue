<template>
  <v-dialog
    :model-value="show"
    height="500px"
    width="650px"
    class="overlayOpacity"
    @update:model-value="$emit('update:show', $event)"
  >
    <v-card height="100%" rounded="0" :loading="!allReady">
      <v-toolbar color="green-accent-3" dense flat>
        <v-toolbar-title class="mx-auto">Get ready to play!</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pa-0">
        <v-row>
          <v-col :class="{ yellow: player1Ready }">
            <v-card
              flat
              rounded="0"
              dense
              class="pa-0 justify-center text-center"
            >
              <v-img
                v-if="home"
                cover
                class="mx-auto"
                :src="`${api}/img/clubs/kits/${home.ClubCode}-kit.png`"
                max-width="200px"
              />
              <v-overlay
                :absolute="true"
                :model-value="true"
                class="overlayOpacity"
              >
                <div class="text-h5">
                  {{ home.Name }}
                </div>
                <v-card-text class="pa-0">
                  <span v-if="!player1Ready">Are you ready?</span>

                  <template v-else>
                    Oya na!
                    <v-icon>mdi-check</v-icon>
                  </template>
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn
                    color="accent"
                    :variant="player1Ready && 'flat'"
                    :class="{ 'darken-2': player1Ready }"
                    @click="player1Ready = !player1Ready"
                  >
                    READY
                  </v-btn>
                </v-card-actions>
              </v-overlay>
            </v-card>
          </v-col>
          <v-col :class="{ yellow: player2Ready }">
            <v-card
              flat
              rounded="0"
              dense
              class="pa-0 justify-center text-center"
            >
              <v-img
                v-if="away"
                cover
                class="mx-auto"
                :src="`${api}/img/clubs/kits/${away.ClubCode}-kit.png`"
                max-width="200px"
              />
              <v-overlay :absolute="true" :model-value="true">
                <div class="text-h5">
                  {{ away.Name }}
                </div>
                <v-card-text class="pa-0">
                  <span v-if="!player2Ready">Are you ready?</span>

                  <template v-else>
                    Oya na!
                    <v-icon>mdi-check</v-icon>
                  </template>
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn
                    color="accent"
                    :variant="player2Ready && 'flat'"
                    :class="{ 'darken-2': player2Ready }"
                    @click="player2Ready = !player2Ready"
                  >
                    READY
                  </v-btn>
                </v-card-actions>
              </v-overlay>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
// import { Component, Vue, Prop, Watch } from 'vue-facing-decorator';
import { apiUrl } from '@/store';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    home: {
      type: Object,
      required: true
    },
    away: {
      type: Object,
      required: true
    }
  },
  emits: ['all-ready', 'update:show'],
  data() {
    return {
      player1Ready: false,
      player2Ready: false,
      skip: false,
      api: apiUrl
    };
  },
  computed: {
    allReady() {
      return this.player1Ready && this.player2Ready;
    }
  },
  watch: {
    allReady: {
      handler(ready: boolean) {
        if (ready) {
          console.log('All are ready!');
          this.$emit('all-ready');
        }
      },
      immediate: true
    }
  }
});

// @Component({})
// export class GameLobby extends Vue {
//   @Prop({ required: true, default: false, type: Boolean }) show!: boolean;
//   @Prop({ required: true }) home!: any;
//   @Prop({ required: true }) away!: any;

//   player1Ready = false;
//   player2Ready = false;
//   skip = false;
//   api = apiUrl;

//   get allReady() {
//     return this.player1Ready && this.player2Ready;
//   }

//   @Watch('onAllReady', { immediate: true })
//   onAllReady(ready: boolean) {
//     if (ready) {
//       console.log('All are ready!');
//       this.$emit('all-ready');
//     }
//   }
// }
</script>
<style scoped>
:root {
  --overlay-opacity: 0.6;
}

.overlayOpacity {
  opacity: 0.6 !important;
}
</style>

<template>
  <div>
    <!-- <v-breadcrumbs :items="crumbs"></v-breadcrumbs> -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';

@Component({})
export default class Competitions extends Vue {
  // get crumbs(): any[] {
  //   const breadcrumbs = this.$route.matched.map(path => {
  //     return {
  //       exact: true,
  //       disabled: false,
  //       to:
  //         typeof path.meta.to == 'function'
  //           ? path.meta(this.$route).to()
  //           : path.path,
  //       text: path.meta.title || path.name || path.meta(this.$route).title
  //     };
  //   });
  //   return breadcrumbs;
  // }
}
</script>

<style></style>

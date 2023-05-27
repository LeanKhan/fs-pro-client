<template>
  <div class="home">
    <div class="d-flex justify-center align-center" style="height: 400px">
      <img
        alt="FsPro Logo :)"
        height="200px"
        :src="`${api}/img/logo-new.png`"
      />
    </div>
    <p class="text-h3 text-secondary text-center">FSPro</p>
    <p class="text-caption text-secondary primary-lighten-3 text-center">
      thank you Jesus!
    </p>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-facing-decorator';
import { apiUrl } from '@/store';

@Component({})
export default class AdminDashboard extends Vue {
  api: string = apiUrl;
}
</script>

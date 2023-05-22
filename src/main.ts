/* eslint-disable no-unused-vars */
import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store, { apiUrl, type RootState } from './store';
import axios, { type AxiosInstance } from 'axios';
import { roundTo, ordinal } from './helpers/misc';

import VueSocketIOExt from 'vue-socket.io-extended';
import io, { type Socket } from 'socket.io-client';
import type { Store } from 'vuex/types/index.js';

const app = createApp(App);

const socket = io(`${apiUrl}`, { autoConnect: false });

// baseURL: 'http://localhost:3000/api',

export const $axios = axios.create({
  baseURL: `${apiUrl}/api`
});

const formatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 2
});

app.config.globalProperties.$filters = {
  currency: (value: number) => `${formatter.format(value)}`,
  roundTo,
  ordinal
};

app.config.globalProperties.$socket = socket;

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $socket: typeof Socket;
    $store: Store<RootState>;
    $filters: {
      currency: (value: number) => string;
      roundTo: (number: number, decimalPlaces: number) => number;
      ordinal: (n: number) => string;
    };
  }
}

app.use({
  install() {
    app.config.globalProperties.$axios = $axios;
  }
});

app.use(VueSocketIOExt, socket);

app.use(vuetify);
app.use(router);
app.use(store);

app.mount('#app');

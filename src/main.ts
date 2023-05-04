import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store, { apiUrl } from './store';
import axios from 'axios';
import { roundTo, ordinal } from './helpers/misc';

import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

const app = createApp(App);

const socket = io(`${apiUrl}`, { autoConnect: false });

// baseURL: 'http://localhost:3000/api',

export const $axios = axios.create({
  baseURL: `${apiUrl}/api`,
});

const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
});


app.config.globalProperties.$filters = {
  currency: (value: number) => `${formatter.format(value)}`,
  roundTo,
  ordinal
}

// declare module 'vue/types/vue' {
//   interface Vue {
//     $axios: AxiosStatic;
//   }
// }

app.use({
  install() {
    app.config.globalProperties.$axios = $axios;
  },
});

app.use(VueSocketIOExt, socket);

app.use(vuetify);
app.use(router);
app.use(store);

app.mount("#app");

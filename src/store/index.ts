import Vuex from 'vuex';
import { type Club } from '@/interfaces/club';
import { socket } from './socket';
import type { ICalendar } from '@/interfaces/calendar';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import { createWebSocketPlugin } from '@/plugins/vuex';

// 'http://192.168.10.4:3000' - Network server url
// 'http://localhost:3000' - Local server url

// export const apiUrl = 'http://192.168.0.137:3000';

export const apiUrl = import.meta.env.VITE_APP_API_BASE_URL as string;
// export const apiUrl = 'http://localhost:3000';

export interface RootState {
  allClubs: Club[];
  apiUrl: string;
  user: {
    username: string;
    clubs: string[];
    isAdmin: boolean;
    userID: string;
    session: string;
    avatar: string;
    fullname: string;
  };
  calendar: ICalendar;
  countries: string[];
  seasons: any[];
  toast: {
    show: boolean;
    style: '';
    actionText: '';
    actionLink: '';
    message: '';
    withAction: boolean;
  };
  errorOverlay: boolean;
  lobby: boolean;
  /** The Competition._id of selected League */
  selectedLeague: string;
  // state: MainState;
}

//   socket: SocketState;

const state = {
  allClubs: [] as Club[],
  apiUrl,
  user: {
    username: '',
    clubs: [],
    isAdmin: false,
    userID: '',
    session: '',
    avatar: '',
    fullname: ''
  },
  calendar: {} as unknown,
  seasons: [],
  countries: [],
  toast: {
    show: false,
    message: '',
    style: '',
    actionText: '',
    actionLink: '',
    withAction: false
  },
  errorOverlay: false,
  lobby: false,
  // new
  selectedLeague: ''
};

const webSocketPlugin = createWebSocketPlugin(socket);

export default new Vuex.createStore({
  state,
  modules: {
    socket
  },
  getters,
  mutations,
  actions,
  plugins: [webSocketPlugin]
});

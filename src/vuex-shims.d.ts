import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
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

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

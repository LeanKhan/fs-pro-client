const mutations = {
  SET_USER: (state, payload) => {
    state.user = payload;
  },
  SET_USER_CLUBS: (state, payload) => {
    state.user.clubs = payload;
  },
  SET_CALENDAR: (state, payload) => {
    state.calendar = payload;
  },
  SET_SEASONS: (state, payload) => {
    state.seasons = payload;
  },
  SET_COUNTRIES: (state, payload) => {
    state.countries = payload;
  },
  SET_SELECTED_LEAGUE: (state, payload) => {
    // must be a valid MongoDB ObjectId
    state.selectedLeague = payload;
  },
  SET_LOBBY: (state, payload) => {
    state.lobby = payload;
  },
  SHOW_TOAST: (
    state,
    { message, style, actionText, actionLink, withAction }
  ) => {
    state.toast.show = true;
    state.toast.message = message;
    state.toast.style = style;
    state.toast.actionText = actionText;
    state.toast.actionLink = actionLink;
    state.toast.withAction = withAction;
  },
  HIDE_TOAST: state => {
    state.toast.show = false;
    state.toast.message = '';
    state.toast.style = '';
    state.toast.actionText = '';
    state.toast.actionLink = '';
    state.toast.withAction = false;
  },
  TOGGLE_ERROR_OVERLAY: state => {
    state.errorOverlay = !state.errorOverlay;
  }
};

export default mutations;

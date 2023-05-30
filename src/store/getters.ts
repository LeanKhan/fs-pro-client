const getters = {
  apiUrl: state => {
    return state.apiUrl;
  },
  user: state => {
    return state.user;
  },
  currentYear: state => {
    return state.YearString;
  },
  countries: state => {
    return state.countries;
  },
  toast: state => {
    return state.toast;
  },
  lobby: state => {
    return state.lobby;
  },
  errorOverlay: state => {
    return state.errorOverlay;
  },
  selectedLeague: state => {
    return state.selectedLeague;
  }
};

export default getters;

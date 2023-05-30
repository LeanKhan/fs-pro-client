import { $axios } from '../main';

const actions = {
  SET_USER: ({ commit }, payload) => {
    window.localStorage.setItem('fspro-user', JSON.stringify(payload));
    // this one is being saved as a js object, not string
    commit('SET_USER', payload);
  },
  UNSET_USER: ({ commit }) => {
    window.localStorage.removeItem('fspro-user');
    // this one is being saved as a js object, not string
    commit('SET_USER', {
      username: '',
      clubs: [],
      isAdmin: null,
      userID: '',
      session: '',
      avatar: '',
      fullname: ''
    });
  },
  GET_USER: ({ commit }) => {
    const user = JSON.parse(
      window.localStorage.getItem('fspro-user') as string
    );

    if (user)
      // this one is saved as a js object
      commit('SET_USER', user);
  },
  SET_SELECTED_LEAGUE: ({ commit }, payload: string) => {
    // window.localStorage.setItem('fspro-selected-league', payload);
    commit('SET_SELECTED_LEAGUE', payload);
  },
  UNSET_SELECTED_LEAGUE: ({ commit }) => {
    // window.localStorage.removeItem('fspro-selected-league');
    commit('SET_SELECTED_LEAGUE', '');
  },
  // GET_SELECTED_LEAGUE: ({ commit }, payload: string) => {
  //  const user = window.localStorage.getItem('fspro-selected-league') as string;

  //   if (league)
  //     // this one is saved as a js object
  //     commit('SET_SELECTED_LEAGUE', league);
  // },
  SET_USER_CLUBS: ({ commit, state }) => {
    if (state.user.clubs.length == 0) {
      return 'nah fam';
    }
    const query = JSON.stringify({ _id: { $in: state.user.clubs } });
    const select = JSON.stringify('ClubCode Name _id');

    $axios
      .get(`/clubs/fetch?q=${query}&select=${select}`)
      .then(response => {
        if (response.data.success) {
          commit('SET_USER_CLUBS', response.data.payload);
        }
      })
      .catch(response => {
        console.log('error => ', response);
      });
  },
  SET_CALENDAR: ({ commit }) => {
    $axios
      .get(`/calendar/current?page=1&limit=14&populate=false`)
      .then(response => {
        if (response.data.success) {
          commit('SET_CALENDAR', response.data.payload);
          // Maybe after this, get Current Seasons based on this year?
          commit('SET_LOBBY', !response.data.payload.YearString);

          // we should focus on a season at a time!
          // dispatch('SET_SEASONS');
        }
      })
      .catch(response => {
        console.log('error => ', response);
      });
  },
  SET_SEASONS: ({ commit, state }) => {
    if (state.calendar.YearString) {
      $axios
        .get(`/seasons/${state.calendar.YearString}/current`)
        .then(response => {
          commit('SET_SEASONS', response.data.payload);
        })
        .catch(error => {
          console.log('Error getting current seasons!', error);
        });
    }
  },
  GET_COUNTRIES: ({ commit }) => {
    $axios
      .get('/places/country')
      .then(res => {
        commit('SET_COUNTRIES', res.data.payload);
      })
      .catch(error => {
        console.log('Error getting countries!', error);
      });
  },
  SHOW_TOAST: ({ commit }, payload) => {
    commit('SHOW_TOAST', payload);
  },
  HIDE_TOAST: ({ commit }) => {
    commit('HIDE_TOAST');
  }
};

export default actions;

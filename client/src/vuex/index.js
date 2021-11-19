import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import Agent from "@/plugins/agents";

Vue.use(Vuex);

// persist user state accross refreshes and what-not
const persist = new VuexPersistence();

export default new Vuex.Store({
  state: {
    userAuth: {
      isAuth: false,
      user: null
    },
    initGame: {
      roomId: null,
      isHost: null,
      isStart: false,
      isEnd: false
    }
  },
  mutations: {
    setUserAuth(state, userAuth) {
      state.userAuth = { ...userAuth, user: { ...userAuth.user, accessToken: undefined } };
    },
    setInitGame(state, initGame) {
      state.initGame = { ...initGame, isStart: false, isEnd: false };
    },
    startGame(state) {
      state.initGame.isStart = true;
    },
    endGame(state) {
      state.initGame.isEnd = true;
    },
    resetAuth(state) {
      state.userAuth = {
        isAuth: false,
        user: null
      };
    }
  },
  actions: {
    updateUserAuth(context, authData) {
      context.commit("setUserAuth", authData);
    },
    updateInitGame(context, gameData) {
      context.commit("setInitGame", gameData);
    },
    updateGameState(context, status) {
      context.commit(status);
    },
    logout(context) {
      // clear jwt from localforage
      Agent.setToken("");
      return context.commit("resetAuth");
    }
  },
  plugins: [persist.plugin]
});

<template>
  <div class="dashboard">
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
    </transition>
    <transition name="pop" appear>
      <div class="modal" role="dialog" v-if="showModal">
        <h3>{{ action }}</h3>
        <p>Game Code</p>
        <p>{{ quizCode }}</p>
        <button @click="waiting">GO</button>
      </div>
    </transition>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showModal2" @click="showModal2 = false"></div>
    </transition>
    <transition name="pop" appear>
      <div class="modal" role="dialog" v-if="showModal2">
        <h3>{{ action }}</h3>
        <input
          type="text"
          class="text-field"
          name="game-code"
          placeholder="Game Code"
          v-model="gameCode"
        />
        <button class="btn-join" @click="join" v-if="gameCode">GO</button>
      </div>
    </transition>
    <div class="dashboard-container" v-if="userAuth.isAuth">
      <button class="sign-out" @click.prevent="handleLogout">
        <i class="fas fa-door-open"></i>
        <span>Sign out</span>
      </button>
      <div class="inner-container">
        <div class="profile">
          <div class="profile-img"></div>
          <div class="profile-content">
            <h2 class="name">{{ userAuth.user.firstName + " " + userAuth.user.lastName }}</h2>
            <h2 v-if="rank + 1" class="rank">Rank #{{ rank }}</h2>
          </div>
        </div>
        <div class="quiz-content">
          <router-link to="quiz">
            <button class="quiz-btn">Quiz</button>
          </router-link>
          <router-link to="leaderboard">
            <button class="leaderboard-btn">Leaderboard</button>
          </router-link>
          <button @click="createGame" class="create-btn">Create</button>
          <button @click="joinGame" class="create-btn">Join</button>
          <div class="highscore-box">
            <h2>Highscore</h2>
            <div class="score">
              <h1 v-if="highScore + 1">{{ highScore }}</h1>
              <p v-if="!(highScore + 1)">Take quiz to reveal rank</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/vuex";
import { mapActions } from "vuex";

export default {
  name: "dashboard",
  data() {
    return {
      rank: 0,
      highScore: 0,
      showModal: false,
      showModal2: false,
      action: "",
      quizCode: null,
      gameCode: null
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    userAuth() {
      return store.state.userAuth;
    }
  },
  methods: {
    ...mapActions(["updateInitGame", "logout"]),
    handleLogout() {
      this.logout().then(() => {
        this.$nextTick().then(() => {
          this.$router.push({ name: "home" });
        });
      });
    },
    fetchData() {
      this.$http
        ._post("/leaderboard/rank", { user: this.userAuth.user.id })
        .then(res => {
          console.log(res);
          this.rank = res.rank;
          this.highScore = res.highScore;
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    createGame() {
      this.showModal = true;
      this.action = "CREATE GAME";
      this.$socket.emit("create", this.userAuth.user.id, data => {
        this.quizCode = data.quizCode;

        let gameData = {
          roomId: this.quizCode,
          isHost: true
        };
        this.updateInitGame(gameData);
      });
    },
    waiting() {
      this.$router.push({ name: "waiting" });
    },
    joinGame() {
      this.action = "JOIN";
      this.showModal2 = true;
    },
    join() {
      const name = this.userAuth.user.firstName + " " + this.userAuth.user.lastName;
      this.$socket.emit(
        "join",
        { name: name, userId: this.$socket.id, gameCode: this.gameCode },
        data => {
          if (data.success) {
            this.$nextTick().then(() => {
              let gameData = {
                roomId: this.gameCode,
                isHost: false
              };
              this.updateInitGame(gameData);
              this.$router.push({ name: "waiting" });
            });
          } else {
            window.alert(data.message);
          }
        }
      );
    }
  }
};
</script>

<style scoped>
.dashboard {
  background-color: #222831;
  height: 100vh;
  width: 100vw;
  color: #eeeeee;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5em;
}

.dashboard-container {
  padding: 10px 4em;
  z-index: 2;
  background-color: #393e4640;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 50px;
  height: 100%;
}

.inner-container {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.sign-out {
  border: 1px solid white;
  position: absolute;
  top: 5%;
  background-color: #eeeeee;
  padding-inline: 15px;
  height: 2.2em;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222831;
  transition: all 0.2s ease-in-out;
  gap: 7px;
}

.sign-out i {
  color: #222831;
  font-size: 18px;
}

.profile {
  width: 18em;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 70%;
  justify-content: space-evenly;
  background-color: #222831;
}

.profile-img {
  width: 8em;
  height: 8em;
  background-color: #fff;
  border-radius: 100%;
}

.profile-content {
  margin-top: 10px;
}

.name,
.rank {
  text-align: center;
  font-size: 30px;
}

.quiz-content {
  width: 25em;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  height: 70%;
}

.quiz-content button {
  background-color: #00adb585;
  width: 25em;
  height: 3em;
  outline: none;
  transition: 0.15s ease-in-out;
}

.quiz-content button:hover {
  background-color: #00adb540;
}

.highscore-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #222831;
  padding: 15px;
}
.score {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.score h1 {
  font-size: 4.5em;
}

.score p {
  font-size: 1.5em;
}

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
  width: 50vw;
  height: fit-content;
  max-width: 22em;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background: #fff;
  z-index: 999;
  transform: none;
}

.modal h3 {
  color: #2c3e50;
}

.modal p {
  color: #2c3e50;
}

.modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background: #2c3e50;
  opacity: 0.6;
  cursor: pointer;
}
</style>

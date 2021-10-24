<template>
  <div class="board-page">
    <particle1 />
    <div class="title">
      <h1>{{ title }}</h1>
      <button v-if="isHost && !isStart" @click="startGame" class="start-game">START</button>
      <button v-if="isHost && !isEnd && isStart" @click="endGame" class="start-game">END</button>
    </div>
    <div class="table-container" v-if="players.length">
      <table>
        <tr>
          <td><b>Name</b></td>
          <td><b>Score</b></td>
          <td><b>Time</b></td>
        </tr>
        <tr v-for="item in players" :key="item.socketId">
          <td>{{ item.name }}</td>
          <td>{{ item.score }}</td>
          <td>{{ item.timeTaken }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import particle1 from "@/components/particle1";
import store from "@/vuex";
import { mapActions } from "vuex";

export default {
  name: "WaitingRoom",
  components: {
    particle1
  },
  data() {
    return {
      players: [],
      isHost: false,
      isStart: false,
      isEnd: false,
      title: "Waiting Room"
    };
  },
  mounted() {
    this.gameConfig();
  },
  computed: {
    userAuth() {
      return store.state.userAuth;
    },
    gameData() {
      return store.state.initGame;
    }
  },
  methods: {
    ...mapActions(["updateGameState"]),
    gameConfig() {
      this.isHost = this.gameData.isHost;
      this.isStart = this.gameData.isStart;
      this.isEnd = this.gameData.isEnd;
      this.$socket.emit("rejoin", this.gameData.roomId, data => {
        this.players = data.players;
      });
    },
    startGame() {
      this.$socket.emit("start", this.gameData.roomId, data => {
        if (!data.success) {
          window.alert(data.message);
        }
      });
    },
    endGame: function() {
      this.$socket.emit("end", this.gameData.roomId);
    }
  },
  sockets: {
    players: function(data) {
      this.players = data;
    },
    startGame: function() {
      this.updateGameState("startGame");
      if (!this.isHost) {
        this.$nextTick().then(() => {
          this.$router.push({ name: "quizgame" });
        });
      } else {
        this.title = "Leaderboard";
        this.isStart = true;
      }
    },
    endGame: function() {
      this.isEnd = true;
      if (!this.isHost) {
        window.alert("Game session ended by host");
      }
    }
  }
};
</script>

<style scoped>
.title {
  margin: 2rem auto;
  z-index: 2;
}
.title h1 {
  font-family: "Bowlby One SC";
  font-size: 4em;
  color: transparent;
  text-transform: uppercase;
  background-image: linear-gradient(to left, #ca25d5, #b00f4c, #eb4df6, #8c045f);
  -webkit-background-clip: text;
  animation: animate 5s linear infinite;
  -webkit-background-size: 500%;
  background-size: 500%;
}
.title h1 span {
  transition: 0.25s ease-out 0.5s;
}
.title h1 span:hover {
  transition: 0.25s ease-out 0s;
  font-size: 1.25em;
}
.board-page {
  background-color: #222831;
  color: #eeeeee;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.table-container {
  width: 60vw;
  padding: 15px;
  z-index: 2;
  background-color: #393e4640;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 50px;
  box-shadow: 5px 5px 40px #00adb550;
  position: relative;
  margin: 2rem auto 4rem;
}

table {
  border-collapse: collapse;
  width: 100%;
}

table td {
  border-color: transparent;
  border-style: solid;
  border-width: 1px;
  font-family: Arial, sans-serif;
  font-size: 1.5rem;
  overflow: hidden;
  padding: 10px 5px;
  word-break: normal;
  text-align: center;
}

table th {
  border-color: black;
  border-style: solid;
  border-width: 1px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: normal;
  overflow: hidden;
  padding: 10px 5px;
  word-break: normal;
}
@keyframes animate {
  0% {
    background-position: 0 100%;
  }
  50% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 100%;
  }
}
@media only screen and (max-width: 768px) {
  .table-container {
    width: 80vw;
  }
}
</style>

<template>
  <div class="quiz-page" v-if="quizData.length">
    <div class="quiz-container">
      <h1 class="point">Score: {{ quizData[current].score }}</h1>
      <div class="container">
        <div class="choice-block">
          <vue-embed-gist
            v-bind:gist-id="quizData[current].gistId"
            v-bind:file="quizData[current].filename"
          />
        </div>
        <div class="ans-container">
          <Button
            v-for="(choice, index) in quizData[current].choice"
            v-bind:choice="choice"
            v-on:click.native="updateAnswer(choice, index)"
            v-bind:class="{ selected: index === sIndex }"
            :key="choice"
          />
        </div>
        <div class="next-container" v-if="answered">
          <button @click.prevent="submit" type="submit" class="next-btn">
            Submit
          </button>
        </div>
      </div>
    </div>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
    </transition>
    <transition name="pop" appear>
      <div class="modal" role="dialog" v-if="showModal">
        <h3>Your Score</h3>
        <h1>{{ score }}</h1>
        <p>{{ message }}</p>
        <div class="action">
          <router-link to="dashboard">
            <button class="button">Home</button>
          </router-link>
          <router-link to="leaderboard">
            <button class="button">Leaderboard</button>
          </router-link>
        </div>
      </div>
    </transition>
    <ul class="circles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import Button from "../components/Button.vue";
import VueEmbedGist from "vue-embed-gist";
import store from "@/vuex";
import { mapActions } from "vuex";

export default {
  name: "QuizGamePage",
  components: {
    Button,
    VueEmbedGist
  },
  data() {
    return {
      answer: null,
      answered: false,
      current: 0,
      message: "",
      quizData: null,
      roomId: null,
      showModal: false,
      sIndex: -1,
      timeTaken: Date.now()
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    gameData() {
      return store.state.initGame;
    }
  },
  methods: {
    ...mapActions(["updateGameState"]),
    fetchData() {
      this.roomId = this.gameData.roomId;
      this.$socket.emit("play", this.roomId, data => {
        if (data.success) {
          this.quizData = data.questions;
        } else {
          window.alert(data.message);
        }
      });
    },
    updateAnswer(language, index) {
      this.answer = language;
      this.sIndex = index;
      this.answered = true;
    },
    submit() {
      if (!this.gameData.isEnd) {
        this.answered = false;
        let data = {
          roomId: this.roomId,
          gistId: this.quizData[this.current].gistId,
          answer: this.answer,
          timeTaken: (Date.now() - this.timeTaken) / 1000
        };
        this.$socket.emit("submit", data);
        if (this.current !== 3) {
          this.sIndex = -1;
          this.current++;
        }
      } else {
        window.alert("Game has ended!");
      }
    }
  },
  sockets: {
    endGame: function() {
      this.updateGameState("endGame");
      if (!this.gameData.isHost) {
        window.alert("Game ended by host");
      }
    }
  }
};
</script>

<style scoped>
.quiz-page {
  background-color: #222831;
  height: 100vh;
  color: #eeeeee;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.quiz-container {
  padding: 15px;
  z-index: 2;
  background-color: #393e4640;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 50px;
  box-shadow: 5px 5px 40px #00adb550;
  position: relative;
}
.point {
  font-size: 2.3em;
  text-align: center;
}
.container {
  padding: 8px 5em;
}
.choice-block {
  background-color: #c4c4c4;
  height: 21em;
  overflow-y: scroll;
}
.ans-container {
  padding-block: 15px;
  gap: 20px;
  display: flex;
  justify-content: space-between;
}
.next-container {
  display: flex;
  justify-content: flex-end;
}
.next-btn {
  /*display: none;*/
  background-color: #00adb580;
  padding: 10px;
  width: 8em;
  border-radius: 10px;
  font-size: 20px;
  transition: 0.1s ease-in;
}
.next-btn:hover {
  background-color: #00adb540;
}
.next-btn i {
  padding: 5px;
}

/* background animation */
.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: #00adb535;
  animation: animate 25s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}

.selected {
  background-color: #00adb5;
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
.modal h1 {
  margin: 0 0 1rem;
  color: #2c3e50;
  font-size: 4rem;
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

.action {
  display: flex;
  flex-direction: column;
}

.action button {
  background-color: #00adb580;
  padding: 10px;
  width: 8em;
  border-radius: 10px;
  font-size: 20px;
  margin: 1em 0.5em;
  color: #fff;
}
</style>

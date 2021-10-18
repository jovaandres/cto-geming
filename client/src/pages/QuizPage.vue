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
            v-for="choice in quizData[current].choice"
            v-bind:choice="choice"
            :key="choice"
            v-on:click.native="updateAnswer(choice)"
          />
        </div>
        <div class="next-container">
          <button
            type="submit"
            class="next-btn"
            @click="next(quizData[current].gistId, quizData[current].filename)"
          >
            Next
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
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
  name: "QuizPage",
  components: {
    Button,
    VueEmbedGist
  },
  data() {
    return {
      current: 0,
      answer: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    };
  },
  computed: {
    quizData() {
      return store.state.quizData;
    },
    userId() {
      return store.state.userAuth.user;
    }
  },
  serverPrefetch() {
    this.fetchData();
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions(["setQuizData"]),
    fetchData() {
      this.$http._get("/quiz").then(res => {
        return this.setQuizData(res.data);
      });
    },
    next(gistId, filename) {
      if (this.current !== 14) {
        this.answer[this.current] = {
          gistId: gistId,
          filename: filename,
          language: this.answer[this.current]
        };
        this.current++;
      } else {
        this.answer[this.current] = {
          gistId: gistId,
          filename: filename,
          language: this.answer[this.current]
        };
        this.$http
          ._post("/quiz/grade", { data: this.answer, userId: this.userId.id, timeTaken: 180 })
          .then(res => {
            console.log(res);
            const redirectRouteName = this.$route.query.redirect || "home";
            return this.$router.push({ name: redirectRouteName, query: this.$route.query });
          });
      }
    },
    updateAnswer(language) {
      this.answer[this.current] = language;
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
</style>

<template>
  <div class="board-page">
    <particle1 />
    <div class="title">
      <h1>
        <span>L</span>
        <span>e</span>
        <span>a</span>
        <span>d</span>
        <span>e</span>
        <span>r</span>
        <span>b</span>
        <span>o</span>
        <span>a</span>
        <span>r</span>
        <span>d</span>
      </h1>
    </div>
    <div class="table-container" v-if="leaderboard.length">
      <table>
        <tr>
          <td><b>Rank</b></td>
          <td><b>Name</b></td>
          <td><b>Score</b></td>
          <td><b>Time Taken (s)</b></td>
        </tr>
        <tr v-for="(item, index) in leaderboard" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.player.firstName + " " + item.player.lastName }}</td>
          <td>{{ item.score }}</td>
          <td>{{ item.timeTaken }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import particle1 from "@/components/particle1";

export default {
  name: "Leaderboard",
  components: {
    particle1
  },
  data() {
    return {
      leaderboard: []
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$http
        ._get("/leaderboard")
        .then(res => {
          this.leaderboard = res.data;
        })
        .catch(err => {
          console.log(err.message);
        });
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

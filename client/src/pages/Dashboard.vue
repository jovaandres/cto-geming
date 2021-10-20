<template>
  <div class="dashboard">
    <div class="dashboard-container">
      <button class="sign-out">
        <i class="fas fa-door-open"></i>
        <span>Sign out</span>
      </button>
        <div class="inner-container">
          <div class="profile">
            <div class="profile-img"></div>
          <div class="profile-content">
            <h2 class="name">Username</h2>
            <h2 class="rank">Rank #1</h2>
          </div>
        </div>
        <div class="quiz-content">
          <router-link to="quiz">
            <button class="quiz-btn">Quiz</button>
          </router-link>
          <router-link to="leaderboard">
            <button class="leaderboard-btn">Leaderboard</button>
          </router-link>
          <div class="highscore-box">
            <h2>Highscore</h2>
            <div class="score">
              <h1>1000</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboard"
}
</script>

<style scoped>
  .dashboard {
    background-color: #222831;
    height: 100vh;
    width: 100vw;
    color: #EEEEEE;
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
    background-color: #EEEEEE;
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

  .name, .rank {
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


</style>
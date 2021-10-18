<template>
  <div class="home-page">
    <div class="left">
      <particle2 />
      <h1 class="title">
        <span>P</span>
        <span>R</span>
        <span>O</span>
        <span>G</span>
        <span>R</span>
        <span>A</span>
        <span>M</span>
        <span>M</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
        <br />
        <span>L</span>
        <span>A</span>
        <span>N</span>
        <span>G</span>
        <span>U</span>
        <span>A</span>
        <span>G</span>
        <span>E</span>
        <span> Q</span>
        <span>U</span>
        <span>I</span>
        <span>Z</span>
      </h1>
      <div class="btn-container">
        <router-link to="/sign-in">
          <button class="btn-link sign-in">
            Sign In
          </button>
        </router-link>
        <router-link to="sign-up">
          <button class="btn-link sign-up">
            Sign Up
          </button>
        </router-link>
    </div>
    </div>
    <div class="right">
      <div class="img-holder">
        <img src="@/images/homepage/code1.jpg" alt="Code" class="code1">
        <img src="@/images/homepage/code2.jpg" alt="Code" class="code2">
      <div class="img-blur"></div>
      </div>
    </div>
  </div>
</template>
<script>
// import SvgExample from "@/assets/svgs/svg-example.svg";
import particle2 from "@/components/particle2";
export default {
  name: "HomePage",
  components: {
    particle2
  }
};
</script>
<style scoped>
  .home-page {
    background-color: #222831;
    height: 100vh;
    width: 100vw;
    color: #EEEEEE;
    /* overflow: hidden; */
    display: flex;
  }
  .left {
    width: 65%;
    display: flex;
    height: 100vh;
    justify-content: center;
    padding-inline: 5em;
    flex-direction: column;
    /* border: 1px solid white; */
  }
  .title {
    z-index: 2;
  }
  .right {
    background-color: #00ADB5;
    width: 45%;
    position: relative;
    /* border: 1px solid white; */
  }
  h1 {
    font-family: "Bowlby One SC";
    font-size: 4em;
  }
  h1 span {
    transition: 0.15s ease-out;
    cursor: default;
  }
  h1 span:hover {
    color: #00ADB5;
  }
  .btn-container {
    display: flex;
    gap: 20px;
    z-index: 2;
  }
  .btn-link {
    outline: none;
    padding: 10px;
    width: 10em;
    border-radius: 30px;
    font-size: 16px;
    transition: 0.15s ease-in-out;
  }
  .sign-in {
    background-color: #00ADB585;
  }
  .sign-in:hover {
    /* background-color: #14898f; */
    box-shadow: 2px 2px 12px 1px #393E46;
  }
  .sign-up {
    border: 1px solid #00ADB585;
  }
  .sign-up:hover {
    box-shadow: 2px 2px 12px 1px #393E46;
  }
  .wave {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transform: rotate(-90deg);
  }
  .img-blur {
    height: 100vh;
    background: rgba( 34, 40, 49, 0.3 );
    box-shadow: 0 -8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 1.5px );
    -webkit-backdrop-filter: blur( 1.5px );
  }
  .img-holder {
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .code1 {
    width: 35em;
    position: absolute;
    right: -10%;
    top: -8%;
    transform: rotate(-12deg);
  }
  .code2 {
    width: 32em;
    position: absolute;
    bottom: -8%;
    left: -7%;
    transform: rotate(-8deg);
  }
</style>

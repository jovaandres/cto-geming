<template>
  <div class="sign-up-page">
    <particle3 />
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
    </transition>
    <transition name="pop" appear>
      <div class="modal" role="dialog" v-if="showModal">
        <h3>{{ name }}</h3>
        <p>{{ message }}</p>
      </div>
    </transition>
    <div class="sign-up-container">
      <div class="sign-up-box">
        <div class="sign-up-form">
          <h1 class="sign-up-title">Sign up as user</h1>
          <input
            type="text"
            class="text-field"
            name="first-name"
            placeholder="First name"
            v-model="userData.firstName"
          />

          <input
            type="text"
            class="text-field"
            name="last-name"
            placeholder="Last name"
            v-model="userData.lastName"
          />

          <input
            type="text"
            class="text-field"
            name="email"
            placeholder="Email"
            v-model="userData.email"
          />

          <input
            type="password"
            class="text-field"
            name="password"
            placeholder="Password"
            v-model="userData.password"
          />

          <button type="submit" class="button w-full" @click="onSubmit">
            Create Account
          </button>
        </div>
        <div class="link-sign-in mt-2">
          Already have an account?
          <router-link class="no-underline border-b border-blue-500 text-blue-500" to="/sign-in">
            Sign in
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import particle3 from "../components/particle3.vue";

export default {
  name: "AuthPage",
  components: { particle3 },
  props: ["userAuth"],
  data() {
    return {
      userData: {
        email: "",
        firstName: "",
        lastName: "",
        password: ""
      },
      name: "",
      message: "",
      showModal: false
    };
  },
  watch: {
    userAuth: {
      handler(val) {
        if (val.isAuth) {
          const redirectRouteName = this.$route.query.redirect || "home";
          return this.$router.push({ name: redirectRouteName, query: this.$route.query });
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(["updateUserAuth"]),
    onSubmit() {
      this.$http
        ._post("/users", this.userData)
        .then(body => {
          return this.updateUserAuth({
            isAuth: true,
            user: body.user
          });
        })
        .catch(err => {
          if (err.response) {
            this.name = err.response.data.name;
            this.message = err.response.data.errors || err.response.data.message;
            this.showModal = true;
          }
        });
    }
  }
};
</script>

<style scoped>
.sign-up-page {
  background-color: #222831;
  height: 100vh;
  width: 100vw;
  color: #eeeeee;
  overflow: hidden;
  display: flex;
  justify-content: center;
  padding: 5em;
}

.sign-up-container {
  padding: 30px 4em;
  z-index: 2;
  background-color: #393e4640;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 50px;
  box-shadow: 5px 5px 40px #00adb550;
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
}

.sign-up-box {
  display: flex;
  flex-direction: column;
}

.sign-up-title {
  font-size: 28px;
  text-align: center;
}

.sign-up-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sign-up-form input {
  background-color: #393e46;
  padding: 9px;
  outline: none;
  width: 20em;
}

.sign-up-form input:-webkit-autofill,
.sign-up-form input:-webkit-autofill:hover,
.sign-up-form input:-webkit-autofill:focus,
.sign-up-form input:-webkit-autofill:active {
  -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
  -webkit-transition-delay: 9999s;
  transition: color 9999s ease-out, background-color 9999s ease-out;
  transition-delay: 9999s;
}

.sign-up-form button {
  background-color: #00adb590;
  padding: 8px;
  outline: none;
}

.sign-up-form button:hover {
  background-color: #00adb550;
}

.link-sign-in {
  text-align: center;
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

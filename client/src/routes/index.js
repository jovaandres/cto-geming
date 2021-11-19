import VueRouter from "vue-router";
import AuthPage from "@/pages/AuthPage";
import HomePage from "@/pages/HomePage";
import Dashboard from "@/pages/Dashboard";
import SignInPage from "@/pages/SignInPage";
import QuizPage from "@/pages/QuizPage";
import QuizGame from "@/pages/QuizGame";
import NotFound from "@/pages/NotFound";
import LeaderboardPage from "@/pages/LeaderboardPage";
import store from "@/vuex";
import WaitingPage from "@/pages/WaitingPage";

const routes = [
  {
    name: "leaderboard",
    path: "/leaderboard",
    component: LeaderboardPage,
    meta: {
      title: "Leaderboard"
    }
  },
  {
    name: "quiz",
    path: "/quiz",
    component: QuizPage,
    meta: {
      title: "Quiz",
      requireAuth: true
    }
  },
  {
    name: "quizgame",
    path: "/quizgame",
    component: QuizGame,
    meta: {
      title: "Quiz Game"
    }
  },
  {
    name: "waiting",
    path: "/waiting",
    component: WaitingPage,
    meta: {
      title: "Waiting Room"
    }
  },
  {
    name: "dashboard",
    path: "/dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard",
      requireAuth: true
    }
  },
  {
    name: "home",
    path: "",
    component: HomePage,
    meta: {
      title: "Home",
      redirectDashboard: true
    }
  },
  {
    name: "sign-up",
    path: "/sign-up",
    component: AuthPage,
    meta: {
      title: "Sign Up",
      redirectDashboard: true
    }
  },
  {
    name: "sign-in",
    path: "/sign-in",
    component: SignInPage,
    meta: {
      title: "Sign In",
      redirectDashboard: true
    }
  },
  {
    name: "not-found",
    path: "*",
    component: NotFound,
    meta: {
      title: "Page Not Found"
    }
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach(async (to, from, next) => {
  const isUserAuth = store.state.userAuth.isAuth;

  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!isUserAuth) {
      next({
        name: "home",
        query: { ...to.query, redirect: to.name }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.redirectDashboard)) {
    if (isUserAuth) {
      next({
        name: "dashboard",
        query: { ...to.query, redirect: to.name }
      });
    } else {
      next();
    }
  } else {
    next();
  }

  const hasTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  if (hasTitle) {
    document.title = hasTitle.meta.title;
  }
});

export default router;

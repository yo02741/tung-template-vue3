import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";

import { useUserInfoStore } from "@/stores/userInfo";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)",
      redirect: "/",
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      beforeEnter: (to, from, next) => {
        const { userInfo } = useUserInfoStore();

        if (userInfo === null) {
          next();
          return;
        }

        next("/");
      },
    },
    {
      path: "/",
      name: "Home",
      component: HomeView,
      meta: { requiresAuthN: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { userInfo } = useUserInfoStore();

  if (to.meta.requiresAuthN && to.name !== "Login" && userInfo === null) {
    next({ name: "Login" });
  } else next();
});

export default router;

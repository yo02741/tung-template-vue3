<script setup>
import { computed, ref } from "vue";

import { useRouter } from "vue-router";

import { storeToRefs } from "pinia";
import { useAppInfoStore } from "@/stores/appInfo";
import { useUserInfoStore } from "@/stores/userInfo";

const router = useRouter();

const appInfoStore = useAppInfoStore();
const { appTitle } = storeToRefs(appInfoStore);

const userInfoStore = useUserInfoStore();
const { userInfo } = storeToRefs(userInfoStore);

const account = ref("");
const password = ref("");
const refPassword = ref(null);
const isPasswordShow = ref(false);

const seePasswordIcon = computed(() => {
  const image = isPasswordShow.value ? "eye-open" : "eye-off";
  return new URL(`/src/assets/icons/${image}.svg`, import.meta.url);
});

const passwordTypeUpdate = () => {
  isPasswordShow.value = !isPasswordShow.value;
  refPassword.value.type =
    refPassword.value.type === "password" ? "text" : "password";
};

const onLogin = () => {
  userInfo.value = {
    account: account.value,
    password: password.value,
    name: "TEST USER",
  };

  router.push({ name: "Home" });
};
</script>

<template>
  <div class="login-container">
    <img src="@/assets/images/bg-1.svg" alt="" class="bg-right" />
    <img src="@/assets/images/bg-2.svg" alt="" class="bg-left" />
    <div class="login-div">
      <img
        src="@/assets/images/logo-login.svg"
        alt="童綜合醫院"
        class="tung-logo"
      />
      <div class="login-title">- {{ appTitle }} -</div>
      <div class="input-group">
        <div class="account">
          <input
            v-model="account"
            type="text"
            class="form-control"
            placeholder="帳號"
          />
          <label>
            <img src="@/assets/icons/login-account.svg" alt="" />
          </label>
        </div>
        <div class="password">
          <input
            ref="refPassword"
            v-model="password"
            type="password"
            class="form-control"
            placeholder="密碼"
            @keyup.enter="onLogin"
          />
          <label>
            <img src="@/assets/icons/login-password.svg" alt="" />
          </label>
          <img
            :src="seePasswordIcon"
            alt=""
            class="eye"
            @click="passwordTypeUpdate"
          />
        </div>
      </div>
      <button class="login-btn" @click="onLogin">
        登入
        <img src="@/assets/icons/arrow-right-light.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: transparent
    linear-gradient(180deg, #0ead69 0%, #0ba161 55%, #027242 100%) 0% 0%
    no-repeat padding-box;
  .bg-right {
    position: absolute;
    top: -25%;
    right: -5%;
    mix-blend-mode: color-dodge;
  }
  .bg-left {
    position: absolute;
    bottom: -25%;
    left: -10%;
  }
}

.login-div {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 365px;
  min-height: 450px;
  padding: 50px 55px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 8px 20px #33333380;
}

.tung-logo {
  width: 100%;
  padding: 0 5px;
}

.login-title {
  color: #009944;
  font-weight: 600;
  font-size: 27px;
  line-height: 44px;
}

.input-group {
  & > * {
    position: relative;
  }
  label {
    position: absolute;
    top: 50%;
    left: 25px;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    color: #9c9c9c;
    transition: all 0.3s;
  }
  .form-control {
    position: relative;
    width: 100%;
    height: 56px;
    padding: 15px 50px 14px;
    border: 1px solid #aaaaaa;
    font-size: 18px;
    transition: all 0.3s;
    &::placeholder {
      position: relative;
      top: 1px;
      color: #aaaaaa;
    }
    &:hover {
      border-color: #009944;
    }
    &:focus {
      outline: 0;
      -webkit-appearance: none;
      -webkit-box-shadow: 0 0 0 0.25rem rgba(14, 173, 105, 0.3);
      box-shadow: 0 0 0 0.25rem rgba(14, 173, 105, 0.3);
    }
  }

  .account,
  .password {
    position: relative;
    width: 100%;
    &:hover,
    &:focus-within {
      z-index: 5;
    }
  }

  .account .form-control {
    border-radius: 5px 5px 0 0;
  }

  .password {
    top: -1px;
    .form-control {
      border-radius: 0 0 5px 5px;
    }
  }

  .eye {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    padding: 4px;
    cursor: pointer;
  }
}

.login-btn {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 58px;
  min-height: 58px;
  background-image: linear-gradient(
    270deg,
    #01c776 0%,
    #019a5b 54%,
    #01834d 100%
  );
  box-shadow: 0px 5px 10px #0190554d;
  z-index: 1;
  border: 0;
  border-radius: 5px;
  text-align: center;
  font-size: 18px;
  line-height: 27px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s;
  &::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(
      90deg,
      #01c776 0%,
      #019a5b 54%,
      #01834d 100%
    );
    border-radius: 5px;
    z-index: -1;
    transition: opacity 0.5s linear;
    opacity: 0;
  }
  &:hover::before {
    opacity: 1;
  }
  &:focus {
    outline: 0;
    -webkit-appearance: none;
    -webkit-box-shadow: 0 0 0 0.25rem rgba(14, 173, 105, 0.3);
    box-shadow: 0 0 0 0.25rem rgba(14, 173, 105, 0.3);
  }
  img {
    position: absolute;
    top: 50%;
    right: 15px;
    width: 18px;
    transform: translateY(-50%);
    transition: all 0.3s;
  }
  &:hover img {
    transform: translate(3px, -50%);
  }
}
</style>

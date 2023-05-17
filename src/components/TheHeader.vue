<script setup>
import { ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserInfoStore } from "@/stores/userInfo";

const showPlugin = ref(false);

const router = useRouter();

const userInfoStore = useUserInfoStore();
const { userInfo } = storeToRefs(userInfoStore);

const toHome = () => {
  router.push({ name: "Home" });
};

const logout = () => {
  userInfo.value = null;
  router.push({ name: "Login" });
};

const toggle = () => {
  showPlugin.value = !showPlugin.value;

  if (showPlugin.value) window.addEventListener("click", detectClicked, true);
  else window.removeEventListener("click", detectClicked, true);
};

const detectClicked = (e) => {
  if (
    ["user-name", "user-icon", "user-info active"].includes(e.target.className)
  ) {
    e.preventDefault();
    return;
  }
  showPlugin.value = false;
  window.removeEventListener("click", detectClicked, true);
};

onBeforeUnmount(() => {
  window.removeEventListener("click", detectClicked, true);
});
</script>

<template>
  <div class="header">
    <div class="system-info">
      <h1>
        <img
          src="@/assets/images/logo-header.svg"
          alt
          class="logo"
          @click="toHome"
        />
        <span class="system-name">dev/template</span>
      </h1>
    </div>
    <div class="user-info" :class="{ active: showPlugin }" @click="toggle">
      <span class="user-name">{{ userInfo?.name }}</span>
      <img
        src="@/assets/icons/medical-user-icon.svg"
        alt=""
        class="user-icon"
      />
      <div class="float-plugin-div">
        <div class="logout" @click="logout">
          <img src="@/assets/icons/run-icon.svg" alt="" />
          <span>登出</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  min-height: 55px;
  background: #009a5b;
  color: #fff;
  box-shadow: 0 3px 6px #00000029;
  z-index: 1001 !important;
}

.system-info {
  display: flex;
  h1 {
    display: flex;
    align-items: center;
    margin: 0;
    height: 100%;
    line-height: 1.5;
    .logo {
      margin: auto 18px;
      cursor: pointer;
    }
  }
  .system-name {
    position: relative;
    display: block;
    margin-left: 18px;
    font-size: 26px;
    font-weight: 500;
    line-height: 55px;
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: -18px;
      transform: translateY(-50%);
      min-width: 1px;
      height: calc(100% - 30px);
      background: #00af4e;
    }
  }
}

.user-info {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 15px;
  user-select: none;
  cursor: pointer;
  transition: all 0.3s;
  &:hover,
  &.active {
    background: #018039;
  }
  .user-name {
    position: relative;
    top: 1px;
    font-size: 16px;
    line-height: 20px;
    color: #ffffff;
  }
  .user-icon {
    width: 34px;
    height: 34px;
    margin-left: 10px;
  }
  .float-plugin-div {
    display: none;
    position: absolute;
    top: 60px;
    right: 5px;
    width: calc(100% - 5px);
    height: 50px;
    padding: 5px;
    border-radius: 4px;
    background: #009944;
    transition: all 0.3s;
  }
  &.active .float-plugin-div {
    display: block;
    z-index: 9000;
  }
  .logout {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    transition: all 0.3s;
    &:hover {
      background: #018039;
    }
    span {
      display: inline-block;
      color: #ffffff;
    }
    img {
      margin-right: 10px;
      transform: scale(1.5) rotateY(180deg);
    }
  }
}
</style>

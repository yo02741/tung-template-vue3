<script setup>
import TheHeader from "../components/TheHeader.vue";
import TheSidebar from "../components/TheSidebar.vue";

import { storeToRefs } from "pinia";
import { useUserInfoStore } from "@/stores/userInfo";

const userInfoStore = useUserInfoStore();
const { userInfo } = storeToRefs(userInfoStore);
</script>

<template>
  <TheHeader />
  <div class="main">
    <TheSidebar />
    <div class="content">
      Welcome Home!
      <pre>{{ userInfo }}</pre>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  height: 100%;
  .content {
    flex: 1;
    padding: 20px;
  }
}
</style>

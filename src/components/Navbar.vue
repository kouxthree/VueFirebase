<template>
  <div>
    <nav>
      <router-link to="/"> Home </router-link> |
      <span v-if="isLoggedIn">
        <router-link to="/feed"> Feed </router-link> |
        <button @click="logout"> Logout </button>
        {{ getUsername() }}
      </span>
      <span v-else>
        <router-link to="/register"> Register </router-link> |
        <router-link to="/signin"> Login </router-link> |
      </span>
    </nav>
  </div>

</template>

<script setup>
import store from "../store";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const isLoggedIn = ref(false);

if (store.getters.isLoggedIn) {
  isLoggedIn.value = true;
} else {
  isLoggedIn.value = false;
}

const logout = async () => {
  await store.dispatch("logout");
  router.push("/signin");
}

const getUsername = () =>  {
  let ret = '';
  if(store.getters.user) ret = store.getters.user.email;
  return ret;
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

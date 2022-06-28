<template>
  <div>
    <nav>
      <span v-if="isLoggedIn">
        <router-link to="/"> Home </router-link> |
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
import { useStore, mapGetters } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";

const store = useStore();
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
  return store.getters.user.email;
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

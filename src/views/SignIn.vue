<template>
	<Navbar />
	<h1>Login to Your Account</h1>
	<p><input type="text" placeholder="Email" v-model="email" /></p>
	<p><input type="password" placeholder="Password" v-model="password" /></p>
	<p><button @click="signin">SignIn</button></p>
	<div>{{ message }}</div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router'

const email = ref("");
const password = ref("");
const error = ref(null);
const store = useStore();
const message = ref(null);
const router = useRouter();

const signin = async () => {
	try {
		await store.dispatch("signin", {
			email: email.value,
			password: password.value,
		});
		router.push("/");
	} catch (err) {
		error.value = err.message;
	}
	message.value = error.value;
}
</script>

<style>
</style>
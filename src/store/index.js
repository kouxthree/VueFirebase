import { createStore } from "vuex";
import { auth } from "../firebase/config";
import { ref } from "vue";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    state: {
        user: null,
        isLoggedIn: false,
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
            if (state.user != null) {
                state.isLoggedIn = true;
            } else {
                state.isLoggedIn = false;
            }
            console.log(state.user);
        },
        // onAuthStateChanged(state, user) {
        //     state.user = user;
        // },
    },
    actions: {
        async register(context, { email, password }) {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            if (response) {
                context.commit("setUser", response.user);
            } else {
                throw new Error("register failed");
            }
        },
        async signin(context, { email, password }) {
            const errMsg = ref("");
            const response = await signInWithEmailAndPassword(auth, email, password)
                .catch(error => {
                  switch (error.code) {
                    case 'auth/invalid-email':
                        errMsg.value = 'Invalid email'
                        break
                    case 'auth/user-not-found':
                        errMsg.value = 'No account with that email was found'
                        break
                    case 'auth/wrong-password':
                        errMsg.value = 'Incorrect password'
                        break
                    default:
                        errMsg.value = 'Email or password was incorrect'
                        break
                  }
                });
            if (response) {
                context.commit("setUser", response.user);
            } else {
                throw new Error("signin failed: " + errMsg.value);
            }
        },
        async logout(context) {
            await signOut(auth);
            context.commit("setUser", null);
        },
    },
    getters: {
        user(state) {
            return state.user;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
    },
    plugins: [createPersistedState({
        key: "loginstate",
        paths: ["user", "isLoggedIn"],
        storage: window.sessionStorage,
    })],
});
export default store;
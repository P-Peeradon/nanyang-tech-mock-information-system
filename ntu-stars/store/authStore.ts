import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const authStore = defineStore('auth', () => {
    const user = ref<null>(null);
    const token = ref<string>(null);
    const isLoading = ref<boolean>(false);

    const isAuthenticated = computed<boolean>(() => !!token.value && !!user.value);
    const userRoles = computed<string | undefined>(() => user.value?.role);

    async function login(email: string, password: string) {
        isLoading.value = true;
    }

    async function tryAutoLogin() {

    }

    async function logout() {

    }

    return { login, logout };
});

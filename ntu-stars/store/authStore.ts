import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface userData {
    fullName: string;
    email: string;
    role: 'student' | 'teaching_staff' | 'school_admin' | 'registrar_admin';
}

export const authStore = defineStore('auth', () => {
    const user = ref<userData | null>(null);
    const token = ref<string | null>(null);
    const isLoading = ref<boolean>(false);

    const isAuthenticated = computed<boolean>(() => !!token.value && !!user.value);
    const userRoles = computed<string | undefined>(() => user.value?.role);

    function getToken(): string | null {
        return token.value;
    }

    async function login(email: string, password: string) {
        isLoading.value = true;
    }

    async function tryAutoLogin() {

    }

    async function logout() {

    }

    return { getToken, login, tryAutoLogin, logout };
});

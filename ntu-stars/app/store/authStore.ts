import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface userData {
    nanyangId: string;
    fullName: string;
    email: string;
    role: 'student' | 'teaching_staff' | 'intern' | 'admin';
}

export const authStore = defineStore('auth', () => {
    const user = ref<userData | null>(null);
    const token = useCookie<string | null>('auth_token', { maxAge: 60 * 60 * 24 }); // 24 hours
    const isLoading = ref<boolean>(false);

    const isAuthenticated = computed<boolean>(() => !!token.value);
    const userRoles = computed<string | undefined>(() => user.value?.role);

    function getToken(): string | null {
        return token.value || null;
    }

    async function login(username: string, password: string): Promise<boolean> {
        isLoading.value = true;
        try {
            const { data, error } = await useFetch<{ token: string, user: userData }>('/api/login', {
                method: 'POST',
                body: { username, password }
            });

            if (error.value || !data.value) {
                console.error('Login failed:', error.value?.data || error.value?.message || 'Unknown error');
                return false;
            }

            token.value = data.value.token;
            user.value = data.value.user;

            // Also store user info in cookie or local storage if needed for SSR persistence beyond token
            const userCookie = useCookie<userData | null>('user_info');
            userCookie.value = data.value.user;

            return true;
        } catch (err) {
            console.error('Unexpected error during login:', err);
            token.value = null;
            user.value = null;
            return false;
        } finally {
            isLoading.value = false;
        }
    }

    function tryAutoLogin() {
        if (token.value) {
            const userCookie = useCookie<userData | null>('user_info');
            if (userCookie.value) {
                user.value = userCookie.value;
            }
        }
    }

    function logout() {
        token.value = null;
        user.value = null;
        const userCookie = useCookie<userData | null>('user_info');
        userCookie.value = null;
        navigateTo('/login');
    }

    return { user, token, isLoading, isAuthenticated, userRoles, getToken, login, tryAutoLogin, logout };
});

import { authStore } from "../store/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = authStore();

    // List of protected routes
    const protectedRoutes = ['/welcome', '/addDrop', '/profile'];

    // Check if the current route is protected
    const isProtectedRoute = protectedRoutes.some(route => to.path === route || to.path.startsWith(route + '/'));

    if (isProtectedRoute && !auth.isAuthenticated) {
        // Redirect to login if not authenticated
        return navigateTo('/login');
    }

    // Redirect to welcome if already authenticated and trying to access login
    if (to.path === '/login' && auth.isAuthenticated) {
        return navigateTo('/welcome');
    }
});

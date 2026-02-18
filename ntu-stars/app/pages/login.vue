<template>
    <div class="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <UCard class="w-full max-w-md shadow-xl bg-white/80 backdrop-blur-md border-primary-100">
            <template #header>
                <div class="flex flex-col items-center gap-2">
                    <img src="/nanyang_coat_w_name.png" alt="NTU Logo" class="h-16 mb-2">
                    <h1 class="text-2xl font-bold text-primary-900">Sign In</h1>
                    <p class="text-sm text-gray-500 text-center">Enter your Nanyang ID or Email to access NTU Stars</p>
                </div>
            </template>

            <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
                <UFormGroup label="Student ID / Email" name="username" required>
                    <UInput
                        v-model="state.username"
                        placeholder="U2123456J or email@ntu.edu.sg"
                        icon="i-heroicons-user"
                        size="lg"
                    />
                </UFormGroup>

                <UFormGroup label="Password" name="password" required>
                    <UInput
                        v-model="state.password"
                        type="password"
                        placeholder="••••••••"
                        icon="i-heroicons-lock-closed"
                        size="lg"
                    >
                        <template #trailing>
                            <UButton
                                color="neutral"
                                variant="ghost"
                                :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                                :padded="false"
                                @click="showPassword = !showPassword"
                            />
                        </template>
                    </UInput>
                </UFormGroup>

                <div class="flex items-center justify-between">
                    <UCheckbox label="Remember me" />
                    <ULink to="#" class="text-sm text-primary-600 hover:text-primary-500 font-medium">Forgot password?</ULink>
                </div>

                <UButton
                    type="submit"
                    block
                    size="lg"
                    color="primary"
                    :loading="isLoading"
                    class="font-semibold shadow-lg shadow-primary-500/30"
                >
                    Login
                </UButton>
            </UForm>

            <template #footer>
                <p class="text-center text-xs text-gray-400">
                    &copy; 2026 Nanyang Technological University. All rights reserved.
                </p>
            </template>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';
import { authStore } from '../store/authStore';

definePageMeta({
    layout: 'default'
});

const authState = authStore();
const toast = useToast();
const isLoading = ref(false);
const showPassword = ref(false);

const schema = z.object({
    username: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required')
});

type Schema = z.output<typeof schema>;

const state = reactive({
    username: '',
    password: ''
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
    isLoading.value = true;
    try {
        const success = await authState.login(event.data.username, event.data.password);
        if (success) {
            toast.add({
                title: 'Success',
                description: 'You have been logged in successfully.',
                color: 'success'
            });
            navigateTo('/welcome');
        } else {
            toast.add({
                title: 'Login failed',
                description: 'Invalid credentials. Please try again.',
                color: 'error'
            });
        }
    } catch (err) {
        toast.add({
            title: 'Error',
            description: 'Something went wrong during login.',
            color: 'error'
        });
    } finally {
        isLoading.value = false;
    }
};
</script>
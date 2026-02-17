<template>
    <NuxtLayout name="default">
        <template #header>
            <TitleSection :title="'Add/Drop Course'" />
        </template>
        <UPageBody>
            <UPageSection>
                <template #title>
                    <h2 class="font-semibold text-2xl lg:text-3xl drop-shadow-lg drop-shadow-rose-400 drop-shadow-opacity-20">
                        Enrol in Course
                    </h2>
                </template>
                <template #default>
                    <CourseTable :courses="courses" :pending="pending" />
                </template>
            </UPageSection>
        </UPageBody>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { authStore } from '../../store/authStore';
import type { coursePacket } from '../../../ntu-services/server/resource/courseRest';
import { Course } from '../../../shared/course';

definePageMeta({
    layout: false
});

const auth = authStore();
const rawCourses = ref<coursePacket[]>([]);
const pending = ref<boolean>(true);

onMounted(async () => {
    try {
        const data = await $fetch<coursePacket[]>('/api/ntu-registrar/course', {
            query: {
                fields: 'cos_code,cos_title,cos_au'
            },
            headers: {
                Authorization: `Bearer ${auth.getToken()}`
            }
        });
        rawCourses.value = data;
    } catch (error) {
        console.error('Error fetching courses: ', error);
    } finally {
        pending.value = false;
    }
});

const courses = computed<Course[]>(() => (rawCourses.value ?? []).map((cp: coursePacket) => new Course(cp.cos_code, cp.cos_title, cp.cos_au)));

</script>


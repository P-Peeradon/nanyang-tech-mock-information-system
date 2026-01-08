<template>
    <UPage>
        <UPageBody class="gap-x-10">
            <UPageFeature
                title="NTU Lyon"
                orientation="vertical"
                description="Check your timetable and your study location at NTU Lyon. Let us become your buddy in Singapore."
                as="article"
            >
                <template #leading>
                    <img
                        src="/ntu_study_buddy.jpg"
                        alt="NTU STARS Layout"
                    >
                </template>
            </UPageFeature>

            <UPageCTA
                title="NTU STARS"
                description="Login to Nanyang Technological University Enrolment System"
                :links="loginLinks"
                as="aside"
            />
        </UPageBody>
    </UPage>
</template>

<script lang="ts" setup>
import type { ButtonProps } from '@nuxt/ui';
import { ref } from 'vue';

const loginLinks = ref<ButtonProps[]>([
    {
        label: 'NTU Student',
        color: 'primary'
    },
    {
        label: 'NTU Alumni',
        color: 'neutral',
        variant: 'subtle'
    }
]);
</script>

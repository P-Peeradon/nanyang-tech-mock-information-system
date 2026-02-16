<template>
    <NuxtLayout name="default">
        <template #header>
            <TitleSection :title="'Welcome to NTU STARS'" />
        </template>
        <div class="grid grid-cols-2 gap-8 px-8 lg:gap-16 xl:gap-32 m-0 lg:m-8 xl:m-16">
            <MenuCard
                :category="'Personal Account'"
                :menus="[
                    {
                        name: 'Profile Management',
                        page: '/profile'
                    },
                    {
                        name: 'Add/Drop Course',
                        page: '/addDrop'
                    }
                ]"
            />
            <MenuCard :category="'Financial Service'" />
            <MenuCard
                :category="'Timetable'"
                :menus="[
                    {
                        name: 'Timetable Planner',
                        page: '/welcome'
                    }
                ]"
            />
            <MenuCard :category="'Student Service'" />
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    layout: false
})
</script>


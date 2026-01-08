<template>
    <UPage>
        <template #default>
            <TitleSection :title="'Welcome to NTU STARS'" />
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
                            page: '/welcome'
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
                <!--
                <UCard class="bg-rose-800">
                    <template #header>
                        <h2>
                            Personal Account
                        </h2>
                    </template>
                    <ul>
                        <li>
                            <p>
                                <NuxtLink>Profile Management</NuxtLink>
                            </p>
                        </li>
                        <li>
                            <p>
                                <NuxtLink>Add/Drop Course</NuxtLink>
                            </p>
                        </li>
                    </ul>
                </UCard>
                <UCard class="bg-rose-800">
                    <template #header>
                        <h2>Financial Service</h2>
                    </template>
                </UCard>
                <UCard class="bg-rose-800">
                    <template #header>
                        <h2>Timetable</h2>
                    </template>
                    <ul>
                        <li>
                            <p>
                                <NuxtLink>Timetable Planner</NuxtLink>
                            </p>
                        </li>
                    </ul>
                </UCard>
                <UCard class="bg-rose-800">
                    <template #header>
                        <h2>Student Service</h2>
                    </template>
                </UCard>
                -->
            </div>
        </template>
    </UPage>
</template>

<style scoped>
@import "tailwindcss";

ul {
    @apply space-y-4 lg:space-y-6 xl:space-y-10;
}
li p {
    @apply text-lg text-indigo-200 underline lg:text-xl xl:text-2xl font-light;
}
</style>

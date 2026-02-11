<template>
    <UPage>
        <NavBar />
        <TitleSection :title="'Add/Drop Course'" />
        <UPageBody class="flex-col">
            <h2 class="text-cardinal-600 font-semibold text-2xl">
                Enrol in Course
            </h2>
            <CourseTable />
        </UPageBody>
    </UPage>
</template>

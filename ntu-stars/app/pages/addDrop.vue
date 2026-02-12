<template>
    <UPage>
        <NavBar />
        <TitleSection :title="'Add/Drop Course'" />
        <UPageBody>
            <UPageSection>
                <template #title>
                    <h2 class="font-semibold text-2xl lg:text-3xl drop-shadow-lg drop-shadow-rose-400 drop-shadow-opacity-20">
                        Enrol in Course
                    </h2>
                </template>
                <template #body>
                    <CourseTable />
                </template>
            </UPageSection>
        </UPageBody>
        <div class="mb-20">
            <br>
        </div>
    </UPage>
</template>

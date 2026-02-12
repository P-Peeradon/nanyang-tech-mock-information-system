<template>
    <UPage>
        <NavBar />
        <TitleSection :title="'Add/Drop Course'" />
        <UPageBody>
            <UPageSection class="py-0">
                <template #header>
                    <h2 class="text-cardinal-600 font-semibold text-2xl">
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

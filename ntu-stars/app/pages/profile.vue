<template>
    <UPage>
        <NavBar />
        <TitleSection :title="'Student Profile'" />
        <UPageSection>
            <template #description>
                <div class="flex flex-row justify-between py-0 lg:px-20 xl:px-40">
                    <ProfileCard />
                    <AcademicCalendar />
                </div>
            </template>
        </UPageSection>
        <UPageSection />
        <div class="mb-20">
            <br>
        </div>
    </UPage>
</template>

<script lang="ts" setup>
</script>

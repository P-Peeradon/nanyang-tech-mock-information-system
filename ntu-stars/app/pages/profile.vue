<template>
    <NuxtLayout name="default">
        <template #header>
            <TitleSection :title="'Student Profile'" />
        </template>
        <UPageBody>
            <UPageSection>
                <template #default>
                    <ProfileCard />
                    <AcademicCalendar :events="[]" />
                </template>
            </UPageSection>
            <UPageSection />
        </UPageBody>
    </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: false
})
</script>


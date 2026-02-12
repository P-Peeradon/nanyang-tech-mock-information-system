<template>
    <UPage>
        <NavBar />
        <TitleSection :title="'Student Profile'" />
        <UPageBody>
            <UPageSection>
                <template #default>
                    <ProfileCard />
                    <AcademicCalendar :events="[]" />
                </template>
            </UPageSection>
            <UPageSection />
        </UPageBody>
        <div class="mb-20">
            <br>
        </div>
    </UPage>
</template>

<script lang="ts" setup>
</script>

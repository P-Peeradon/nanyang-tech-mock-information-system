<template>
    <UPage>
        <TitleSection :title="'Student Profile'" />
        <UPageSection>
            <div class="flex flex-row justify-between lg:px-20 xl:px-40">
                <ProfileCard />
                <AcademicCalendar />
            </div>
        </UPageSection>
        <UPageSection></UPageSection>
    </UPage>
</template>

<script lang="ts" setup>
</script>

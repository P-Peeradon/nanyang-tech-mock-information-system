<template>
    <UPage>
        <NavBar />
        <TitleSection :title="'Student Profile'" />
        <UPageSection>
            <div class="flex flex-row justify-between lg:px-20 xl:px-40">
                <ProfileCard />
                <AcademicCalendar />
            </div>
        </UPageSection>
        <UPageSection></UPageSection>
        <div class="mb-20">
            <br>
        </div>
    </UPage>
</template>

<script lang="ts" setup>
</script>

<template>
    <UCard class="w-90 lg:w-120 xl:150 aspect-3/2 border-2 border-gold-700 bg-cardinal-200 shadow-xl shadow-slate-600">
        <template #header>
            <h3 class="text-primary-500 text-xl font-semibold my-0">
                Student Name
            </h3>
        </template>

        <template #default>
            <div class="flex flex-row justify-center gap-6 lg:gap-10 xl:gap-14 items-baseline-center">
                <div class="flex flex-col justify-center items-center">
                    <img
                        src="/profile_avatar_placeholder.png"
                        alt="student image"
                        class="h-18 aspect-2/3 lg:h-24 lg:aspect-2/3"
                    >
                </div>
                <div class="flex flex-col justify-evenly items-start space-y-auto">
                    <p
                        class="text-xs md:text-sm lg:text-base xl:text-xl font-semibold"
                    >
                        <span class="text-gold-600 italic">ID:</span> Student ID
                    </p>
                    <p
                        class="text-xs md:text-sm lg:text-base xl:text-xl font-semibold"
                    >
                        <span class="text-gold-600 italic">Program:</span> Student Program
                    </p>
                    <p
                        class="text-xs md:text-sm lg:text-base xl:text-xl font-semibold"
                    >
                        <span class="text-gold-600 italic">School:</span> Student School
                    </p>
                </div>
            </div>
        </template>

        <template #footer>
            <h3 class="text-imperial-400 font-semibold text-sm lg:text-lg">Nanyang Technological University</h3>
        </template>
    </UCard>
</template>

<script lang="ts" setup>

</script>

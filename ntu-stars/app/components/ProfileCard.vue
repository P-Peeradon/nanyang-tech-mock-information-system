<template>
    <UCard class="w-90 aspect-3/2 border-2 border-gold-700 bg-cardinal-200 shadow-xl shadow-slate-600">
        <template #header>
            <h3 class="text-primary-500 text-xl font-semibold">
                Student Name
            </h3>
        </template>

        <div class="flex flex-row justify-center gap-6 items-baseline-center">
            <div class="flex flex-col justify-center items-center">
                <img
                    src="/profile_avatar_placeholder.png"
                    alt="student image"
                    class="h-25 aspect-2/3"
                >
            </div>
            <div class="flex flex-col justify-evenly items-start space-y-auto">
                <p
                    class="text-xs md:text-sm xl:text-2xl font-semibold"
                >
                    <span class="text-gold-600 italic">ID:</span> Student ID
                </p>
                <p
                    class="text-xs md:text-sm xl:text-2xl font-semibold"
                >
                    <span class="text-gold-600 italic">Program:</span> Student Program
                </p>
                <p
                    class="text-xs md:text-sm xl:text-2xl font-semibold"
                >
                    <span class="text-gold-600 italic">School:</span> Student School
                </p>
            </div>
        </div>
    </UCard>
</template>

<script lang="ts" setup>

</script>

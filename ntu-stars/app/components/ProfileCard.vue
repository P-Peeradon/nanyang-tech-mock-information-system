<template>
    <UCard class="w-450 aspect-3/2 border-2 border-gold-700 bg-cardinal-200 shadow-xl shadow-slate-600">
        <template #header>
            <h3 class="text-primary-500 text-2xl">
                Student Name
            </h3>
        </template>

        <div class="flex flex-row">
            <div class="flex flex-col justify-center items-center">
                <img
                    src="/profile_avatar_placeholder.png"
                    alt="student image"
                >
            </div>
            <div class="flex flex-col justify-evenly items-center space-y-auto">
                <p
                    class="text-xs md:text-sm xl:text-2xl font-semibold"
                >
                    <span>ID:</span> Student ID
                </p>
                <p
                    class="text-xs md:text-sm xl:text-2xl font-semibold"
                >
                    <span>Program:</span> Student Program
                </p>
                <p
                    class="text-xs md:text-sm xl:text-2xl font-semibold"
                >
                    <span>School:</span> Student School
                </p>
            </div>
        </div>
    </UCard>
</template>

<script lang="ts" setup>

</script>

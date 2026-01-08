<template>
    <div class="flex flex-row h-15 items-center">
        <div class="w-5/6">
            <h1 class="text-3xl text-imperial-700 text-underline font-bold text-center">
                {{ props.title }}
            </h1>
        </div>
        <div class="w-1/6 flex justify-center">
            <LogoutButton />
        </div>
    </div>
</template>

<script lang="ts" setup>
interface titleProps {
    title: string;
}

const props = defineProps<titleProps>();
</script>

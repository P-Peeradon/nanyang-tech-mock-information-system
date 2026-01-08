<template>
    <UCard class="flex flex-col aspect-square lg:p-8 bg-rose-800">
        <template
            #header
        >
            <div class="border-0 ">
                <h3 class="text-2xl font-semibold text-gold-500 lg:text-3xl xl:text-4xl indent-5">
                    {{ props.category }}
                </h3>
            </div>
        </template>
        <ul
            v-if="props.menus && props.menus?.length > 0"
            class="flex flex-col gap-2 lg:gap-4 xl:gap-8"
        >
            <li
                v-for="menu in props.menus"
                :key="menu.name"
            >
                <NuxtLink :to="menu.page">
                    <a
                        href="#"
                        class="text-sm lg:text-lg xl:text-3xl text-sky-200 ml-5 lg:ml-10 xl:ml-15 underline"
                    >
                        {{ menu.name }}
                    </a>
                </NuxtLink>
            </li>
        </ul>
    </UCard>
</template>

<script setup lang="ts">
import type Feature from '../../../shared/feature.ts';

interface MenuProp {
    category: string;
    menus?: Feature[];
}

const props = defineProps<MenuProp>();
</script>

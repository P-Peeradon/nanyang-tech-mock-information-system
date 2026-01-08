<script setup>
import WebBanner from './components/WebBanner.vue';

useHead({
    meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
        { rel: 'icon', href: '/favicon.ico' }
    ],
    htmlAttrs: {
        lang: 'en'
    }
});

const title = 'Mock NTU Stars System';
const description = 'A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours.';

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterCard: 'summary_large_image'
});
</script>

<template>
    <UApp>
        <WebBanner />

        <UMain>
            <NuxtLayout>
                <NuxtPage />
            </NuxtLayout>
        </UMain>

        <div class="mb-20">
            <br>
        </div>

        <UFooter>
            <template #default>
                <img
                    class="h-50 aspect-auto"
                    src="/nanyang_coat_w_name.png"
                    alt="Nanyang Technological University"
                >
                <div>
                    <h3 class="font-bold text-2xl text-white">
                        Contact Us
                    </h3>
                    <p class="my-2 text-white">
                        Tel: +65 7152 8250
                    </p>
                    <p class="my-2 text-white">
                        Email: registrar@ntu.edu.sg
                    </p>
                </div>
            </template>
        </UFooter>
    </UApp>
</template>

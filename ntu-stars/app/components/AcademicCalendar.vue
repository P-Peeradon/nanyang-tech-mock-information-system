<template>
    <ClientOnly>
        <UCalendar
            readonly
            month-controls
            !fixed-weeks
            class="w-70 aspect-square"
        >
            <template #day="{ day }">
                <div
                    class="w-full h-full flex items-center justify-center rounded-full"
                >
                    <span :class="isWeekend(day) ? 'text-red-600' : 'text-black' + isToday(day) ? ' border-2 border-imperial-600' : ''">
                        {{ day.day }}
                    </span>
                </div>
            </template>
        </UCalendar>
    </ClientOnly>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { today, getDayOfWeek, type DateValue } from '@internationalized/date';

const todayDate = ref<DateValue>(today('Asia/Singapore'));

const isWeekend = (date: DateValue): boolean => getDayOfWeek(date, 'en-US') % 6 === 0;

const isToday = (date: DateValue): boolean => date === todayDate.value;
</script>

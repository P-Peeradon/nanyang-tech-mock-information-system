<template>
    <ClientOnly>
        <UCalendar
            readonly
            size="md"
            month-controls
            !fixed-weeks
        >
            <template #day="{ day }">
                <div
                    class="w-full h-full flex items-center justify-center rounded-full"
                    :class="ringToday(day)"
                >
                    <span :class="`text-${getColorFromDay(day)}`">{{ day.day }}</span>
                </div>
            </template>
        </UCalendar>
    </ClientOnly>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CalendarDate, today, getDayOfWeek, type DateValue } from '@internationalized/date';

const todayDate = ref<DateValue>(today('Asia/Singapore'));

function getColorFromDay(date: DateValue): string {
    const isWeekend: boolean = getDayOfWeek(date, 'en-US') % 6 === 0;

    if (isWeekend) {
        return 'red-500';
    }

    return 'black';
}

function ringToday(date: DateValue): string {
    if (date === todayDate.value) {
        return 'ring-2 ring-imperial-600';
    }

    return '';
}
</script>

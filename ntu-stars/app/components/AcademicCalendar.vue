<template>
    <ClientOnly>
        <ScheduleXCalendar :calendar-app="calendarApp" />
    </ClientOnly>
</template>

<script lang="ts" setup>
import { ScheduleXCalendar } from '@schedule-x/vue';
import {
    createCalendar,
    type CalendarEventExternal,
    type CalendarConfig,
    createViewWeek,
    createViewMonthAgenda
} from '@schedule-x/calendar';
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls';
import '@schedule-x/theme-default/dist/index.css';
import 'temporal-polyfill/global';

interface calendarProps {
    events: CalendarEventExternal[];
}
const props = defineProps<calendarProps>();

const controls = createCalendarControlsPlugin();

const config: CalendarConfig = {
    locale: 'en-GB',
    timezone: 'Asia/Singapore',
    selectedDate: Temporal.PlainDate.from('2026-02-01'),
    firstDayOfWeek: 1,
    views: [
        createViewMonthAgenda(),
        createViewWeek()
    ],
    weekOptions: {
        gridHeight: 200,
        nDays: 5,
        eventWidth: 85,

        timeAxisFormatOptions: { hour: '2-digit', minute: '2-digit' },

        eventOverlap: true,
        gridStep: 60
    },
    dayBoundaries: {
        start: '08:00',
        end: '20:00'
    },
    minDate: Temporal.PlainDate.from('2020-01-01'),
    maxDate: Temporal.PlainDate.from('2030-12-31'),
    events: props.events
};

const calendarApp = createCalendar(config, [controls]);
</script>

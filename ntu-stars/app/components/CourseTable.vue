<template>
    <UTable
        :data="allCourse"
        :columns="columns"
    >
        <template #code-cell="{ row }">
            <div class="flex items-center px-6 gap-4">
                <p class="text-black font-medium text-lg">
                    {{ row.original.code }}
                </p>
            </div>
        </template>
        <template #title-cell="{ row }">
            <div class="flex items-center px-6 gap-4">
                <p class="text-black font-medium text-lg">
                    {{ row.original.title }}
                </p>
            </div>
        </template>
        <template #au-cell="{ row }">
            <div class="flex items-center px-6 gap-4">
                <p class="text-black font-medium text-lg">
                    {{ row.original.au }}
                </p>
            </div>
        </template>
        <template #action-cell="{ row }">
            <UButton
                color="primary"
                size="lg"
                @click="() => handleEnrol(row.original.code)"
            >
                Enrol
            </UButton>
        </template>
    </UTable>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { TableColumn } from '@nuxt/ui';
import type { coursePacket } from '../../../ntu-services/server/resource/courseRest';
import { Course, type ICourse } from '../../../shared/course';

const allCourse = ref<Course[]>([]);
const handleEnrol = (courseCode: string) => {

};

const columns: TableColumn<ICourse>[] = [
    {
        accessorKey: 'code',
        header: 'Course Code',
        meta: {
            class: {
                th: 'text-center text-xl text-gold-700 font-semibold'
            }
        }
    },
    {
        accessorKey: 'title',
        header: 'Course Title',
        meta: {
            class: {
                th: 'text-center text-xl text-gold-700 font-semibold'
            }
        }
    },
    {
        accessorKey: 'au',
        header: 'Academic Unit',
        meta: {
            class: {
                th: 'text-center text-xl text-gold-700 font-semibold'
            }
        }
    },
    {
        id: 'action'
    }
];

onMounted(async () => {
    const data: coursePacket[] = await $fetch('/api/ntu-registrar/course', {
        method: 'get',
        query: {
            fields: 'cos_code,cos_title,cos_au'
        }
    });

    allCourse.value = data.map((course: coursePacket) => {
        const { cos_code, cos_title, cos_au } = course;

        return new Course(cos_code, cos_title, cos_au);
    });
});
</script>

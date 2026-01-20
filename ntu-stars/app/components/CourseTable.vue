<template>
    <UTable
        :data="allCourse"
        :columns="columns"
    >
    </UTable>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { TableColumn } from '@nuxt/ui';
import type { coursePacket } from '../../../ntu-services/server/resource/courseRest';
import { Course, type ICourse } from '../../../shared/course';

const allCourse = ref<Course[]>([]);

const columns: TableColumn<ICourse>[] = [
    {
        accessorKey: 'code',
        header: 'Course Code'
    },
    {
        accessorKey: 'title',
        header: 'Course Title'
    },
    {
        accessorKey: 'au',
        header: 'Academic Unit'
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

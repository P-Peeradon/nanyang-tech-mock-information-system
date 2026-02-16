<template>
    <UTable
        :data="allCourse || []"
        :columns="columns"
    >
        <template #code-cell="{ row }">
            <div class="flex items-center px-6 gap-4">
                <p class="text-black font-thin text-base">
                    {{ row.original.code }}
                </p>
            </div>
        </template>
        <template #title-cell="{ row }">
            <div class="flex items-center px-6 gap-4">
                <p class="text-black font-thin text-base">
                    {{ row.original.title }}
                </p>
            </div>
        </template>
        <template #au-cell="{ row }">
            <div class="flex items-center px-6 gap-4">
                <p class="text-black font-thin text-base">
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
import { ref, onMounted } from 'vue';
import type { TableColumn } from '@nuxt/ui';
import type { coursePacket } from '../../../ntu-services/server/resource/courseRest';
import { Course, type ICourse } from '../../../shared/course';

const allCourse = ref<Course[]>([]);
const loading = ref<boolean>(false);
const handleEnrol = async (courseCode: string) => {
    loading.value = true;
    try {
        await useFetch('/api/ntu-registrar/enrolment', {
            method: 'POST',
            body: { courseCode }
        });
    } catch (error) {
        console.error('Error fetching courses: ', error);
    } finally {
        loading.value = false;
    }
};

const columns: TableColumn<ICourse>[] = [
    {
        accessorKey: 'code',
        header: 'Course Code',
        meta: {
            class: {
                th: 'text-center text-xl text-gold-700 font-semibold underline'
            }
        }
    },
    {
        accessorKey: 'title',
        header: 'Course Title',
        meta: {
            class: {
                th: 'text-center text-xl text-gold-700 font-semibold underline'
            }
        }
    },
    {
        accessorKey: 'au',
        header: 'Academic Unit',
        meta: {
            class: {
                th: 'text-center text-xl text-gold-700 font-semibold underline'
            }
        }
    },
    {
        id: 'action'
    }
];

onMounted(async () => {
    try {

        const { data: courses, status, error } = await useFetch<coursePacket[]>('/api/ntu-registrar/course', {
            method: 'get',
            query: {
                fields: 'cos_code,cos_title,cos_au'
            }
        });

        allCourse.value = courses.value?.map((course: coursePacket) => {
            const { cos_code, cos_title, cos_au } = course;

            return new Course(cos_code, cos_title, cos_au);
        }) || [];

    } catch (error) {
        console.error('Error fetching courses: ', error);
    }
    
    
});
</script>

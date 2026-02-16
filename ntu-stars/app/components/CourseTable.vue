<template>
    <div class="hidden md:block w-[90%] mx-auto align-center">
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
    </div>
    <div class="block md:hidden">
        <div 
            v-for="course in allCourse" 
            :key="course.code"
            class="mb-4 border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
        >
            <div class="flex justify-between items-start mb-2">
                <span class="text-lg font-bold text-gray-900">{{ course.code }}</span>
                <span class="text-sm text-gray-500">{{ course.au }} AU</span>
            </div>
            
            <p class="text-gray-700 mb-4">{{ course.title }}</p>
            
            <UButton
                block
                color="primary"
                size="md"
                @click="() => handleEnrol(course.code)"
            >
                Enrol
            </UButton>
        </div>
    </div>
    <EnrolModal v-if="isEnrolModalOpen" :course-code="selectedCourseCode" :course-title="selectedCourseTitle" @confirm="confirmEnrol" @cancel="isEnrolModalOpen = false" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { TableColumn } from '@nuxt/ui';
import type { coursePacket } from '../../../ntu-services/server/resource/courseRest';
import { Course, type ICourse } from '../../../shared/course';

const allCourse = ref<Course[]>([]);
const selectedCourseCode = ref<string>('');
const selectedCourseTitle = ref<string>('');
const isEnrolModalOpen = ref<boolean>(false);
const loading = ref<boolean>(false);

const confirmEnrol = async () => {
    isEnrolModalOpen.value = false;
    loading.value = true;

    try {
        await useFetch('/api/ntu-registrar/enrolment', {
            method: 'POST',     
            body: { 
                courseCode: selectedCourseCode.value, 
                courseTitle: selectedCourseTitle.value 
            }
        });
    } catch (error) {
        console.error('Error enrolling in a course: ', error);
    } finally {
        loading.value = false;
    }
}

const handleEnrol = async (courseCode: string) => {
    isEnrolModalOpen.value = true;
    selectedCourseCode.value = courseCode;
    selectedCourseTitle.value = allCourse.value.find((course) => course.code === courseCode)?.title || '';
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

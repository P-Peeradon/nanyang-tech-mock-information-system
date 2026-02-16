<template>
    <UModal>
        <UCard>
            <template #header>
                <h3>Enrol in {{ courseTitle }}</h3>
            </template>
            <p>Are you sure you want to enrol in ({{ courseCode }}): {{ courseTitle }}?</p>
            <template #footer>
                <div class="flex gap-2 justify-end">
                    <UButton 
                        block
                        color="secondary"
                        size="md"  
                        @click="emits('cancel')"
                    >
                        Cancel
                    </UButton>
                    <UButton 
                        block
                        color="primary"
                        size="md" 
                        @click="emits('confirm')"
                    >
                        Confirm
                    </UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>

<script lang="ts" setup>
const props = defineProps({
    courseCode: {
        type: String,
        required: true
    },
    courseTitle: {
        type: String,
        required: true
    } 
});

const emits = defineEmits(['cancel', 'confirm']);
</script>
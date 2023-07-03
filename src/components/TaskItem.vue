<script setup>
import { inject } from 'vue';
import DeleteIcon from './icons/DeleteIcon.vue';
import EditIcon from './icons/EditIcon.vue';

defineProps({ task: Object});

const deleteTask = inject('deleteTask');
const editingTask = inject('editingTask');
</script>

<template>
    <div class="h-full flex space-x-2">
        <div class="flex justify-between bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl w-full">

            <div class="flex space-x-2">
                <input class="hover:cursor-pointer" type="checkbox" v-model="task.completed">
                <p class="pr-4"> {{ task.label }} </p>
            </div>

            <div class="flex space-x-2">

                <button @click="() => deleteTask(task.id)"> 
                    <DeleteIcon/>
                </button>

                <button @click="() => editingTask(task.id)">
                    <EditIcon/>
                </button>

            </div>
        </div>
    </div>
</template>
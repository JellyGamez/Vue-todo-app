<script setup>
import { inject } from 'vue';
import DeleteIcon from './icons/DeleteIcon.vue';
import EditIcon from './icons/EditIcon.vue';

defineProps({ task: Object });

const deleteTask = inject('deleteTask');
const editingTask = inject('editingTask');
</script>

<template>
    <div class="h-full flex space-x-2">
        <div class="flex flex-wrap justify-between bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl w-full">

            <div class="flex gap-2 ">
                <input class="hover:cursor-pointer accent-green-700" type="checkbox" v-model="task.completed">
                <p class="pr-1"> {{ task.label }} </p>
            </div>

            <div class="flex gap-1">

                <button @click="() => deleteTask(task.id)">
                    <DeleteIcon />
                </button>

                <button @click="() => editingTask(task.id)">
                    <EditIcon />
                </button>

            </div>
        </div>
    </div>
</template>
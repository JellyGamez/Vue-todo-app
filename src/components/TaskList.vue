<script setup>
import TaskItem from './TaskItem.vue';

defineProps({ listLabel: String, tasks: Array})

</script>

<template>
    <div>
        <h1 v-if="tasks.length" class="font-bold text-2xl text-center mb-5"> {{ listLabel }} </h1>
        <ul class="flex flex-col gap-5">
            <li v-for="task in tasks" :key="task.id">
                <TaskItem :task="task"/>
            </li>
        </ul>
    </div>
</template>
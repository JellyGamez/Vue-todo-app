<script setup>
import { computed, ref, provide } from 'vue';
import TaskList from './components/TaskList.vue'

const tasks = ref([
    { label: "Do something", completed: false, id: 1      },
    { label: "Do something else", completed: false, id: 2 },
    { label: "Do this instead", completed: false, id: 3   },
]);
const input = ref();
const idToEdit = ref();


const isEditing = computed(() => idToEdit.value !== undefined);
const filters = computed(() => {
  return {
        todo: tasks.value.filter(task => !task.completed),
        completed: tasks.value.filter(task => task.completed),
      }
})

function addNewTask() {
  if (isEditing.value)
    {
      const task = tasks.value.find(task => task.id === idToEdit.value);
      task.label = input.value;
      idToEdit.value = undefined;
    }
  else
    tasks.value.push({label: input.value, completed: false, id: tasks.value.length + 1});
  input.value = '';
}

function completeTask(taskId) {
  tasks.value.find(task => task.id)
}
function deleteTask(taskId) {
  tasks.value = tasks.value.filter(task => task.id !== taskId);
}
function editingTask(taskId) {
  idToEdit.value = taskId;
  input.value = tasks.value.find(task => task.id === taskId).label;
}

provide('deleteTask', deleteTask);
provide('editingTask', editingTask);

</script>

<template>
  <div class="flex flex-col gap-6 bg-slate-100 border rounded-lg p-4">

    <div class="flex border rounded">
      <input class="w-full px-2" type="text" :placeholder="!isEditing ? 'Add new task' : 'Edit task'" v-model="input">
      <button class="bg-white py-2 px-4 border" @click="addNewTask"> 
        
        <template v-if="isEditing">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
          </svg>
        </template>
        <template v-else="">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
        </template>
      
      </button>
    </div>
    
    <TaskList listLabel="To do tasks" :tasks="filters.todo"/>

    <TaskList listLabel="Completed tasks" :tasks="filters.completed"/>

  </div>
</template>
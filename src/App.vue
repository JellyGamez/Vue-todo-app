<script setup>
import { computed, ref, provide } from 'vue';
import TaskList from './components/TaskList.vue';
import ConfirmEditIcon from './components/icons/ConfirmEditIcon.vue';
import AddIcon from './components/icons/AddIcon.vue';

const tasks = ref([
    { label: "Do something", completed: false, id: 1      },
    { label: "Do something else", completed: false, id: 2 },
    { label: "Do this instead", completed: false, id: 3   },
    { label: "Do this insteaddd", completed: false, id: 4 },
]);
const input = ref('');
const searchInput = ref('');
const idToEdit = ref();

const isEditing = computed(() => idToEdit.value !== undefined);
const filters = computed(() => {
  return {
    todo: tasks.value.filter(task => !task.completed && task.label.includes(searchInput.value.trim())),
    completed: tasks.value.filter(task => task.completed && task.label.includes(searchInput.value.trim())),
  }
})

function addNewTask() {
  if (isEditing.value)
    {
      const task = tasks.value.find(task => task.id === idToEdit.value);
      task.label = input.value;
      idToEdit.value = undefined;
    }
  else if (input.value.trim() !== '')
    tasks.value.push({label: input.value.trim(), completed: false, id: tasks.value.length + 1});
  input.value = '';
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
  <div class="flex flex-col gap-6 bg-gray-600 rounded-xl p-4">

    <div class="flex">
      <input class="w-full px-2 border-b border-white mr-4 bg-gray-600 text-white outline-none" type="text" :placeholder="!isEditing ? 'Add new task' : 'Edit task'" v-model="input">
      <button class="py-2 px-2 rounded-xl bg-gray-500" @click="addNewTask"> 
        
        <template v-if="isEditing">
          <ConfirmEditIcon/>
        </template>

        <template v-else="">
          <AddIcon  />
        </template>
      
      </button>
    </div>

    <div class="flex">
      <input class="w-full px-2 border-b border-white mr-4 bg-gray-600 text-white outline-none" type="text" placeholder="Search task" v-model="searchInput">
      <div class="py-2 px-2 bg-gray-500 rounded-xl"> 
        
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" class="w-5 h-5">
        <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
        </svg>

      </div>
    </div>
    
    <TaskList listLabel="To do tasks" :tasks="filters.todo"/>

    <TaskList listLabel="Completed tasks" :tasks="filters.completed"/>

  </div>
</template>
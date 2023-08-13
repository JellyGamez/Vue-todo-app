<script setup>
import { computed, ref, provide } from 'vue';
import TaskList from './components/TaskList.vue';
import ConfirmEditIcon from './components/icons/ConfirmEditIcon.vue';
import AddIcon from './components/icons/AddIcon.vue';
import SearchIcon from './components/icons/SearchIcon.vue';
const tasks = ref([
  { label: "Throw out the trash", completed: false, id: 1 },
  { label: "Finish the homework", completed: false, id: 2 },
  { label: "Water the flowers", completed: false, id: 3 },
  { label: "Buy groceries", completed: false, id: 4 },
]);
const mainInput = ref('');
const searchInput = ref('');
const idToEdit = ref();

const isEditing = computed(() => idToEdit.value !== undefined);
const filters = computed(() => {
  return {
    todo: tasks.value.filter(task => !task.completed && task.label.toLowerCase().includes(searchInput.value.trim().toLowerCase())),
    completed: tasks.value.filter(task => task.completed && task.label.toLowerCase().includes(searchInput.value.trim().toLowerCase())),
  }
});

function addNewTask() {
  if (isEditing.value && mainInput.value.trim() !== '') {
    const task = tasks.value.find(task => task.id === idToEdit.value);
    task.label = mainInput.value;
    idToEdit.value = undefined;
  }
  else if (mainInput.value.trim() !== '')
    tasks.value.push({ label: mainInput.value.trim(), completed: false, id: tasks.value.length + 1 });
  mainInput.value = '';
};
function deleteTask(taskId) {
  tasks.value = tasks.value.filter(task => task.id !== taskId);
};
function editingTask(taskId) {
  idToEdit.value = taskId;
  mainInput.value = tasks.value.find(task => task.id === taskId).label;
};

provide('deleteTask', deleteTask);
provide('editingTask', editingTask);

</script>

<template>
  <div class="flex flex-col min-h-screen h-full bg-gray-600 items-center">
    <div class="max-w-xs text-sm md:text-base md:max-w-lg  w-full">
      <div class="flex flex-col gap-6 bg-green-600 rounded-xl p-6 my-24 mx-2 h-fit justify-center">

        <div class="flex">
          <input class="w-full px-2 border-b border-white bg-green-600 mr-4 text-white placeholder-white outline-none"
            type="text" :placeholder="!isEditing ? 'Add new task' : 'Edit task'" v-model="mainInput">
          <button class="py-2 px-2 rounded-full bg-green-700" @click="addNewTask">

            <template v-if="isEditing">
              <ConfirmEditIcon />
            </template>

            <template v-else="">
              <AddIcon />
            </template>

          </button>
        </div>

        <div class="flex">
          <input class="w-full px-2 border-b border-white bg-green-600 mr-4 text-white placeholder-white outline-none"
            type="text" placeholder="Search task" v-model="searchInput">
          <div class="py-2 px-2 bg-green-700 rounded-full">
            <SearchIcon />
          </div>
        </div>

        <TaskList listLabel="To do tasks" :tasks="filters.todo" />

        <TaskList listLabel="Completed tasks" :tasks="filters.completed" />

      </div>
    </div>
  </div>
</template>
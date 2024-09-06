<template>
  <div class="mt-8 px-6 py-4 bg-gray-50">
    <h3 class="text-2xl font-semibold mb-4 text-gray-700">Tasks</h3>
    <ul class="space-y-2">
      <li v-for="task in tasks" :key="task.id" :class="{ 'text-green-500': task.completed }">
        <svg
          class="w-5 h-5 inline-block mr-2"
          :class="task.completed ? 'text-green-500' : 'text-gray-500'"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>{{ task.description }}</span>
        <span v-if="task.completed" class="ml-2 text-sm">(Completed!)</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tasks: Array<{ id: number; description: string; completed: boolean; reward: string }>
}>()
</script>

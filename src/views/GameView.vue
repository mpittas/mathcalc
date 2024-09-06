<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="gameData" class="game-view bg-white shadow-xl rounded-lg overflow-hidden">
        <h2 class="text-3xl font-bold mb-8 pb-4 border-b border-gray-200 px-6 pt-6 text-gray-800">
          {{ gameData.title }}
        </h2>

        <!-- Game Component -->
        <div class="px-6 py-4">
          <component
            :is="currentGameComponent"
            :tasks="tasks"
            @task-completed="handleTaskCompletion"
          />
        </div>

        <!-- Tasks Section -->
        <div class="mt-8 px-6 py-4 bg-gray-50">
          <h3 class="text-2xl font-semibold mb-4 text-gray-700">Tasks</h3>
          <ul class="space-y-2">
            <li v-for="task in tasks" :key="task.id" :class="{ 'text-green-500': task.completed }">
              <svg
                class="w-5 h-5 text-gray-500"
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
              <span v-if="task.completed">(Completed!)</span>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="text-center text-2xl text-gray-600 font-bold mt-12">Game not found</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineAsyncComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { GAMES } from '@/constants/games'
import type { Game } from '@/constants/games'

const route = useRoute()
const gameId = computed(() => route.params.id as string)
const gameData = ref<Game | null>(null)

const currentGameComponent = computed(() => {
  if (!gameData.value) return null
  const componentName = gameData.value.id.charAt(0).toUpperCase() + gameData.value.id.slice(1)
  return defineAsyncComponent(() => import(`@/components/games/${componentName}Game.vue`))
})

const tasks = ref([
  { id: 1, description: 'Complete 5 equations', completed: false, reward: 'Great job!' },
  { id: 2, description: 'Achieve a score of 10', completed: false, reward: 'Excellent work!' },
  {
    id: 3,
    description: 'Solve equations within 10 seconds each',
    completed: false,
    reward: "You're lightning fast!"
  }
])

onMounted(() => {
  const foundGame = GAMES.find((g) => g.id === gameId.value)
  gameData.value = foundGame || null
  // Here you would typically fetch tasks and code specific to the game
})

const handleTaskCompletion = (taskId: number) => {
  const task = tasks.value.find((t) => t.id === taskId)
  if (task && !task.completed) {
    task.completed = true
    alert(task.reward) // Or use a more sophisticated notification system
  }
}
</script>

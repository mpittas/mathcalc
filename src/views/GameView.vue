<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="gameData" class="game-view bg-white shadow-xl rounded-lg overflow-hidden">
        <h2 class="text-3xl font-bold mb-8 pb-4 border-b border-gray-200 px-6 pt-6 text-gray-800">
          {{ gameData.title }}
        </h2>

        <!-- Game Component -->
        <div class="px-6 py-4">
          <GenericGame
            :gameData="gameData"
            :gameLogic="gameLogic"
            :numberGenerator="numberGenerator"
            :tasks="tasks"
            @task-completed="handleTaskCompletion"
          />
        </div>

        <!-- Tasks Section -->
        <TaskTracker :tasks="tasks" />
      </div>
      <div v-else class="text-center text-2xl text-gray-600 font-bold mt-12">Game not found</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { GAMES } from '@/constants/games'
import type { Game } from '@/constants/games'
import TaskTracker from '@/components/common/TaskTracker.vue'
import GenericGame from '@/components/common/GenericGame.vue'
import { createGameLogic, createNumberGenerator } from '@/factories/gameFactory'

const route = useRoute()
const gameId = computed(() => route.params.id as string)
const gameData = ref<Game | null>(null)

const gameLogic = computed(() => (gameData.value ? createGameLogic(gameData.value) : () => 0))
const numberGenerator = computed(() =>
  gameData.value ? createNumberGenerator(gameData.value) : () => ({ num1: 0, num2: 0 })
)

const tasks = ref([
  {
    id: 1,
    description: 'Complete 5 equations',
    completed: false,
    reward: 'Great job!'
  },
  {
    id: 2,
    description: 'Achieve a score of 10',
    completed: false,
    reward: 'Excellent work!'
  },
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
})

const handleTaskCompletion = (taskId: number) => {
  const task = tasks.value.find((t) => t.id === taskId)
  if (task) {
    if (!task.completed) {
      task.completed = true
      alert(task.reward) // Or use a more sophisticated notification system
    } else {
      task.completed = false // Reset task when score goes back to 0
    }
  }
}
</script>

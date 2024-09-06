<template>
  <div class="min-h-screen bg-red-50">
    <div class="container mx-auto">
      <div v-if="gameData" class="game-view">
        <h2 class="text-2xl mb-8 pb-4 border-b border-black">{{ gameData.title }}</h2>

        <!-- Game Component -->
        <component :is="currentGameComponent" />

        <!-- Tasks Section -->
        <div class="mt-8">
          <h3 class="text-xl mb-4">Tasks</h3>
          <ul>
            <li v-for="(task, index) in tasks" :key="index" class="mb-2">
              {{ task }}
            </li>
          </ul>
        </div>

        <!-- Code Section -->
        <div class="mt-8">
          <h3 class="text-xl mb-4">Code</h3>
          <pre><code>{{ gameCode }}</code></pre>
        </div>
      </div>
      <div v-else>Game not found</div>
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

// Example tasks (you would need to implement this)
const tasks = ref([
  'Complete 5 equations',
  'Achieve a score of 10',
  'Solve equations within 10 seconds each'
])

// Example game code (you would need to implement this)
const gameCode = ref(`
function playGame() {
  // Game logic here
}
`)

onMounted(() => {
  const foundGame = GAMES.find((g) => g.id === gameId.value)
  gameData.value = foundGame || null
  // Here you would typically fetch tasks and code specific to the game
})
</script>

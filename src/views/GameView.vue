<template>
  <div class="min-h-screen bg-red-50">
    <div class="container mx-auto">
      <template v-if="gameData">
        <div class="game-view">
          <h2 class="text-2xl mb-8 pb-4 border-b border-black">{{ gameData.title }}</h2>
          <component :is="currentGameComponent" />
        </div>
      </template>
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

onMounted(() => {
  const foundGame = GAMES.find((g) => g.id === gameId.value)
  gameData.value = foundGame || null
})
</script>

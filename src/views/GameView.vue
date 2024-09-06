<template>
  <div class="min-h-screen bg-red-50">
    <div class="container mx-auto">
      <div v-if="game" class="game-view">
        <h2 class="text-2xl mb-8 pb-4 border-b border-black">{{ game.title }}</h2>
        <component v-if="currentGameComponent" :is="currentGameComponent" />
      </div>
      <div v-else>Game not found</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { GAMES } from '@/constants/games'
import type { Game } from '@/constants/games'

const route = useRoute()
const gameId = computed(() => route.params.id as string)

const game = ref<Game | undefined>(GAMES.find((g) => g.id === gameId.value))

const currentGameComponent = computed(() => {
  if (!game.value) return null
  return defineAsyncComponent(
    () =>
      import(
        `@/components/games/${game.value.id.charAt(0).toUpperCase() + game.value.id.slice(1)}Game.vue`
      )
  )
})
</script>

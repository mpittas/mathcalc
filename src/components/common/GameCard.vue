<template>
  <div
    class="bg-white rounded-xl shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    @click="navigateToGame"
  >
    <div class="p-6 text-center border-b border-gray-100">
      <div
        class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl font-bold text-white bg-gray-100"
      >
        {{ gameIcon }}
      </div>
      <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ game.title }}</h3>
      <p class="text-sm text-gray-600">{{ game.description }}</p>
    </div>
    <div class="px-6 py-4 flex justify-center">
      <span
        class="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-50"
      >
        Play Now
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import type { Game } from '@/game/games'

const props = defineProps<{
  game: Game
}>()

const router = useRouter()

const navigateToGame = () => {
  router.push({ name: 'game', params: { id: props.game.id } })
}

const gameIcon = computed(() => {
  const icons: { [key: string]: string } = {
    addition: '➕',
    subtraction: '➖',
    multiplication: '✖️',
    division: '➗'
  }
  return icons[props.game.id] || '🧮'
})
</script>

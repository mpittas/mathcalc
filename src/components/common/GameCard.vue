<template>
  <div class="game-card" @click="navigateToGame">
    <img :src="game.thumbnail" :alt="game.title" />
    <h3>{{ game.title }}</h3>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Game } from '@/constants/games'

const props = defineProps<{
  game: Game
}>()

const router = useRouter()

const navigateToGame = () => {
  router.push({ name: 'game', params: { id: props.game.id } })
}
</script>

<style scoped>
.game-card {
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.game-card img {
  max-width: 100%;
  height: auto;
}
</style>

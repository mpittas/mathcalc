<template>
  <div class="home py-12 bg-gray-100">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl mb-6 font-bold text-center">Math Games</h1>
      <div class="games-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <GameCard v-for="game in games" :key="game.id" :game="game" class="rounded-lg bg-white" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GAMES } from '@/constants/games'
import GameCard from '@/components/common/GameCard.vue'
import type { Game } from '@/constants/games'

const games: Game[] = GAMES
</script>

<style scoped></style>

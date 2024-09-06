<template>
  <div class="home py-12 bg-red-50">
    <div class="container mx-auto">
      <h1 class="text-4xl mb-6">Math Games</h1>
      <div class="games-grid grid grid-cols-4 gap-6">
        <GameCard v-for="game in games" :key="game.id" :game="game" />
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

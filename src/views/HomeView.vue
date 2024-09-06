<template>
  <div class="home">
    <h1>Math Games</h1>
    <div class="games-grid">
      <GameCard v-for="game in games" :key="game.id" :game="game" />
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

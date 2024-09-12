<template>
  <div class="home min-h-screen py-12 bg-gradient-to-br from-blue-100 to-purple-100">
    <div class="container mx-auto px-4">
      <h1 class="text-5xl mb-8 font-bold text-center text-gray-800 animate-fade-in-down">
        Math Games Challenge
      </h1>
      <p class="text-xl mb-12 text-center text-gray-600 max-w-2xl mx-auto animate-fade-in-up">
        Sharpen your math skills with our fun and engaging games. Choose a game below to get
        started!
      </p>
      <div class="games-grid grid grid-cols-3 gap-8">
        <div v-for="game in games" :key="game.id" class="grid-item fg">
          <GameCard
            :game="game"
            class="rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GAMES } from '@/game/games'
import GameCard from '@/components/common/GameCard.vue'
import type { Game } from '@/game/games'

const games: Game[] = GAMES
</script>

<style scoped>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.5s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out 0.3s both;
}
</style>

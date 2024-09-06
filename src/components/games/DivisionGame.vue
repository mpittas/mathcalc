<!-- src/components/games/DivisionGame.vue -->
<template>
  <div class="division-game">
    <h3>Division Game</h3>
    <p>{{ num1 }} ÷ {{ num2 }} = ?</p>
    <input v-model="userAnswer" type="number" step="0.01" @keyup.enter="checkAnswer" />
    <button @click="checkAnswer">Submit</button>
    <p v-if="feedback">{{ feedback }}</p>
    <p>Score: {{ score }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const score = ref(0)
const num1 = ref(0)
const num2 = ref(0)
const userAnswer = ref<number | null>(null)
const feedback = ref('')

const correctAnswer = computed(() => num1.value / num2.value)

const generateNumbers = () => {
  num2.value = Math.floor(Math.random() * 10) + 1 // Divisor between 1 and 10
  const quotient = Math.floor(Math.random() * 10) + 1 // Quotient between 1 and 10
  num1.value = num2.value * quotient // Ensures division results in a whole number
}

const checkAnswer = () => {
  if (userAnswer.value === correctAnswer.value) {
    score.value++
    feedback.value = 'Correct!'
  } else {
    feedback.value = `Incorrect. The correct answer was ${correctAnswer.value}.`
  }

  // Generate new numbers
  generateNumbers()
  userAnswer.value = null
}

// Initialize the game
generateNumbers()
</script>

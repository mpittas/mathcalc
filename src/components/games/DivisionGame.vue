<!-- src/components/games/DivisionGame.vue -->
<template>
  <div class="game-container">
    <h3 class="game-title">Division Game</h3>
    <p class="game-equation">{{ num1 }} ÷ {{ num2 }} = ?</p>
    <input
      v-model="userAnswer"
      type="number"
      step="0.01"
      @keyup.enter="checkAnswer"
      class="game-input"
      placeholder="Enter your answer"
    />
    <button @click="checkAnswer" class="game-button">Submit</button>
    <p
      v-if="feedback"
      class="game-feedback"
      :class="{
        'text-green-600': feedback === 'Correct!',
        'text-red-600': feedback !== 'Correct!'
      }"
    >
      {{ feedback }}
    </p>
    <p class="game-score">Score: {{ score }}</p>
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
    feedback.value = `Incorrect. The correct answer was ${correctAnswer.value.toFixed(2)}.`
  }

  // Generate new numbers
  generateNumbers()
  userAnswer.value = null
}

// Initialize the game
generateNumbers()
</script>

<template>
  <div class="game-container">
    <h3 class="game-title">Addition Game</h3>
    <p class="game-equation">{{ num1 }} + {{ num2 }} = ?</p>
    <input v-model="userAnswer" type="number" @keyup.enter="checkAnswer" class="game-input" />
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
const num1 = ref(Math.floor(Math.random() * 10))
const num2 = ref(Math.floor(Math.random() * 10))
const userAnswer = ref<number | null>(null)
const feedback = ref('')

const correctAnswer = computed(() => num1.value + num2.value)

const checkAnswer = () => {
  if (userAnswer.value === correctAnswer.value) {
    score.value++
    feedback.value = 'Correct!'
  } else {
    feedback.value = `Incorrect. The correct answer was ${correctAnswer.value}.`
  }

  // Generate new numbers
  num1.value = Math.floor(Math.random() * 10)
  num2.value = Math.floor(Math.random() * 10)
  userAnswer.value = null
}
</script>

<!-- src/components/games/SubtractionGame.vue -->
<template>
  <div class="subtraction-game">
    <h3>Subtraction Game</h3>
    <p>{{ num1 }} - {{ num2 }} = ?</p>
    <input v-model="userAnswer" type="number" @keyup.enter="checkAnswer" />
    <button @click="checkAnswer">Submit</button>
    <p v-if="feedback">{{ feedback }}</p>
    <p>Score: {{ score }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const score = ref(0)
const num1 = ref(Math.floor(Math.random() * 20) + 10) // Ensures num1 is between 10 and 29
const num2 = ref(Math.floor(Math.random() * num1.value)) // Ensures num2 is less than num1
const userAnswer = ref<number | null>(null)
const feedback = ref('')

const correctAnswer = computed(() => num1.value - num2.value)

const checkAnswer = () => {
  if (userAnswer.value === correctAnswer.value) {
    score.value++
    feedback.value = 'Correct!'
  } else {
    feedback.value = `Incorrect. The correct answer was ${correctAnswer.value}.`
  }

  // Generate new numbers
  num1.value = Math.floor(Math.random() * 20) + 10
  num2.value = Math.floor(Math.random() * num1.value)
  userAnswer.value = null
}
</script>

<template>
  <div class="game-container">
    <h3 class="game-title">Addition Game</h3>
    <p class="game-equation">{{ state.num1 }} + {{ state.num2 }} = ?</p>
    <input
      v-model="state.userAnswer"
      type="number"
      @keyup.enter="handleSubmit"
      class="game-input"
    />
    <button @click="handleSubmit" class="game-button">Submit</button>
    <p
      v-if="state.feedback"
      class="game-feedback"
      :class="{
        'text-green-600': state.feedback === 'Correct!',
        'text-red-600': state.feedback !== 'Correct!'
      }"
    >
      {{ state.feedback }}
    </p>
    <p class="game-score">Score: {{ state.score }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useGame } from '@/utils/useGame'

const props = defineProps<{
  tasks: Array<{ id: number; description: string; completed: boolean; reward: string }>
}>()

const emit = defineEmits<{
  (e: 'task-completed', taskId: number): void
}>()

const { state, checkAnswer } = useGame((a, b) => a + b)

const startTime = ref(Date.now())
const equationsSolved = ref(0)
const fastSolves = ref(0)

const handleSubmit = () => {
  const timeTaken = (Date.now() - startTime.value) / 1000
  const previousScore = state.value.score
  checkAnswer()

  if (state.value.feedback === 'Correct!') {
    equationsSolved.value++

    // Check for task completion
    if (equationsSolved.value === 5) {
      emit('task-completed', 1)
    }
    if (state.value.score === 10) {
      emit('task-completed', 2)
    }
    if (timeTaken <= 10) {
      fastSolves.value++
      if (fastSolves.value === 3 && !props.tasks[2].completed) {
        emit('task-completed', 3)
      }
    } else {
      fastSolves.value = 0
    }
  } else {
    // Reset counts when an incorrect answer is given
    equationsSolved.value = 0
    fastSolves.value = 0
  }

  startTime.value = Date.now() // Reset timer for next equation

  // Check if score was reset due to incorrect answer
  if (previousScore > 0 && state.value.score === 0) {
    resetTasks()
  }
}

// Reset equation solved count and tasks when score is reset to 0
watch(
  () => state.value.score,
  (newScore, oldScore) => {
    if (newScore === 0 && oldScore > 0) {
      equationsSolved.value = 0
      fastSolves.value = 0
      resetTasks()
    }
  }
)

const resetTasks = () => {
  props.tasks.forEach((task) => {
    if (task.completed) {
      emit('task-completed', task.id) // Emit event to reset task in parent
    }
  })
}
</script>

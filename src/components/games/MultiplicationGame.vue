<template>
  <div class="game-container">
    <h3 class="game-title">Multiplication Game</h3>
    <p class="game-equation">{{ state.num1 }} × {{ state.num2 }} = ?</p>
    <input
      v-model="state.userAnswer"
      type="number"
      @keyup.enter="handleSubmit"
      class="game-input"
      placeholder="Enter your answer"
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
import { handleGameLogic, resetTasks } from '@/utils/gameUtils'

const props = defineProps<{
  tasks: Array<{
    id: number
    description: string
    completed: boolean
    reward: string
  }>
}>()

const emit = defineEmits<{
  (e: 'task-completed', taskId: number): void
}>()

const generateMultiplicationProblem = () => {
  const num1 = Math.floor(Math.random() * 12) + 1 // Number between 1 and 12
  const num2 = Math.floor(Math.random() * 12) + 1 // Number between 1 and 12
  return { num1, num2 }
}

const { state, checkAnswer } = useGame((a, b) => a * b, generateMultiplicationProblem)

const startTime = ref(Date.now())
const equationsSolved = ref(0)
const fastSolves = ref(0)

const handleSubmit = () => {
  const timeTaken = (Date.now() - startTime.value) / 1000
  const previousScore = state.value.score
  checkAnswer()

  handleGameLogic(state, equationsSolved, fastSolves, timeTaken, props.tasks, (taskId) =>
    emit('task-completed', taskId)
  )

  startTime.value = Date.now() // Reset timer for next equation

  // Check if score was reset due to incorrect answer
  if (previousScore > 0 && state.value.score === 0) {
    resetTasks(props.tasks, (taskId) => emit('task-completed', taskId))
  }
}

// Reset equation solved count and tasks when score is reset to 0
watch(
  () => state.value.score,
  (newScore, oldScore) => {
    if (newScore === 0 && oldScore > 0) {
      equationsSolved.value = 0
      fastSolves.value = 0
      resetTasks(props.tasks, (taskId) => emit('task-completed', taskId))
    }
  }
)
</script>

<template>
  <div class="game-container">
    <h3 class="game-title">{{ gameData.title }}</h3>
    <div class="difficulty-selector">
      <label for="difficulty">Difficulty:</label>
      <select id="difficulty" v-model="state.difficulty" @change="onDifficultyChange">
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </div>
    <p class="game-equation">{{ state.num1 }} {{ operationSymbol }} {{ state.num2 }} = ?</p>
    <input
      v-model="state.userAnswer"
      type="number"
      step="0.01"
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
import { computed, ref } from 'vue'
import { useGame } from '@/utils/useGame'
import { handleGameLogic } from '@/utils/gameUtils'
import type { Game } from '@/game/games'

const props = defineProps<{
  gameData: Game
  gameLogic: (a: number, b: number) => number
  numberGenerator: (difficulty: string) => { num1: number; num2: number }
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

const { state, checkAnswer, setDifficulty } = useGame(props.gameLogic, props.numberGenerator)

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
    equationsSolved.value = 0
    fastSolves.value = 0
    props.tasks.forEach((task) => {
      if (task.completed) {
        emit('task-completed', task.id)
      }
    })
  }
}

const onDifficultyChange = () => {
  setDifficulty(state.value.difficulty)
}

const operationSymbol = computed(() => {
  switch (props.gameData.id) {
    case 'addition':
      return '+'
    case 'subtraction':
      return '-'
    case 'multiplication':
      return '×'
    case 'division':
      return '÷'
    default:
      return '?'
  }
})
</script>

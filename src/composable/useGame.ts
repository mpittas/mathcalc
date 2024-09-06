import { ref, computed } from 'vue'
import { generateRandomNumber } from '@/utils/mathOperations'

interface GameState {
  score: number
  num1: number
  num2: number
  userAnswer: number | null
  feedback: string
}

export function useGame(operation: (a: number, b: number) => number) {
  const state = ref<GameState>({
    score: 0,
    num1: generateRandomNumber(1, 10),
    num2: generateRandomNumber(1, 10),
    userAnswer: null,
    feedback: ''
  })

  const correctAnswer = computed(() => operation(state.value.num1, state.value.num2))

  const checkAnswer = () => {
    if (state.value.userAnswer === correctAnswer.value) {
      state.value.score++
      state.value.feedback = 'Correct!'
    } else {
      state.value.feedback = `Incorrect. The correct answer was ${correctAnswer.value}.`
    }

    // Generate new numbers
    state.value.num1 = generateRandomNumber(1, 10)
    state.value.num2 = generateRandomNumber(1, 10)
    state.value.userAnswer = null
  }

  return {
    state,
    correctAnswer,
    checkAnswer
  }
}

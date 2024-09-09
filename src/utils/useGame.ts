import { ref, computed } from 'vue'

interface GameState {
  score: number
  num1: number
  num2: number
  userAnswer: number | null
  feedback: string
}

type NumberGenerator = () => { num1: number; num2: number }

export function useGame(
  operation: (a: number, b: number) => number,
  generateNumbers: NumberGenerator = () => ({
    num1: Math.floor(Math.random() * 10) + 1,
    num2: Math.floor(Math.random() * 10) + 1
  })
) {
  const state = ref<GameState>({
    score: 0,
    num1: 0,
    num2: 0,
    userAnswer: null,
    feedback: ''
  })

  const correctAnswer = computed(() =>
    Number(operation(state.value.num1, state.value.num2).toFixed(2))
  )

  const generateNewNumbers = () => {
    const { num1, num2 } = generateNumbers()
    state.value.num1 = num1
    state.value.num2 = num2
  }

  const resetGame = () => {
    state.value.score = 0
    state.value.userAnswer = null
    state.value.feedback = ''
    generateNewNumbers()
  }

  const checkAnswer = () => {
    if (state.value.userAnswer === correctAnswer.value) {
      state.value.score++
      state.value.feedback = 'Correct!'
    } else {
      state.value.score = 0 // Reset score on incorrect answer
      state.value.feedback = `Incorrect. The correct answer was ${correctAnswer.value}.`
    }

    // Generate new numbers
    generateNewNumbers()
    state.value.userAnswer = null
  }

  // Initialize the game
  generateNewNumbers()

  return {
    state,
    correctAnswer,
    checkAnswer,
    resetGame
  }
}

import { ref, computed } from 'vue'

interface GameState {
  score: number
  num1: number
  num2: number
  userAnswer: number | null
  feedback: string
  difficulty: string
}

export function useGame(
  operation: (a: number, b: number) => number,
  generateNumbers: (difficulty: string) => { num1: number; num2: number },
  initialDifficulty: string = 'Medium'
) {
  const state = ref<GameState>({
    score: 0,
    num1: 0,
    num2: 0,
    userAnswer: null,
    feedback: '',
    difficulty: initialDifficulty
  })

  const correctAnswer = computed(() =>
    Number(operation(state.value.num1, state.value.num2).toFixed(2))
  )

  const generateNewNumbers = () => {
    const { num1, num2 } = generateNumbers(state.value.difficulty)
    state.value.num1 = num1
    state.value.num2 = num2
  }

  const resetGame = (difficulty?: string) => {
    state.value.score = 0
    state.value.userAnswer = null
    state.value.feedback = ''
    if (difficulty) {
      state.value.difficulty = difficulty
    }
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

    generateNewNumbers()
    state.value.userAnswer = null
  }

  const setDifficulty = (difficulty: string) => {
    state.value.difficulty = difficulty
    resetGame()
  }

  // Initialize the game
  generateNewNumbers()

  return {
    state,
    correctAnswer,
    checkAnswer,
    resetGame,
    setDifficulty
  }
}

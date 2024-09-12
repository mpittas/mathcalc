import { defineAsyncComponent } from 'vue'
import type { Game } from '@/game/games'

export const createGameComponent = () => {
  return defineAsyncComponent(() => import('@/components/common/GenericGame.vue'))
}

export const createGameLogic = (game: Game) => {
  switch (game.id) {
    case 'addition':
      return (a: number, b: number) => a + b
    case 'subtraction':
      return (a: number, b: number) => a - b
    case 'multiplication':
      return (a: number, b: number) => a * b
    case 'division':
      return (a: number, b: number) => Number((a / b).toFixed(2))
    default:
      throw new Error(`Unsupported game type: ${game.id}`)
  }
}

export const createNumberGenerator = (game: Game) => {
  return (difficulty: string) => {
    switch (game.id) {
      case 'addition':
      case 'subtraction': {
        let min, max
        if (difficulty === 'Easy') {
          min = 1
          max = 20
        } else if (difficulty === 'Medium') {
          min = 21
          max = 50
        } else {
          min = 51
          max = 100
        }
        return {
          num1: Math.floor(Math.random() * (max - min + 1)) + min,
          num2: Math.floor(Math.random() * (max - min + 1)) + min
        }
      }
      case 'multiplication': {
        let min, max
        if (difficulty === 'Easy') {
          min = 2
          max = 10
        } else if (difficulty === 'Medium') {
          min = 11
          max = 15
        } else {
          min = 16
          max = 20
        }
        return {
          num1: Math.floor(Math.random() * (max - min + 1)) + min,
          num2: Math.floor(Math.random() * (max - min + 1)) + min
        }
      }
      case 'division': {
        let minDivisor, maxDivisor, minQuotient, maxQuotient
        if (difficulty === 'Easy') {
          minDivisor = 2
          maxDivisor = 10
          minQuotient = 2
          maxQuotient = 10
        } else if (difficulty === 'Medium') {
          minDivisor = 11
          maxDivisor = 15
          minQuotient = 11
          maxQuotient = 15
        } else {
          minDivisor = 16
          maxDivisor = 20
          minQuotient = 16
          maxQuotient = 20
        }
        const divisor = Math.floor(Math.random() * (maxDivisor - minDivisor + 1)) + minDivisor
        const quotient = Math.floor(Math.random() * (maxQuotient - minQuotient + 1)) + minQuotient
        return {
          num1: divisor * quotient,
          num2: divisor
        }
      }
      default:
        throw new Error(`Unsupported game type: ${game.id}`)
    }
  }
}

export const getOperationSymbol = (gameId: string) => {
  switch (gameId) {
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
}

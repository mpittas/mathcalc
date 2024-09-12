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

export const createNumberGenerator = (game: Game, difficulty: string) => {
  switch (game.id) {
    case 'addition':
    case 'subtraction':
      return () => {
        const max = difficulty === 'Easy' ? 10 : difficulty === 'Medium' ? 20 : 50
        return {
          num1: Math.floor(Math.random() * max) + 1,
          num2: Math.floor(Math.random() * max) + 1
        }
      }
    case 'multiplication':
      return () => {
        const max = difficulty === 'Easy' ? 5 : difficulty === 'Medium' ? 12 : 20
        return {
          num1: Math.floor(Math.random() * max) + 1,
          num2: Math.floor(Math.random() * max) + 1
        }
      }
    case 'division':
      return () => {
        const maxDivisor = difficulty === 'Easy' ? 5 : difficulty === 'Medium' ? 12 : 20
        const maxQuotient = difficulty === 'Easy' ? 5 : difficulty === 'Medium' ? 12 : 15
        const divisor = Math.floor(Math.random() * maxDivisor) + 1
        const quotient = Math.floor(Math.random() * maxQuotient) + 1
        return {
          num1: divisor * quotient,
          num2: divisor
        }
      }
    default:
      throw new Error(`Unsupported game type: ${game.id}`)
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

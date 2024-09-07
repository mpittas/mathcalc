// src/factories/gameFactory.ts

import { defineAsyncComponent } from 'vue'
import type { Game } from '@/constants/games'

export const createGameComponent = (game: Game) => {
  const componentName = game.id.charAt(0).toUpperCase() + game.id.slice(1)
  return defineAsyncComponent(() => import(`@/components/games/${componentName}Game.vue`))
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
      return (a: number, b: number) => a / b
    default:
      throw new Error(`Unsupported game type: ${game.id}`)
  }
}

export const createNumberGenerator = (game: Game) => {
  switch (game.id) {
    case 'addition':
    case 'subtraction':
      return () => ({
        num1: Math.floor(Math.random() * 20) + 1,
        num2: Math.floor(Math.random() * 20) + 1
      })
    case 'multiplication':
      return () => ({
        num1: Math.floor(Math.random() * 12) + 1,
        num2: Math.floor(Math.random() * 12) + 1
      })
    case 'division':
      return () => {
        const divisor = Math.floor(Math.random() * 12) + 1
        const quotient = Math.floor(Math.random() * 12) + 1
        return {
          num1: divisor * quotient,
          num2: divisor
        }
      }
    default:
      throw new Error(`Unsupported game type: ${game.id}`)
  }
}

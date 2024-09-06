import type { Ref } from 'vue'

interface GameState {
  score: number
  feedback: string
}

interface Task {
  id: number
  description: string
  completed: boolean
  reward: string
}

export const handleGameLogic = (
  state: Ref<GameState>,
  equationsSolved: Ref<number>,
  fastSolves: Ref<number>,
  timeTaken: number,
  tasks: Task[],
  emitTaskCompleted: (taskId: number) => void
) => {
  if (state.value.feedback === 'Correct!') {
    equationsSolved.value++

    // Check for task completion
    if (equationsSolved.value === 5) {
      emitTaskCompleted(1)
    }
    if (state.value.score === 10) {
      emitTaskCompleted(2)
    }
    if (timeTaken <= 10) {
      fastSolves.value++
      if (fastSolves.value === 3 && !tasks[2].completed) {
        emitTaskCompleted(3)
      }
    } else {
      fastSolves.value = 0
    }
  } else {
    // Reset counts when an incorrect answer is given
    equationsSolved.value = 0
    fastSolves.value = 0
  }
}

export const resetTasks = (tasks: Task[], emitTaskCompleted: (taskId: number) => void) => {
  tasks.forEach((task) => {
    if (task.completed) {
      emitTaskCompleted(task.id)
    }
  })
}

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

const checkTaskCompletion = (
  equationsSolved: number,
  score: number,
  fastSolves: number,
  tasks: Task[],
  emitTaskCompleted: (taskId: number) => void
) => {
  if (equationsSolved === 5) emitTaskCompleted(1)
  if (score === 10) emitTaskCompleted(2)
  if (fastSolves === 3 && !tasks[2].completed) emitTaskCompleted(3)
}

const updateCounts = (equationsSolved: Ref<number>, fastSolves: Ref<number>, timeTaken: number) => {
  equationsSolved.value++
  if (timeTaken <= 10) {
    fastSolves.value++
  } else {
    fastSolves.value = 0
  }
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
    updateCounts(equationsSolved, fastSolves, timeTaken)
    checkTaskCompletion(
      equationsSolved.value,
      state.value.score,
      fastSolves.value,
      tasks,
      emitTaskCompleted
    )
  } else {
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

<template>
  <BaseGame
    title="Subtraction Game"
    operationSymbol="-"
    :operation="(a, b) => a - b"
    :generateNumbers="
      () => {
        const num1 = Math.floor(Math.random() * 20)
        const num2 = Math.floor(Math.random() * (num1 + 1))
        return { num1, num2 }
      }
    "
    :tasks="tasks"
    @task-completed="handleTaskCompleted"
  />
</template>

<script setup lang="ts">
import BaseGame from '@/components/common/BaseGame.vue'

const props = defineProps<{
  tasks: Array<{
    id: number
    description: string
    completed: boolean
    reward: string
  }>
}>()

// TODO: Remove repeating code in all games
const handleTaskCompleted = (taskId: number) => {
  // Find the task with the given ID and mark it as completed
  const task = props.tasks.find((task) => task.id === taskId)
  if (task) {
    task.completed = true
  }
}
</script>

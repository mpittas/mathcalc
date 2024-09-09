<template>
  <BaseGame
    title="Division Game"
    operationSymbol="÷"
    :operation="(a, b) => Number((a / b).toFixed(2))"
    :generateNumbers="
      () => {
        const divisor = Math.floor(Math.random() * 10) + 1
        const quotient = Math.floor(Math.random() * 10) + 1
        const dividend = divisor * quotient
        return { num1: dividend, num2: divisor }
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

const handleTaskCompleted = (taskId: number) => {
  // Find the task with the given ID and mark it as completed
  const task = props.tasks.find((task) => task.id === taskId)
  if (task) {
    task.completed = true
  }
}
</script>

<template>
  <BaseGame
    title="Addition Game"
    operationSymbol="+"
    :operation="(a, b) => a + b"
    :generateNumbers="() => ({ num1: Math.random() * 10, num2: Math.random() * 10 })"
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

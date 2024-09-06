export interface Game {
  id: string
  title: string
  description: string
}

export const GAMES: Game[] = [
  {
    id: 'addition',
    title: 'Addition',
    description:
      'Master the art of combining numbers! Tackle equations with numbers from 1 to 20 and sharpen your mental math skills.'
  },
  {
    id: 'subtraction',
    title: 'Subtraction',
    description:
      'Dive into the world of differences! Challenge yourself with subtraction problems using numbers up to 20.'
  },
  {
    id: 'multiplication',
    title: 'Multiplication',
    description:
      'Multiply your math prowess! Test your skills with factors from 1 to 12 and race against time to solve problems.'
  },
  {
    id: 'division',
    title: 'Division',
    description:
      'Conquer the art of sharing equally! Divide numbers up to 144 by factors from 1 to 12 and spot patterns in numbers.'
  }
]

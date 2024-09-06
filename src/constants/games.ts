export interface Game {
  id: string
  title: string
  thumbnail: string
}

export const GAMES: Game[] = [
  {
    id: 'addition',
    title: 'Addition',
    thumbnail: '/src/assets/images/game-thumbnails/addition.jpg'
  },
  {
    id: 'subtraction',
    title: 'Subtraction',
    thumbnail: '/src/assets/images/game-thumbnails/subtraction.jpg'
  },
  {
    id: 'multiplication',
    title: 'Multiplication',
    thumbnail: '/src/assets/images/game-thumbnails/multiplication.jpg'
  },
  {
    id: 'division',
    title: 'Division',
    thumbnail: '/src/assets/images/game-thumbnails/division.jpg'
  }
]

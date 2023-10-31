import { randomUUID } from 'crypto'
import fastify from 'fastify'

import fastifyCors from '@fastify/cors'

const cards = [
  'ac',
  '2c',
  '3c',
  '4c',
  '5c',
  '6c',
  '7c',
  '8c',
  '9c',
  '10c',
  'jc',
  'qc',
  'kc',

  'ah',
  '2h',
  '3h',
  '4h',
  '5h',
  '6h',
  '7h',
  '8h',
  '9h',
  '10h',
  'jh',
  'qh',
  'kh',

  'as',
  '2s',
  '3s',
  '4s',
  '5s',
  '6s',
  '7s',
  '8s',
  '9s',
  '10s',
  'js',
  'qs',
  'ks',

  'ad',
  '2d',
  '3d',
  '4d',
  '5d',
  '6d',
  '7d',
  '8d',
  '9d',
  '10d',
  'jd',
  'qd',
  'kd',
]

function shuffle(array: string[]) {
  // Fisher–Yates shuffle

  const newArray = array.map((item) => item)

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }

  return newArray
}

const app = fastify()

app.register(fastifyCors)

app.get('/', (request, reply) => {
  const shuffledCards = shuffle(cards)

  const fired: string[] = []
  const players: Record<string, string[]> = {
    [randomUUID()]: [],
    [randomUUID()]: [],
    [randomUUID()]: [],
    [randomUUID()]: [],
  }
  const table: string[] = []

  for (let i = 2; i > 0; i--) {
    for (const player of Object.keys(players)) {
      players[player].push(shuffledCards.splice(0, 1)[0])
    }
  }

  // Flop
  fired.push(shuffledCards.splice(0, 1)[0])
  table.push(shuffledCards.splice(0, 1)[0])
  table.push(shuffledCards.splice(0, 1)[0])
  table.push(shuffledCards.splice(0, 1)[0])

  // Turn
  fired.push(shuffledCards.splice(0, 1)[0])
  table.push(shuffledCards.splice(0, 1)[0])

  // River
  fired.push(shuffledCards.splice(0, 1)[0])
  table.push(shuffledCards.splice(0, 1)[0])

  return reply.send({ deck: shuffledCards, fired, players, table })
})

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => console.log('Server started on port 3333'))

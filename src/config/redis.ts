import { createClient } from 'redis'

const redisClient = createClient({
  url: `redis://${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${parseInt(process.env.REDIS_PORT as string)}`,
})

;(async () => {
  redisClient.on('connect', () => {
    console.log('Connected to Redis')
  })

  redisClient.on('error', (err) => {
    console.error('Redis connection error:', err)
  })

  // Connect to Redis
  await redisClient.connect()
})()

export default redisClient

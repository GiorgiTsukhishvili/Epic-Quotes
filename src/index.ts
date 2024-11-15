import express from 'express'
import { json, urlencoded } from 'body-parser'
import { guestRouter, userRouter } from './routes/api.routes'
import cors from 'cors'
import { corsOptions } from './config/cors'
import './types/global'

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors(corsOptions))

app.use(json())
app.use(urlencoded({ extended: true }))

app.use(express.static('public'))

app.use('/api/v1', guestRouter)
app.use('/api/v1', userRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

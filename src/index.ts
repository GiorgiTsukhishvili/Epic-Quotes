import express from 'express'
import { json, urlencoded } from 'body-parser'
import { guestRouter, userRouter } from './routes/api.routes'
import cors from 'cors'
import { corsOptions } from './config/cors'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import http from 'http'
import { createWebSocketServer } from './routes/channel.routes'

import './types/global'
import './utils/passport'
import logger from './config/winston'

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

const server = http.createServer(app)

createWebSocketServer(server)

app.use(cors(corsOptions))

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('public'))

app.use('/api/v1', guestRouter)
app.use('/api/v1', userRouter)

server.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`)
})

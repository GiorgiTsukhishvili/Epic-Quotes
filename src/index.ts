import express from 'express'
import { json, urlencoded } from 'body-parser'
import { guestRouter, userRouter } from './routes/api.routes'
import cors from 'cors'
import { corsOptions } from './config/cors'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import http from 'http'

import './types/global'
import './utils/passport'
import {
  broadcastMessageToUser,
  createWebSocketServer,
} from './routes/channel.routes'

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
  console.log(`Server is running on http://localhost:${PORT}`)
})

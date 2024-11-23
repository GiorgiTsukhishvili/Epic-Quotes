import { Request } from 'express'
import WebSocket, { WebSocketServer } from 'ws'
import { verifyToken } from '../utils/jwt.util'
import logger from '../config/winston'
let connections: { ws: WebSocket; userId: number }[] = []

export function createWebSocketServer(server: any) {
  const wss = new WebSocketServer({ server })

  wss.on('connection', (ws: WebSocket, req: Request) => {
    const token = req.headers['authorization']?.split(' ')[1] // Assuming Bearer token

    if (!token) {
      ws.close()
      return
    }

    const decoded = verifyToken(token)

    if (!decoded) {
      ws.close()
      return
    }

    const userId = (decoded as { userId: number }).userId
    logger.info(`User ${userId} connected`)

    // Handle incoming messages from the WebSocket client
    ws.on('message', (message: string) => {
      logger.info(`Received message: ${message}`)
    })

    // Handle connection close
    ws.on('close', () => {
      logger.info(`User ${userId} disconnected`)
      connections = connections.filter((conn) => conn.ws !== ws)
    })

    // Store the connection to send messages later
    connections.push({ ws, userId })

    ws.send('Connection established!')
  })
}

export function broadcastMessageToUser(userId: number, message: string): void {
  const connection = connections.find(
    (connection) => connection.userId === userId
  )

  if (connection) {
    connection.ws.send(message) // Send the message to the matched user
  }
}

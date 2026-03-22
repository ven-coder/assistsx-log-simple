import { create } from 'zustand'
import { io } from 'socket.io-client'

const resolveSocketUrl = () => {
  const envUrl = import.meta.env.VITE_SOCKET_URL?.trim()

  if (envUrl) {
    return envUrl
  }

  const { hostname } = window.location

  if (!hostname || hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'ws://localhost:3000'
  }

  // 在局域网设备访问时，默认跟随当前页面主机 IP 连接到 3000 端口。
  return `ws://${hostname}:3000`
}

const createLogEntry = (event, payload) => ({
  id: `${event}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  event,
  payload,
  createdAt: new Date().toLocaleTimeString(),
})

export const useSocketStore = create((set, get) => ({
  socket: null,
  socketUrl: resolveSocketUrl(),
  status: 'idle',
  socketId: '',
  lastError: '',
  eventLog: [],
  connect() {
    const currentSocket = get().socket

    if (currentSocket?.connected) {
      return
    }

    if (currentSocket) {
      currentSocket.removeAllListeners()
      currentSocket.disconnect()
    }

    const socket = io(get().socketUrl, {
      autoConnect: false,
      transports: ['websocket'],
    })

    socket.on('connect', () => {
      set((state) => ({
        status: 'connected',
        socketId: socket.id,
        lastError: '',
        eventLog: [createLogEntry('connect', { socketId: socket.id }), ...state.eventLog].slice(
          0,
          20,
        ),
      }))
    })

    socket.on('disconnect', (reason) => {
      set((state) => ({
        status: 'disconnected',
        socketId: '',
        eventLog: [createLogEntry('disconnect', { reason }), ...state.eventLog].slice(0, 20),
      }))
    })

    socket.on('connect_error', (error) => {
      set((state) => ({
        status: 'error',
        lastError: error.message,
        eventLog: [createLogEntry('connect_error', { message: error.message }), ...state.eventLog]
          .slice(0, 20),
      }))
    })

    socket.onAny((event, ...args) => {
      set((state) => ({
        eventLog: [createLogEntry(event, args[0] ?? null), ...state.eventLog].slice(0, 20),
      }))
    })

    set({
      socket,
      status: 'connecting',
      socketId: '',
      lastError: '',
    })

    socket.connect()
  },
  disconnect() {
    const socket = get().socket

    if (socket) {
      socket.removeAllListeners()
      socket.disconnect()
    }

    set({
      socket: null,
      status: 'idle',
      socketId: '',
    })
  },
  sendPing() {
    const socket = get().socket

    if (!socket?.connected) {
      return
    }

    const payload = {
      message: 'Ping from React client',
      sentAt: new Date().toISOString(),
    }

    socket.emit('ping', payload)

    set((state) => ({
      eventLog: [createLogEntry('ping:emit', payload), ...state.eventLog].slice(0, 20),
    }))
  },
  clearLog() {
    set({ eventLog: [] })
  },
}))

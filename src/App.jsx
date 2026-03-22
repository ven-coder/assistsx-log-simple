import { useEffect } from 'react'
import './App.css'
import { useSocketStore } from './store/useSocketStore'

function App() {
  const socketUrl = useSocketStore((state) => state.socketUrl)
  const status = useSocketStore((state) => state.status)
  const socketId = useSocketStore((state) => state.socketId)
  const lastError = useSocketStore((state) => state.lastError)
  const eventLog = useSocketStore((state) => state.eventLog)
  const connect = useSocketStore((state) => state.connect)
  const disconnect = useSocketStore((state) => state.disconnect)
  const sendPing = useSocketStore((state) => state.sendPing)
  const clearLog = useSocketStore((state) => state.clearLog)

  useEffect(() => {
    connect()

    return () => {
      disconnect()
    }
  }, [connect, disconnect])

  const isConnected = status === 'connected'

  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">React + Vite + Zustand + Socket.IO</p>
        <h1>Realtime client starter</h1>
        <p className="hero-copy">
          This project is ready for desktop debugging and LAN mobile testing.
        </p>
      </section>

      <section className="panel-grid">
        <article className="panel">
          <div className="panel-header">
            <h2>Connection</h2>
            <span className={`status-badge status-${status}`}>{status}</span>
          </div>

          <dl className="details-list">
            <div>
              <dt>Socket URL</dt>
              <dd>{socketUrl}</dd>
            </div>
            <div>
              <dt>Socket ID</dt>
              <dd>{socketId || 'Not connected yet'}</dd>
            </div>
            <div>
              <dt>Last Error</dt>
              <dd>{lastError || 'No error'}</dd>
            </div>
          </dl>

          <div className="action-row">
            <button type="button" onClick={connect}>
              Connect
            </button>
            <button type="button" onClick={disconnect} className="secondary-button">
              Disconnect
            </button>
            <button
              type="button"
              onClick={sendPing}
              disabled={!isConnected}
              className="secondary-button"
            >
              Emit Ping
            </button>
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <h2>LAN testing</h2>
          </div>

          <ul className="tips-list">
            <li>Vite dev server listens on 0.0.0.0 for phone access on the same network.</li>
            <li>Default local socket target is ws://localhost:3000.</li>
            <li>Set VITE_SOCKET_URL to your computer LAN IP for mobile websocket testing.</li>
          </ul>
        </article>
      </section>

      <section className="panel log-panel">
        <div className="panel-header">
          <h2>Event log</h2>
          <button type="button" onClick={clearLog} className="ghost-button">
            Clear log
          </button>
        </div>

        <div className="log-list">
          {eventLog.length === 0 ? (
            <p className="empty-state">No events yet. Try reconnecting or sending a ping.</p>
          ) : (
            eventLog.map((entry) => (
              <article key={entry.id} className="log-item">
                <div className="log-item-top">
                  <strong>{entry.event}</strong>
                  <span>{entry.createdAt}</span>
                </div>
                <pre>{JSON.stringify(entry.payload, null, 2)}</pre>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  )
}

export default App

import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import FloatingLogExample from './pages/FloatingLogExample.jsx'
import InlineLogExample from './pages/InlineLogExample.jsx'

function App() {
  return (
    <div className="app-root">
      <Routes>
        {/* 部分宿主/浏览器会以 /index.html 打开，避免无匹配白屏 */}
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Home />} />
        <Route path="/examples/floating" element={<FloatingLogExample />} />
        <Route path="/examples/inline" element={<InlineLogExample />} />
      </Routes>
    </div>
  )
}

export default App

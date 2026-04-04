import { Link } from 'react-router-dom'

export default function FloatingLogExample() {
  return (
    <main className="sub-page">
      <Link className="back-link" to="/">
        ← 返回首页
      </Link>
      <h1>浮窗日志示例</h1>
      <p className="sub-page-lead">
        浮窗场景下演示 <strong>assistsx-js</strong>（含节点绑定、监听与上报）。接入步骤与代码将在此补充。
      </p>
    </main>
  )
}

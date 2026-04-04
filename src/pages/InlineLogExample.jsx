import { Link } from 'react-router-dom'

export default function InlineLogExample() {
  return (
    <main className="sub-page">
      <Link className="back-link" to="/">
        ← 返回首页
      </Link>
      <h1>内联日志示例</h1>
      <p className="sub-page-lead">
        普通页面中演示 <strong>assistsx-js</strong>（含节点绑定、监听与上报）。接入步骤与代码将在此补充。
      </p>
    </main>
  )
}

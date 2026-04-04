import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="landing">
      <header className="landing-hero">
        <p className="landing-eyebrow">AssistsX · assistsx-js 日志</p>
        <h1>日志示例项目</h1>
        <p className="landing-lead">
          演示如何集成 <strong>assistsx-js</strong>：添加、监听与上报日志。下方提供浮窗与页面内两种入口。
        </p>
        <div className="landing-purpose">
          <p className="landing-purpose-title">核心价值</p>
          <ol className="landing-points">
            <li>
              <strong>日志与界面节点绑定</strong>：与界面节点一一关联，上报后管理后台可查看对应节点，避免测试说不清页面、日志对不上现场，开发难以定位。
            </li>
            <li>
              在<strong>自动化流程</strong>中按需落日志，回溯步骤与异常。
            </li>
            <li>
              便于<strong>多人上报</strong>、对齐上下文；在<strong>后台</strong>结合节点与日志分析问题。
            </li>
          </ol>
        </div>
      </header>

      <section className="cta-grid" aria-label="示例入口">
        <Link className="cta-card cta-card--floating" to="/examples/floating">
          <div className="cta-body">
            <span className="cta-label">浮窗</span>
            <span className="cta-title">浮窗日志入口</span>
            <span className="cta-hint">浮窗场景下的添加、监听与上报。</span>
          </div>
          <span className="cta-arrow" aria-hidden="true">
            →
          </span>
        </Link>
        <Link className="cta-card cta-card--inline" to="/examples/inline">
          <div className="cta-body">
            <span className="cta-label">页面内</span>
            <span className="cta-title">内联日志示例</span>
            <span className="cta-hint">普通页面内的添加、监听与上报。</span>
          </div>
          <span className="cta-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </section>
    </main>
  )
}

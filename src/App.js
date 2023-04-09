import { lazy, Suspense } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { AuthRoute } from './components/AuthRoute'
import { customHistroy } from './utils'
import 'antd/dist/reset.css'
import './App.scss'
// 导入页面，懒加载
const Layout = lazy(() => import('@/pages/Layout'))
const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Router history={customHistroy}>
      {/* 使用Suspense 包裹所有内容 */}
      <Suspense fallback="loading...">
        <div className="app">
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/home" />} />
            {/* <Route path="/home" component={Layout} /> */}
            <AuthRoute path="/home" component={Layout} />
            <Route path="/login" component={Login} />
            {/* 404 */}
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Suspense>
    </Router>
  )
}

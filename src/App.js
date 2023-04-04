import { Router, Route, Switch, Redirect } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { AuthRoute } from './components/AuthRoute'
import { customHistroy } from './utils'
import 'antd/dist/reset.css'
import './App.scss'
export default function App() {
  return (
    <Router history={customHistroy}>
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
    </Router>
  )
}

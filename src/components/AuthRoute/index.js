import { Route, Redirect } from 'react-router-dom'
import { isTOken } from '@/utils'
//对象形式的剩余参数
export const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        // 判断是否登录
        isTOken() ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location.pathname },
            }}
          />
        )
      }
    />
  )
}

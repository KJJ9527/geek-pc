import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import { ConfigProvider } from 'antd'
import 'dayjs/locale/zh-cn'
import locale from 'antd/locale/zh_CN'
import './index.scss'
const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
  </Provider>
)

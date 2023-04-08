import {
  HomeOutlined,
  EditOutlined,
  SendOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import { Layout, Menu, theme, message, Popconfirm, Button } from 'antd'
import React from 'react'
import { Route, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo, logout } from '@/store/actions'
import Home from '../Home'
import Article from '../Article'
import Publish from '../Publish'
import styles from './index.module.scss'
import { useEffect } from 'react'
const { Header, Content, Sider } = Layout
const items = [
  { icon: HomeOutlined, label: '数据概览', id: '/home' },
  { icon: EditOutlined, label: '内容管理', id: '/home/article' },
  { icon: SendOutlined, label: '发布文章', id: '/home/publish' },
].map((item) => {
  return {
    key: item.id,
    icon: React.createElement(item.icon),
    label: item.label,
  }
})
export default function GeekLayout() {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  // 对 /home/publish/id url 地址进行特殊处理
  const menuSelectedKey = location.pathname.startsWith('/home/publish')
    ? '/home/publish'
    : location.pathname
  // 分发状态
  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])
  // 拿到状态
  const { name } = useSelector((state) => state.user)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  // 退出
  const confirm = () => {
    dispatch(logout())
    message.info('退出成功！')
    history.push('/login')
  }
  return (
    <Layout className={styles.root} hasSider>
      <Sider
        className="sider"
        style={{
          position: 'fixed',
          left: 0,
          height: '100%',
          zIndex: 2,
        }}
      >
        <div className="logo">
          <h2>极客园</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          // 注意：defaultSelectedKeys属性，只会在组件第一次渲染时生效
          // 但是，当location.pathname改变时，那么，虽然location.pathname值变了
          // 但是，defaultSelectedKeys不再生效，因此，菜单高亮就有问题了
          // defaultSelectedKeys={[location.pathname]}
          selectedKeys={[menuSelectedKey]}
          items={items}
          onClick={(e) => {
            history.push(e.key)
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            position: 'fixed',
            top: 0,
            zIndex: 1,
            width: '100%',
            background: colorBgContainer,
            borderBottom: '1px solid #ddd',
          }}
        >
          <div className="headerContent">
            <span className="username">欢迎:{name}</span>
            <Popconfirm
              placement="bottom"
              title="确定要退出吗？"
              onConfirm={confirm}
              okText="确定"
              cancelText="取消"
            >
              <Button className="closebtn">
                退出
                <CloseCircleOutlined />
              </Button>
            </Popconfirm>
          </div>
        </Header>
        <Content>
          <div className="content">
            <Route exact path="/home" component={Home} />
            <Route path="/home/article" component={Article} />
            {/* 
              /home/publish/:id 其中 :id 表示路由参数
              /home/publish/:id 其中 ? 表示路由参数是可选的
              这个路由可以匹配以下格式的 url地址:
              /home/publish
              /home/publish/123
              /home/publish/abc
            */}
            <Route path="/home/publish/:id?" component={Publish} />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

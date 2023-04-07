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
const { Header, Content, Footer, Sider } = Layout

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
          defaultSelectedKeys={[location.pathname]}
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
            borderBottom:'1px solid #ddd',
          }}
        >
          <div className="content">
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
          <div
            style={{
              padding: 24,
              paddingLeft: 200,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Route exact path="/home" component={Home} />
            <Route path="/home/article" component={Article} />
            <Route path="/home/publish" component={Publish} />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

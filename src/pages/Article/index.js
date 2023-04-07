import {
  Card,
  Breadcrumb,
  Radio,
  Select,
  DatePicker,
  Space,
  Button,
  Table,
  Tag,
} from 'antd'
import 'dayjs/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import img404 from '@/assets/eroor.png'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannels, getArticles } from '@/store/actions'
// 优化文章状态的处理
const ArticleStatus = {
  0: { color: 'yellow', text: '草稿' },
  1: { color: '#ccc', text: '待审核' },
  2: { color: 'green', text: '审核通过' },
  3: { color: 'red', text: '审核失败' },
}
export default function Article() {
  const dispatch = useDispatch()
  const { channels, page, pageSize, list, total } = useSelector(
    (state) => state.article
  )
  const [value, setValue] = useState(-1)
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      render: (cover) => {
        return <img src={cover ?? img404} width={200} height={150} alt="" />
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status) => {
        const tagData = ArticleStatus[status]
        return <Tag color={tagData.color}>{tagData.text}</Tag>
      },
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render: (_, record) => (
        <Space size="middle">
          <a>编辑 {record.name}</a>
          <a>删除</a>
        </Space>
      ),
    },
  ]
  const { RangePicker } = DatePicker
  useEffect(() => {
    dispatch(getChannels())
    dispatch(getArticles({}))
  }, [dispatch])
  const radioOnChange = (e) => {
    setValue(e.target.value)
  }
  const selectOnChange = (value) => {
    console.log(`selected ${value}`)
  }
  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb
            items={[
              {
                title: <Link to="/home">首页</Link>,
              },
              {
                title: <Link to="/home/article">内容管理</Link>,
              },
            ]}
          />
        }
      >
        <div className="filter">
          <div className="radio">
            <span>状态：</span>
            <Radio.Group onChange={radioOnChange} value={value}>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
              <Radio value={4}>已删除</Radio>
            </Radio.Group>
          </div>
          <div className="select">
            <span>频道：</span>
            <Select
              style={{
                width: 160,
              }}
              placeholder="请选择文章频道"
              onChange={selectOnChange}
            >
              {channels.map((items) => (
                <Select.Option key={items.id} value={items.name}>
                  {items.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="date">
            <span>日期：</span>
            <Space size={12}>
              <RangePicker locale={locale} />
            </Space>
          </div>
          <Button className="filterBtn" type="primary" block="false">
            筛选
          </Button>
        </div>
      </Card>
      <Card className="table" title={`根据筛选条件共查询到${total}条数据`}>
        <Table columns={columns} dataSource={list} rowKey="id" />
      </Card>
    </div>
  )
}

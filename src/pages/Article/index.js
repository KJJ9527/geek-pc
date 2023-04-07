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
  Form,
} from 'antd'
import 'dayjs/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
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
  // 筛选数据
  const onSearch = (values) => {
    const { channel_id, date, status } = values
    const params = {}
    if (status !== -1) {
      params.status = status
    }
    if (date !== undefined && date !== null) {
      params.begin_pubdate = date[0].format('YYYY-MM-DD HH:mm:ss')
      params.end_pubdate = date[1].format('YYYY-MM-DD HH:mm:ss')
    }
    if (channel_id !== undefined) {
      params.channel_id = channel_id
    }
    dispatch(getArticles(params))
  }
  const changePage = (page, pageSize) => {
    const params = {}
    params.page = page
    params.per_page = pageSize
    dispatch(getArticles(params))
  }
  return (
    <div className={styles.root}>
      <Card
        style={{
          paddingTop: '40px',
        }}
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
        <Form
          className="filter"
          initialValues={{ status: -1 }}
          onFinish={onSearch}
        >
          <Form.Item label="状态：" name="status" className="radio">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
              <Radio value={4}>已删除</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道：" name="channel_id" className="select">
            <Select
              style={{
                width: 160,
              }}
              placeholder="请选择文章频道"
            >
              {channels.map((items) => (
                <Select.Option key={items.id} value={items.id}>
                  {items.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="日期：" name="date" className="date">
            <RangePicker locale={locale} />
          </Form.Item>
          <Form.Item>
            <Button
              className="filterBtn"
              type="primary"
              block="false"
              htmlType="submit"
            >
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card className="table" title={`根据筛选条件共查询到${total}条数据`}>
        <Table
          columns={columns}
          dataSource={list}
          rowKey="id"
          pagination={{
            position: ['bottomCenter'],
            current: page,
            pageSize,
            total,
            onChange: changePage,
          }}
        />
      </Card>
    </div>
  )
}

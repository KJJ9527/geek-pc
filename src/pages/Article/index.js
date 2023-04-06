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
export default function Article() {
  const [value, setValue] = useState(0)
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      render: (cover) => {
        return <img src={cover || img404} width={200} height={150} alt="" />
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (_, { tag }) => {
        return (
          <>
            <Tag key={tag}>{tag}</Tag>
          </>
        )
      },
    },
    {
      title: '发布时间',
      dataIndex: 'pubTime',
    },
    {
      title: '阅读数',
      dataIndex: 'read',
    },
    {
      title: '评论数',
      dataIndex: 'comment',
    },
    {
      title: '点赞数',
      dataIndex: 'agree',
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
  const data = [
    {
      id: '8547',
      cover: 'http://geek.itheima.net/resources/images/10.jpg',
      title: '我是标题',
      tag: '审核通过',
      pubTime: '2023/04/06',
      read: 200,
      comment: 100,
      agree: 50,
    },
  ]

  const { RangePicker } = DatePicker
  const radioOnChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }
  const selectOnChange = (value) => {
    console.log(`selected ${value}`)
  }
  const selectOnSearch = (value) => {
    console.log('search:', value)
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
              <Radio value={0}>全部</Radio>
              <Radio value={1}>草稿</Radio>
              <Radio value={2}>待审核</Radio>
              <Radio value={3}>审核通过</Radio>
              <Radio value={4}>审核失败</Radio>
              <Radio value={5}>已删除</Radio>
            </Radio.Group>
          </div>
          <div className="select">
            <span>频道：</span>
            <Select
              showSearch
              style={{
                width: 160,
              }}
              placeholder="请选择文章频道"
              optionFilterProp="children"
              onChange={selectOnChange}
              onSearch={selectOnSearch}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: 'jack',
                  label: 'Jack',
                },
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
                {
                  value: 'tom',
                  label: 'Tom',
                },
              ]}
            />
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
      <Card className="table" title="根据筛选条件共查询到5027条数据">
        <Table columns={columns} dataSource={data} rowKey="id" />
      </Card>
    </div>
  )
}

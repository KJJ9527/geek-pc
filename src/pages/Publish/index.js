import {
  Card,
  Breadcrumb,
  Form,
  Input,
  Button,
  Radio,
  Upload,
  message,
  Select,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styles from './index.module.scss'
const props = {
  beforeUpload: (file) => {
    const isPNG = file.type === 'image/png'
    if (!isPNG) {
      message.error(`${file.name} 不是图片文件格式`)
    }
    return isPNG || Upload.LIST_IGNORE
  },
  onChange: (info) => {
    console.log(info.fileList)
  },
}
export default function Publish() {
  return (
    <Card
      className={styles.root}
      title={
        <Breadcrumb
          items={[
            {
              title: <Link to="/home">首页</Link>,
            },
            {
              title: <Link to="/home/publish">内容管理</Link>,
            },
          ]}
        />
      }
      style={{
        width: '100%',
      }}
    >
      <Form
        labelCol={{ span: 4 }}
        initialValues={{ type: 1, content: '' }}
      >
        <Form.Item
          name="title"
          label="标题"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="请输入文章标题" style={{ width: '400px' }} />
        </Form.Item>
        <Form.Item
          name="note"
          label="频道"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            style={{
              width: 120,
            }}
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
                value: 'Yiminghe',
                label: 'yiminghe',
              },
            ]}
            placeholder="请选择文章频道"
          />
        </Form.Item>
        <Form.Item
          label="封面"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Form.Item name="type">
            <Radio.Group>
              <Radio value={1}>单图</Radio>
              <Radio value={3}>三图</Radio>
              <Radio value={0}>无图</Radio>
            </Radio.Group>
          </Form.Item>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>上传图片</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="内容"
          name="content"
          rules={[
            {
              required: true,
              message: '请输入文章内容',
            },
          ]}
        >
          <ReactQuill
            className="publish-quill"
            theme="snow"
            placeholder="请输入文章内容"
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 4,
          }}
        >
          <Button type="primary" htmlType="submit">
            发布文章
          </Button>
          <Button>存入草稿</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

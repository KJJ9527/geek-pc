import { Card, Breadcrumb, Form, Input, Button, Radio, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styles from './index.module.scss'
import { Channels } from '@/components/Channels'
import { useState, useRef } from 'react'

export default function Publish() {
  // fileList 用来表示已上传的文件列表(图片列表数据)
  // 可以上传多张图片，所以它的值是一个数组
  const [fileList, setFileList] = useState([])
  // 设置上传最大图片数量
  const [maxImgCount, setMaxImgCount] = useState(1)
  // useRef保存更新状态的图片数量
  const imgRef = useRef([])
  // 上传文件改变时的回调
  const onUploadChange = (data) => {
    const newFileList = data.fileList.map((file) => {
      if (file.response) {
        return {
          url: file.response.data.url,
        }
      } else {
        return file
      }
    })
    imgRef.current = newFileList
    setFileList(newFileList)
  }
  // 单选的回调
  const onImgCountChange = (e) => {
    const count = e.target.value
    if (count === 1) {
      // 更新图片数组状态
      const newFileList = imgRef.current[0] ? [imgRef.current[0]] : []
      setFileList(newFileList)
    }
    if (count === 3) {
      // 更新图片数组状态
      setFileList(imgRef.current)
    }
    // 更新数量状态
    setMaxImgCount(count)
  }
  // 表单提交
  const onFinish = ({ type, ...values }) => {
    // 对数据进行处理
    const data = {
      ...values,
      cover: {
        type,
        images: fileList.map((item) => item.url),
      },
    }
    console.log(data)
  }
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
        onFinish={(values) => onFinish(values)}
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
          name="channel_id"
          label="频道"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Channels width={400} />
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
            <Radio.Group onChange={onImgCountChange}>
              <Radio value={1}>单图</Radio>
              <Radio value={3}>三图</Radio>
              <Radio value={0}>无图</Radio>
            </Radio.Group>
          </Form.Item>
          <>
            {maxImgCount !== 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                maxCount={maxImgCount}
                // 多选
                multiple={maxImgCount === 3}
                // 已经上传的文件列表，设置该属性后组件变为受控
                fileList={fileList}
                // 上传文件改变时的回调
                onChange={(e) => onUploadChange(e)}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </>
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

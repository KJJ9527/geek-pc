import {
  Card,
  Breadcrumb,
  Form,
  Input,
  Button,
  Radio,
  Upload,
  message,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styles from './index.module.scss'
import { Channels } from '@/components/Channels'
import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateArticles, getArticleById } from '@/store/actions'
import { useHistory } from 'react-router-dom'
export default function Publish() {
  // 创建form实例
  const [form] = Form.useForm()

  const dispatch = useDispatch()
  const history = useHistory()
  // fileList 用来表示已上传的文件列表(图片列表数据)
  // 可以上传多张图片，所以它的值是一个数组
  const [fileList, setFileList] = useState([])
  // 设置上传最大图片数量
  const [maxImgCount, setMaxImgCount] = useState(1)
  // useRef保存更新状态的图片数量
  const imgRef = useRef([])
  // 路由id
  const { id: articleId } = useParams()
  // 是否是编辑文章
  const isEdit = Boolean(articleId)

  // 是否是编辑进来页面
  useEffect(() => {
    const loadData = async () => {
      if (!isEdit) return
      const detail = await dispatch(getArticleById(articleId))
      const {
        channel_id,
        content,
        title,
        cover: { type, images },
      } = detail
      // 将数据回显到 Form表单中
      form.setFieldsValue({
        channel_id,
        content,
        title,
        type,
      })
      const newFileList = images.map((item) => {
        return { url: item }
      })

      // 设置图片回显
      setFileList(newFileList)
      // 设置最大上传数量
      setMaxImgCount(type)
      // 将图片数据存储到 ref
      imgRef.current = newFileList
    }
    loadData()
  }, [dispatch, isEdit, articleId, form])

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

  // 发布或草稿的函数
  const saveArticles = async (values, sucMsg, errMsg, isDraft) => {
    if (values.type !== fileList.length) {
      return message.warning('封面数量与所选类型不匹配！', 1.5)
    }
    const { type, ...restValues } = values
    // 对数据进行处理,拿到图片url
    const data = {
      ...restValues,
      cover: {
        type,
        images: fileList.map((item) => item.url),
      },
    }
    // 编辑时添加id选项
    if (isEdit) {
      data.id = articleId
    }
    try {
      await dispatch(updateArticles(data, isDraft, isEdit))
      message.success(sucMsg, 1, () => {
        history.push('/home/article')
      })
    } catch (e) {
      console.dir(errMsg, e)
    }
  }

  // 表单提交 -发布文章或编辑文章
  const onFinish = async (values) => {
    await saveArticles(
      values,
      isEdit ? '编辑成功 !' : '发表成功！',
      isEdit ? '编辑失败 !' : '发表失败！',
      false
    )
  }
  // 存入草稿 -发布时存入草稿和编辑时存入草稿
  const saveDraft = async () => {
    const values = await form.validateFields()
    await saveArticles(values, '存入草稿成功！', '存入草稿失败！', true)
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
              title: isEdit ? '编辑文章' : '发表文章',
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
        // Form表单的 initialValues 仅仅是用来设置默认值，无法动态设置表单中的数据
        initialValues={{ type: 1, content: '' }}
        form={form}
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
            {isEdit ? '编辑文章' : '发表文章'}
          </Button>
          <Button onClick={saveDraft}>存入草稿</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

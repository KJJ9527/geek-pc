import { Card, Input, Button, Checkbox, Form } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import './index.scss'
export default function Login() {
  return (
    <div className="login">
      <Card className="login-wrapper" title="极客园" bordered={false}>
        <Form size="large" validateTrigger={['onBlur', 'onChange']}>
          <Form.Item
            name="mobile"
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码格式有误',
                validateTrigger: 'onBlur',
              },
              {
                required: true,
                message: '请输入手机号',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入手机号"
              maxLength={11}
            />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                len: 6,
                message: '验证码6个字符',
                validateTrigger: 'onBlur',
              },
              {
                required: true,
                message: '请输入验证码',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="请输入验证码"
              maxLength={6}
            />
          </Form.Item>
          <Form.Item valuePropName="checked">
            <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block={true}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

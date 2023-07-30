import { Card, Input, Button, Checkbox, Form, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { login } from "@/store/actions";
import styles from "./index.module.scss";
import { useState } from "react";
export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [checked, setChecked] = useState(false);
  const onChange = (e) => {
    setChecked(e.target.checked);
  };
  const onFinish = async (values) => {
    if (!checked) {
      return message.warning("请先确定用户协议和隐私条款", 1);
    }
    try {
      await dispatch(login({ mobile: values.mobile, code: values.code }));
      message.success("登录成功！", 1.5, () => {
        history.replace(location?.state?.from ?? "/home");
      });
    } catch (e) {
      message.warning(
        e.response
          ? e.response?.data?.message ?? "出错了~"
          : "网络繁忙，请稍后再试",
        1.5
      );
    }
  };
  return (
    <div className={styles.root}>
      <Card className="login-wrapper" title="极客园222" bordered={false}>
        <Form
          size="large"
          validateTrigger={["onBlur", "onChange"]}
          onFinish={onFinish}
        >
          <Form.Item
            name="mobile"
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "手机号码格式有误",
                validateTrigger: "onBlur",
              },
              {
                required: true,
                message: "请输入手机号",
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
                message: "验证码6个字符",
                validateTrigger: "onBlur",
              },
              {
                required: true,
                message: "请输入验证码",
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
            <Checkbox onChange={onChange}>
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block={true}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

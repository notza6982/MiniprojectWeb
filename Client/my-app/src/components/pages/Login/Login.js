import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Card, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

function Login() {
  const [isLoginFail, setisLoginFail] = useState({ status: "", word: "" });
  const onFinish = async (values) => {
    console.log(values);
    console.log("User:", values.User);
    console.log("Password:", values.Password);
    if (values.User == "Admin" && values.Password == "12345678") {
        Loginfinish(values);
    } else {
      console.log("login fail");
      setisLoginFail({ status: "error", word: "invalid id or password" });
    }
  };
  const Loginfinish = (values) => {
    if(values.remember==true){
      localStorage.setItem('userdata',values.User);
      localStorage.setItem('isLogin', 'true')
    }
    else{
      sessionStorage.setItem('userdata', values.User);
      localStorage.setItem('isLogin', 'false')
    }
      console.log(values)
      window.location.replace("/")
  }

  //   const onFinishFailed = (errorInfo) => {
  //     console.log("Failed:", errorInfo);
  //   };

  return (
    <div style={{ backgroundColor: "gray" }}>
      <Row
        justify="center"
        align="middle"
        style={{ height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.25)" }}
      >
        <Col span={8}>
          <Card
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              textAlign: "center",
              borderRadius: 25,
            }}
          >
            <div style={{ fontSize: 25, color: "orange", textAlign: "center" }}>
              เข้าสู่ระบบ
            </div>
            <br />
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="User"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
                validateStatus={isLoginFail.status}
              >
                <Input
                  style={{ padding: 10, borderRadius: 25 }}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                hasFeedback
                name="Password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                validateStatus={isLoginFail.status}
                help={isLoginFail.word}
              >
                <Input
                  style={{ padding: 10, borderRadius: 25 }}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <button className="myButton" htmlType="submit">
                  Log in
                </button>
                {/* Or <a href="">register now!</a> */}
              </Form.Item>
            </Form>
            <div style={{ textAlign: "left" }}>
              {/* {Logintype=="Login ด้วย adAccount"?<Button type="danger" style={{fontSize:20,height:"auto"}} onClick={() => setLogintype("Login ด้วย CSM")}>CSM</Button>
             :<Button type="primary" style={{fontSize:20,height:"auto"}} onClick={() => setLogintype("Login ด้วย adAccount")}>adAccount</Button>
            } */}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Login;

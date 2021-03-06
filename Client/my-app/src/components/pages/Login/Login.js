import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Card, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from 'axios';
import { Link } from "react-router-dom";

var Crypto = require('crypto-js')

function Login() {
  const [isLoginFail, setisLoginFail] = useState({ status: "", word: "" });
  const onFinish = async (values) => {
    let body = { username: values.User, pwd: Crypto.SHA256(values.Password).toString() };
    let message = ""
    await axios.get("/verify", { params: { body } })
      .then(response => {
        message = response.data
      })
    if (message != "404") {
      Loginfinish(values, message);
    } else {
      console.log("login fail");
      setisLoginFail({ status: "error", word: "invalid id or password" });
    }


  };
  const Loginfinish = (values, message) => {
    if (values.remember == true) {
      localStorage.setItem('userdata', values.User);
      localStorage.setItem('uid', message[0]);
      localStorage.setItem('path', message[1]);
      localStorage.setItem('role', message[2]);
      localStorage.setItem('isLogin', 'true')
    }
    else {
      sessionStorage.setItem('userdata', values.User);
      sessionStorage.setItem('uid', message[0]);
      sessionStorage.setItem('path', message[1]);
      sessionStorage.setItem('role', message[2]);
      localStorage.setItem('isLogin', 'false')
    }
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
              ?????????????????????????????????
            </div>
            <br />
            <Form
              name="normal_login"
              className="login-form"
              action="/verify" enctype="multipart/form-data" method="POST"
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
                  pattern="^[A-Za-z0-9]{5,}$"
                  title="Start with A-Z or a-z"
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
                  pattern="^[A-Za-z0-9]{8,}$"
                  title="Eight or more characters"
                />
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="/GlassesShop/reset">
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
            <div style={{ textAlign: "center" }}>
              <span>????????????????????????????????????????????????????????? Glass Shop ????????????  </span>
              <Button shape="round"><Link to="/GlassesShop/Register">?????????????????????????????????</Link></Button>
              {/* {Logintype=="Login ???????????? adAccount"?<Button type="danger" style={{fontSize:20,height:"auto"}} onClick={() => setLogintype("Login ???????????? CSM")}>CSM</Button>
             :<Button type="primar
             y" style={{fontSize:20,height:"auto"}} onClick={() => setLogintype("Login ???????????? adAccount")}>adAccount</Button>
            } */}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Login;

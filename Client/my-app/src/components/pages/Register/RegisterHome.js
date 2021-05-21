import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Card, Checkbox, Divider, notification, message,Radio } from "antd";
import axios from 'axios';
var Crypto = require('crypto-js')
const { TextArea } = Input;

function RegisterHome() {

    useEffect(() => {
    }, [])

    const onFinish = async (values) => {

        if (values.Password == values.RetypePassword) {

            let body = {
                username: values.Username,
                pwd: Crypto.SHA256(values.Password).toString(),
                firstname: values.Firstname,
                lastname: values.Lastname,
                email: values.Email,
                phone: values.Phone,
                address: values.Address,
                dob: values.Birthday,
                sex: values.gender,
            };
            let message = ""
            await axios.get('/insert_userinfo/', { params: { body } })
                .then(response => {
                    message = response.data
                    console.log("response: ", response)

                })
                .catch(err => console.log(err));
            if (message == "Success"){
                window.location.replace("Login")
            }
            else{
                return notification["error"]({
                    message: 'Username unavailable',
                });
            }
                
        }
        else {
            return notification["error"]({
                message: 'Password ไม่ตรงกับ Retype Password',
            });
        }
    };
    return (
        <div style={{ width: "100%" }}>
            <Card style={{
                textAlign: "center",
                color: "rgba(0, 0, 0, 0.85)",
                fontSize: 14,
                backgroundColor: "#f0f2f5",
                borderRadius: 20,
                width: "50%",
                marginLeft: "25%"
            }}>
                <span style={{ fontSize: 20 }}>
                    สมัครสมาชิก
            </span>
                <Divider />
                <Form
                    name="normal_login"
                    action="/insert_userinfo" enctype="multipart/form-data" method="POST"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    labelCol={{ md: { span: 24 }, lg: { span: 8 }, xl: { span: 6 } }}
                >
                    <Form.Item
                        name="Username"
                        label={<span style={{ fontSize: 14 }}>Username</span>}
                        rules={[
                            { required: true, message: "Please input your Username!" },
                        ]}
                    >
                        <Input
                            style={{ padding: 10, borderRadius: 25 }}
                            placeholder="Username"
                            pattern="^[A-Za-z0-9]{6,}$"
                            title="Six or more characters. Contains with A-Z or a-z"
                        />
                    </Form.Item>

                    <Form.Item
                        name="Password"
                        label={<span style={{ fontSize: 14 }}>Password</span>}
                        rules={[
                            { required: true, message: "Please input your Password!" },
                        ]}
                    >
                        <Input
                            style={{ padding: 10, borderRadius: 25 }}
                            type="password"
                            placeholder="Password"
                            pattern="^[A-Za-z0-9]{8,}$"
                            title="Eight or more characters. Contains with A-Z ,a-z or 0-9"
                        />
                    </Form.Item>

                    <Form.Item
                        name="RetypePassword"
                        label={<span style={{ fontSize: 14 }}>Retype Password</span>}
                        rules={[
                            { required: true, message: "Please input your Password!" },
                        ]}
                    >
                        <Input
                            style={{ padding: 10, borderRadius: 25 }}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>


                    <Form.Item
                        name="Firstname"
                        label={<span style={{ fontSize: 14 }}>Firstname</span>}
                        rules={[
                            { required: true, message: "Please input your Firstname!" },
                        ]}
                    >
                        <Input
                            style={{ padding: 10, borderRadius: 25 }}
                            pattern="^[A-Za-zก-๏]{3,}$"
                            placeholder="Firstname"
                            title="English and Thai only "
                        />
                    </Form.Item>

                    <Form.Item
                        name="Lastname"
                        label={<span style={{ fontSize: 14 }}>Lastname</span>}
                        rules={[
                            { required: true, message: "Please input your Lastname!" },
                        ]}
                    >
                        <Input
                            style={{ padding: 10, borderRadius: 25 }}
                            pattern="^[A-Za-zก-๏]{3,}$"
                            placeholder="Lastname"
                            title="English and Thai only"
                        />
                    </Form.Item>
                    <Form.Item
                        name="Birthday"
                        label={<span style={{ fontSize: 14 }}>Birthday</span>}
                        rules={[
                            { required: true, message: "Please select your Birthday" },
                        ]}
                    >
                        <Input
                            type="date"
                            style={{ padding: 10, borderRadius: 25 }}
                            placeholder="Birthday"
                        />
                    </Form.Item>
                    <Form.Item
                        style={{ fontSize: 14, textAlign: 'left' }}
                        name="gender"
                        label={<span style={{ fontSize: 14 }}>Gender</span>}
                        rules={[
                            { required: true, message: "Please input your E-Gender!" },
                        ]}
                    > 
                    <Radio.Group  style={{marginLeft:"2%"}}>
                    <Radio id="male" value={"male"}>male</Radio >
                    <Radio id="female" value={"female"}>female</Radio >
                </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="Email"
                        label={<span style={{ fontSize: 14 }}>E-mail</span>}
                        rules={[
                            { required: true, message: "Please input your E-mail!" },
                        ]}
                    >
                        <Input
                            style={{ padding: 10, borderRadius: 25 }}
                            pattern="^[a-zA-Z0-9\.]{1,}@[a-zA-Z\.]{1,}.[a-zA-Z0-9]{1,4}$"
                            placeholder="E-mail"
                        />
                    </Form.Item>

                    <Form.Item
                        name="Phone"
                        label={<span style={{ fontSize: 14 }}>Phone</span>}
                        rules={[
                            { required: true, message: "Please input your Phone" },
                        ]}
                    >
                        <Input
                            style={{ padding: 10, borderRadius: 25 }}
                            pattern="^[0-9]{10}$"
                            placeholder="ระบุเฉพาะตัวเลข"
                        />
                    </Form.Item>

                    <Form.Item
                        name="Address"
                        label={<span style={{ fontSize: 14 }}>Address</span>}
                        rules={[
                            { required: true, message: "Please input your Address" },
                        ]}
                    >
                        <TextArea rows={4}
                            style={{ padding: 10, borderRadius: 25 }}
                            pattern="^.{1,}$"
                            placeholder="Address"
                        />
                    </Form.Item>

                    <Form.Item>
                        <button className="myButton" htmlType="submit">
                            สมัครสมาชิก
                </button>
                        {/* Or <a href="">register now!</a> */}
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default RegisterHome

import React from 'react'
import { Row, Col, Card } from "antd";

function ContactusHome() {
    return (
        <div style={{ padding: 10 }}>
            <h1> รายชื่อผู้จัดทำ</h1>
            <Row gutter={[32, 32]}>
                <Col className="gutter-row" xs={20} md={15} xl={6} span={10}>
                    <Card
                        style={{
                            marginRight: 10,
                            borderColor: "#888888",
                            borderWidth: 2,
                            boxShadow: "4px 4px 1px 1px #888888",
                            textAlign: "center",
                            fontSize: 20,
                            borderRadius: 20,
                        }}
                    >
                        <img src="http://localhost:3000/img/7.jpg" width="300"></img><br />
                        ภาสินี เพชรสม 6004062610093 S.1 <br />
                    ความรับชอบ :
                    </Card>
                </Col>
                <Col className="gutter-row" xs={20} md={15} xl={6} span={10}>
                    <Card
                        style={{
                            marginRight: 10,
                            borderColor: "#888888",
                            borderWidth: 2,
                            boxShadow: "4px 4px 1px 1px #888888",
                            textAlign: "center",
                            fontSize: 20,
                            borderRadius: 20,
                        }}
                    >
                        <img src="http://localhost:3000/img/6.jpg" width="300"></img><br />
                        นพกร อรพรตระกูล 6004062620030 S.1 <br />
                    ความรับชอบ :
                    </Card>
                </Col>
                <Col className="gutter-row" xs={20} md={15} xl={6} span={10}>
                    <Card
                        style={{
                            marginRight: 10,
                            borderColor: "#888888",
                            borderWidth: 2,
                            boxShadow: "4px 4px 1px 1px #888888",
                            textAlign: "center",
                            fontSize: 20,
                            borderRadius: 20,
                        }}
                    >
                        <img src="http://localhost:3000/img/8.jpg" width="300"></img><br />
                    ภาคภูมิ ศรีเสน 6004062620048 S.1 <br />
                    ความรับชอบ :  การติดต่อฐานข้อมูลและการจัดการข้อมูล , ปัญญาประดิษฐ์ในการแนะนำเว่นตา , Regular Expression
                    </Card>
                </Col>
                <Col className="gutter-row" xs={20} md={15} xl={6} span={10}>
                    <Card
                        style={{
                            marginRight: 10,
                            borderColor: "#888888",
                            borderWidth: 2,
                            boxShadow: "4px 4px 1px 1px #888888",
                            textAlign: "center",
                            fontSize: 20,
                            borderRadius: 20,
                        }}
                    >
                        <img src="http://localhost:3000/img/5.jpg" width="300"></img><br />
                        ประวีณา ดวงจันทร์ 6004062616334 S.2 <br />
                    ความรับชอบ :

                    </Card>
                </Col>
            </Row>

        </div>
    )
}

export default ContactusHome

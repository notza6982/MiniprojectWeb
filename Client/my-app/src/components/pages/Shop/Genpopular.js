import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col, Button, Card, Modal } from "antd";
const { Meta } = Card;
const style = { background: "#F8F9F9", padding: "8px 8px", height: "250px" };
const fontRight = { textAlign: "right", float: "right", fontSize: "12px" };
const fontLeft = { textAlign: "left", float: "left", color: "grey", fontSize: "12px" };
const blue = {
    textAlign: "right",
    backgroundColor: "#330033",
    color: "#FFFFFF",
};

function Genpopular() {
    const [datas, setdatas] = useState([[]]);
    useEffect(() => {
        axios.get("/getpopulate")
            .then(res => {
                const datas = res.data;
                console.log(datas)
                setdatas(datas)
            })
    }, [])

    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Card title="Populate" extra={<a href="#">More</a>}
                style={{ backgroundColor: 'rgba(63, 81, 181, 0.0)', border: 0, borderRadius: "15px" }}
                headStyle={{ backgroundColor: 'rgba(63, 81, 181, 0.4)', border: 0 }}
                bodyStyle={{ backgroundColor: 'rgba(232, 234, 246, 0.4)', border: 0 }}>
                {
                    datas.map(data =>
                        <div style={{ paddingBottom: "20px" }}>
                            <Card type="inner"
                                hoverable
                                cover={<img alt="glasses!!" src={data[7]} width="95%" height="150" />}
                                onClick={() => setVisible(true)}
                            >
                                <Meta title={data[5]} description={"Group : " + data[11]} /><br />
                                <p><h7 style={fontLeft}>{data[9]} </h7> <h7 style={fontRight}>{data[6]} ฿</h7></p>
                                <br />
                                <Button type="button" style={blue} >
                                    Add to cart
                                </Button>

                            </Card>
                        </div>
                    )
                }

            </Card>
            <Modal
                title="Modal 1000px width"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </div>
    )
}
export default Genpopular
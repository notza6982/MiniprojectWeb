import React, { useEffect, useState } from 'react';
import { List, Avatar, Space, Button, Card, Row, Col, Modal,Spin  } from 'antd';
import axios from 'axios'
const { Meta } = Card;

const fontRight = { textAlign: "right", float: "right", fontSize: "12px" };
const fontLeft = { textAlign: "left", float: "left", color: "grey", fontSize: "12px" };
const blue = {
    textAlign: "right",
    backgroundColor: "#f2f4f4",
    color: "#000000",
};
const blueright = {
    backgroundColor: "#f2f4f4",
    color: "#000000",
    float: 'right',
};

function Relateglasses() {
    const [datapopulate, setdatapopulate] = useState([[]]);
    const [datapopup, setdatapopup] = useState([[]]);
    const [loading, setloading] = useState(true);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        axios.get("/getpopulate")
            .then(res => {
                const datas = res.data;
                // console.log(datas)
                setdatapopulate(datas)
                setloading(false)
            })
    }, [])

    async function getitem(id) {
        // console.log(id)
        await axios.get("/getinfobyid/iteminfo/GID/" + id + "")
            .then(res => {
                // const datas = res.data[0];
                const datas = res.data;
                console.log(datas)
                setdatapopup(datas)
            })

        let body = {
            iid: id,
            uid: localStorage.getItem('uid'),
        };
        let message = ""
        axios.get('/insert_statistics/', { params: { body } })
            .then(response => {
                message = response.data
                // console.log("response: ", response)

            })
            .catch(err => console.log(err));
        if (message == "Success") {

        }
        else {
            // return notification["error"]({
            //   message: 'something wrong',
            // });
        }
        setVisible(true)
    }
    const onClickHandler = (data) => {
        console.log(data)
        var dataincart = JSON.parse(localStorage.getItem('mycart'));
        console.log(dataincart)
        if(dataincart!=null){
            var count = 0
            for(var i=0;i<dataincart.length;i++){
                if(dataincart[i].iid==data[2]){
                    dataincart[i].quanlity++;
                    count = 1;
                }
            }
            if(count == 0){
                dataincart.push({
                    iid:data[2],
                    name:data[5],
                    itemprice: data[6],
                    pathpic:data[7],
                    code:data[9],
                    quanlity: 1,
                })
            }
        }
        else{
            dataincart=[{
                iid:data[0],
                name:data[1],
                itemprice: data[2],
                pathpic:data[3],
                code:data[5],
                quanlity: 1,
            }]
        }
        localStorage.setItem('mycart', JSON.stringify(dataincart));
        window.location.replace("/GlassesShop/Mycart")
    }

    return (
        <div>
            <div style={{ fontSize: 30 }}>แว่นที่มักจะซื้อด้วยกัน</div>
            <Spin spinning={loading} delay={500} size="large" tip="Loading...">
            <Row gutter={[32, 32]} style={{ marginTop: 20 }}>
            {
                    datapopulate.map(data =>
                        <Col xs={24} lg={8} xl={8}>
                            <Card type="inner"
                                hoverable
                                cover={<img alt="glasses!!" onClick={() => getitem(data[2])} src={data[7]} width="100%" height="100%" />}
                            >
                                <div onClick={() => getitem(data[2])}>
                                    <Meta title={data[5]} description={"Category : " + data[8]} /><br />
                                    <p><h7 style={fontLeft}>{data[9]} </h7> <h7 style={fontRight}>{new Intl.NumberFormat('en').format(data[6])} ฿</h7></p>
                                    <br />
                                </div>
                                <Button type="button" onClick={() => onClickHandler(data)} style={blue} >
                                    Add to cart
                  </Button>
                            </Card>
                        </Col>
                    )
                }
            </Row>
</Spin>


            <Modal
                title="Modal 1000px width"
                style={{ top: 50 }}
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width="50%"
                footer={null}
            >
                {datapopup.map(data => (
                    < div style={{ padding: '20px 20px' }} >
                        <div id='img' style={{textAlign:"center"}}>
                            <img alt="glasses!!" src={data[3]} width="50%" height="150" />
                        </div>
                        <div>
                            <h3 >{data[1]} </h3>
                            <p style={{ float: 'right' }}>Category : {data[4]} </p>
                            <p >{data[5]}</p>
                            <p> Glasses are glasses .
                  The type of glasses is {data[4]} .
                  Just wear it on your head.
                  The whole world will be beautiful immediately </p>
                            <h4 style={{ textAlign: 'right' }}>{data[2]} ฿</h4>
                            <p style={{ textAlign: 'right' }}> AVAILABILITY: <b>IN STOCK </b></p>
                            <Button type="button" onClick={() => onClickHandler(data[0])} style={blueright}>
                                Add to cart
                   </Button>
                        </div>
                    </div>
                ))}
            </Modal>
        </div>
    )
}

export default Relateglasses

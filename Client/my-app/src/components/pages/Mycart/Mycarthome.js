import React, { useEffect, useState } from 'react';
import { List, Avatar, Space, Button, Card, Row, Col, Modal, Spin } from 'antd';
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from 'axios'
import Relateglasses from './Relateglasses'
const { Meta } = Card;



var id = ""
if (localStorage.getItem('isLogin') == "true") {
    id = localStorage.getItem('uid')
}
else {
    id = sessionStorage.getItem('uid')
}

function Mycarthome() {
    const [datainlist, setdatainlist] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        // let body = {
        //     uid: id,
        //     status: 'in-basket',
        // };
        // let message = ""
        const getdata = async () => {
            var dataincart = JSON.parse(localStorage.getItem('mycart'));
            if(dataincart!=null){
                var data = []
                for (var i = 0; i < dataincart.length; i++) {
                    data.push({
                        name: dataincart[i].name,
                        itemprice: dataincart[i].itemprice ,
                        quanlity: dataincart[i].quanlity,
                        code: dataincart[i].code,
                        pathpic:dataincart[i].pathpic,
                        iid: dataincart[i].iid,
                    })
                }
                setdatainlist(data)
                setloading(false)
            }
            // await axios.get('/getbasketitem/', { params: { body } })
            //     .then(response => {
            //         message = response.data
            //         console.log("response: ", response)
            //     })
            //     .catch(err => console.log(err));
            // if (message != "fail") {
            //     var data = []
            //     for (var i = 0; i < message.length; i++) {
            //         data.push({
            //             title: message[i][3],
            //             price: message[i][4] ,
            //             number: message[i][2],
            //             path:message[i][5],
            //             id: i+1,
            //         })
            //     }
            //     setdatainlist(data)
            //     setloading(false)
            // }
        }
        getdata()
    }, [])
    const deletelist = async (x) => {
        console.log(x)
        var data = [...datainlist]
        for (var i = 0; i < data.length; i++) {
            if (x == data[i].iid) {
                data.splice(i, 1)
                break
            }
        }
        setdatainlist(data)
        localStorage.setItem('mycart', JSON.stringify(data));
    }

    const changenumberlist = async (x, count) => {
        console.log(x)
        var data = [...datainlist]
        for (var i = 0; i < data.length; i++) {
            if (x == data[i].iid) {
                if (count == "+") {
                    data[i].quanlity++
                }
                else if (count == "-") {
                    data[i].quanlity--
                }
                break
            }
        }
        setdatainlist(data)
        localStorage.setItem('mycart', JSON.stringify(data));
    }



    return (
        <div>
        {datainlist.length!=0?
        <Row >
        <Col xs={0} md={2} lg={3} xl={4}/>
            <Col xs={24} md={20} lg={18} xl={16} >
        <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 30 }}>??????????????????</div>
            
            <List loading={loading}
                style={{ textAlign: "left" }}
                itemLayout="horizontal"
                dataSource={datainlist}
                renderItem={item => (
                    <List.Item
                        actions={[<Space style={{ fontSize: 15 }}>
                            {item.quanlity>1?<a><Avatar onClick={() => { changenumberlist(item.iid, "-") }}>-</Avatar></a>
                            :<Avatar>-</Avatar>}
                            
                            <Avatar style={{ backgroundColor: "white", color: "black" }}>{item.quanlity}</Avatar>
                            <a><Avatar onClick={() => { changenumberlist(item.iid, "+") }}>+</Avatar></a>
                        </Space>
                            , <Button type="danger" shape="round" onClick={() => { deletelist(item.iid) }}>
                            <Space style={{ fontSize: 15 }}>
                                <DeleteOutlined />??????
                            </Space>
                        </Button>]}>
                        <List.Item.Meta
                            avatar={<img style={{width:60,height:"auto",paddingTop:"25%"}} src={item.pathpic}/>}
                            title={<span>{item.name} </span>}
                            description={
                                <div>
                                   <span >{item.code}</span> <br/>
                                <span >???????????? {new Intl.NumberFormat('en').format(item.itemprice)} ???</span><br/>
                            <span style={{ color: "green" }}>????????? : {new Intl.NumberFormat('en').format(item.itemprice*item.quanlity)} ???</span>
                            </div>
                        }
                        />
                    </List.Item>
                )}
            />
            <br />
            <Link to="/GlassesShop/Shopping" style={{ fontSize: 20, color: "green" }}>????????????????????????????????????????????????</Link>
            <br /><br />

            <Card style={{ backgroundColor: "#DCDCDC", fontSize: 30}}>
                ????????????????????? {new Intl.NumberFormat('en').format(datainlist.map(item=>item.itemprice*item.quanlity).reduce((a, b) => a + b, 0))} ???
                <br />
                <Button> <Link to="/GlassesShop/Pay">??????????????????????????????????????????</Link></Button>
            </Card>
            <br />
            <Relateglasses />
        </div>
        </Col>
        </Row>
        :
        <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 30 }}>??????????????????</div>
        <div style={{fontSize:20,color:"red"}}>
            <br/><br/>???????????????????????????????????????????????????</div>
            
        </div>
            }
        </div>
    )
}

export default Mycarthome

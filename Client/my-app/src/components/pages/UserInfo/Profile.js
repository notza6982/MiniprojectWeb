import React, { useState } from "react";
import { Row, Col, Card, Avatar, Divider, Button, Modal } from "antd";
import Profileinfo from './Profileinfo'
import axios from 'axios';
function Profile() {
    const [showmodaladdpic, setshowmodaladdpic] = useState(false);
    const [dataprofilepic, setdataprofilepic] = useState();

    const showModal = () => {
        setshowmodaladdpic(true);
    };

    const handleOk = () => {
        setshowmodaladdpic(false);
    };

    const handleCancel = () => {
        setshowmodaladdpic(false);
    };
    const onChangeHandler = async (event)=>{
        console.log(event.target.files[0])
        setdataprofilepic(event.target.files[0])
        let body = {uid : localStorage.getItem('uid')}
        await axios.get("/get_image_path", { params: { body } })
        .then(response => {
          localStorage.setItem('path',response.data);
          console.log("response: ", response.data)
        })

    }

    return (
        <div>
            <Card style={{ backgroundColor: "#DCDCDC", borderRadius: 20, fontSize: 25 }}>
                <Row>
                    <Col xs={24} md={6} xl={4} style={{display:"flex",alignItems:"center",justifyContent:"center" }}>
                        <div  style={{ textAlign: "center"}}>
                        <Avatar src={"/loadimages/"+localStorage.getItem('path')} size={100} /><br/>
                        <Button shape="round" type="primary" onClick={showModal}>อัพโหลด</Button>
                        </div>
                    </Col>
                    <Col xs={0} md={1} xl={1}>
                        <Divider type="vertical" style={{ backgroundColor: "black", height: "100%" }} />
                    </Col>
                    <Col xs={24} md={0} xl={0}>
                        <Divider style={{ backgroundColor: "black", width: "100%" }} />
                    </Col>
                    <Col xs={24} md={17} xl={19}>
                        <Profileinfo />
                    </Col>
                </Row>
            </Card>



            <Modal title="อัพโหลดรูปภาพ" visible={showmodaladdpic} onOk={handleOk} onCancel={handleCancel} footer={null}>
            
            <form action={"/saveimages/"+localStorage.getItem('uid')} method="POST" enctype="multipart/form-data">
                <input type="file" name="file" onChange={onChangeHandler}/>
                <input type="submit" />
            </form>
      </Modal>

        </div>
    )
}

export default Profile

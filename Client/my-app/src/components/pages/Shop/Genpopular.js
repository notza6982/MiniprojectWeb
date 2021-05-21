import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col, Button, Card, Modal,notification } from "antd";
const { Meta } = Card;
const style = { background: "#F8F9F9", padding: "8px 8px", height: "250px" };
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

function Genpopular() {
  const [datas, setdatas] = useState([[]]);
  const [datapopup, setdatapopup] = useState([[]]);
  useEffect(() => {
    axios.get("/getpopulate")
      .then(res => {
        const datas = res.data;
        setdatas(datas)
      })
  }, [])

  const [visible, setVisible] = useState(false);

  function getitem(id) {
    console.log(id)
    axios.get("/getinfobyid/iteminfo/GID/" + id + "")
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
            console.log("response: ", response)

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

    
    const args = {
      message: 'Success',
      description:
        'Add item into cart successfully',
      duration: 500,
    };
    notification.open(args);
  }


  return (
    <div>
      <Card title="Populate" 
        style={{ backgroundColor: '#f0f2f5', border: 0, borderRadius: "15px" }}
        headStyle={{ backgroundColor: '#f0f2f5', border: 0 }}
        bodyStyle={{ backgroundColor: '#FBFCFC', border: 0 }}>
        {(datas.length > 1) ?
          datas.map(data => 
              <div style={{ paddingBottom: "20px" }}>
                <Card type="inner"
                  hoverable
                  cover={<img alt="glasses!!" onClick={() => getitem(data[2])} src={data[7]} width="95%" height="100%" />}
                >
                  <div onClick={() => getitem(data[2])}>
                    <Meta title={data[5]} description={"Category : " + data[8]} /><br />
                    <p><h7 style={fontLeft}>{data[9]} </h7> <h7 style={fontRight}>{data[6]} ฿</h7></p>
                    <br />
                  </div>
                  <Button type="button" onClick={() => onClickHandler(data)} style={blue} >
                    Add to cart
                  </Button>
                </Card>
              </div>
          )
          : 
          <div style={{width:'100%'}}>
              <h5 style={{ color: 'red', textAlign: 'center' }}>Nothing Here </h5>
          </div>
        }

      </Card>
      
      <Modal
        title=" Glasses information "
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={400}
        footer={null}
        style={{ paddingBottom: '20px' }}
      >

        {datapopup.map(data => (
          < div style={{ padding: '20px 20px' }} >
            <div id='img' >
              <img alt="glasses!!" src={data[3]} width="100%" height="150" />
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
export default Genpopular
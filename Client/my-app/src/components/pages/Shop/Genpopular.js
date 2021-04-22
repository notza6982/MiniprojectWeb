import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col, Button, Card } from "antd";
const { Meta } = Card;
const style = { background: "#F8F9F9", padding: "8px 8px", height: "250px" };
const fontRight = { textAlign: "right" };
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

    return (
        <div>
            <Card title="Populate" extra={<a href="#">More</a>}>
                {
                       datas.map(data =>
                      <Card type="inner"
                        hoverable
                        cover={<img alt="glasses!!" src={data[7]} width="95%" height="150" />}>
                        <Meta title={data[5]} description={"Group : "+data[10]} />
                        <p style={fontRight}>{data[6]} ฿</p>
                        <Button type="button" style={blue}>
                          Add to cart
                          </Button>
                      </Card>
                      )
                }
            </Card>
        </div>
    )
}
export default Genpopular
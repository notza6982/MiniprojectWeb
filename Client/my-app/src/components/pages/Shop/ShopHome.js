import React, { useEffect, useState } from "react";
import { Row, Col, Breadcrumb, Button, Card, Select, Modal, Tabs ,Pagination,notification,Spin,AutoComplete   } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './ShopHome.css'
import Paging from './Paging'
import Genpopular from './Genpopular'
import axios from 'axios';
const { Meta } = Card;
const { Option } = Select;
const style = { background: "#F8F9F9", padding: "8px 8px", height: "250px" };
const fontRight = { textAlign: "right", float: "right", fontSize: "12px" };
const fontLeft = { textAlign: "left", float: "left", color: "grey", fontSize: "12px" };
const { TabPane } = Tabs;
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

var itemlist = [];

var categorynow = " ";
var caseselect = 0;


function ShopHome() {
    const [datas, setdatas] = useState([[]]);
    const [datapopup, setdatapopup] = useState([[]]);
    const [countpage, setcountpage] = useState(10);
    const [currentpage, setcurrentpage] = useState(1);
    const [optionsearch, setoptionsearch] = useState([]);
    const [loading, setloading] = useState(true);
    const [datasql, setdatasql] = useState({
        event:" ",
        column:null,
        order:null
    });

    useEffect( async() => {
       await axios.get("/sortitem/iteminfo/price/asc/0")
            .then(res => {
                const datas = res.data;
                setdatas(datas)
            })
            
       await axios.get("/countrow/iteminfo/price")
        .then(res => {
            const datas = res.data[0][0];
            console.log((datas/12)*10)
            setcountpage((datas/12)*10)
        })
        setloading(false)
    }, [])

    const onChangepage = async(page) => {
        console.log(page);
        setcurrentpage(page)
        setloading(true)
        var sql
        if(datasql.event===" "){
            sql = "/sortitem/iteminfo/price/asc/" + ((page-1)*12) 
        }else{
            sql ="/getinfowithorderby/"+ datasql.event +"/" + datasql.column + "/" + datasql.order+ "/"  + ((page-1)*12) ;
        }
        await axios.get(sql)
        .then(res => {
            const datas = res.data;
            setdatas(datas)
            setloading(false)
        })
      };

    function searchdata() {
        let name = document.getElementById('searchbar').value
        console.log(name)
        axios.get("/searchitem/iteminfo/" + name + "")
            .then(res => {
                // const datas = res.data[0];
                const datas = res.data;
                console.log(datas)
                setdatas(datas)
            })
    }

    const [visible, setVisible] = useState(false);

    const onClickTap = async(event) =>{
        setloading(true)
        categorynow = event;
        // console.log("tab = "+event);
        var column;
        var order;
        var sql ;
        var sql1 ;
        switch (Number(caseselect)) {
            case 0:
                column = "price"
                order = "asc"
                break;
            case 1:
                column = "price"
                order = "desc"
                break;
            case 2:
                column = "name"
                order = "asc"
                break;
            case 3:
                column = "category"
                order = "asc"
                break;
            default:
        }
        setdatasql({
            event:event,
            column:column,
            order:order,
        })
        
        if(event===" "){
            sql = "/sortitem/iteminfo/price/asc/0";
            // sql = "/sortitem/iteminfo/" + column + "/" + order + "/0";
            // sql1 = "/countrow/iteminfo/price"
        }else{
            sql ="/getinfowithorderby/"+ event +"/" + column + "/" + order +"/0";
            // sql1 = "/countrowbyrule/iteminfo/price/"+categorynow
        }
        // await axios.get(sql1)
        // .then(res => {
        //     const datas = res.data[0][0];
        //     console.log((datas/12)*10)
        //     setcountpage((datas/12)*10)
        // })
        // console.log(sql);
        await axios.get(sql)
            .then(res => {
                const datas = res.data;
                // console.log(datas)
                setdatas(datas)
                setloading(false)
            })
            
        setcurrentpage(1)
    }

    const onChangeHandler = (event) => {
        var column;
        var order;
        var sql;
        caseselect = Number(event);
        setloading(true)
        switch (Number(caseselect)) {
            case 0:
                column = "price"
                order = "asc"
                break;
            case 1:
                column = "price"
                order = "desc"
                break;
            case 2:
                column = "name"
                order = "asc"
                break;
            case 3:
                column = "category"
                order = "asc"
                break;
            default:
        }
        setdatasql({
            event:event,
            column:column,
            order:order,
        })
        
        if(categorynow ===" "){
            // sql = "/sortitem/iteminfo/price/asc/0";
            sql = "/sortitem/iteminfo/" + column + "/" + order + "/0";
        }else{
            sql ="/getinfowithorderby/"+ categorynow +"/" + column + "/" + order + "/0";
        }
        // console.log(sql);
        axios.get(sql)
            .then(res => {
                const datas = res.data;
                // console.log(datas)
                setdatas(datas)
                setloading(false)
            })
        setcurrentpage(1)
    }

    function onClickHandler(data) {
        console.log(data)
        var dataincart = JSON.parse(localStorage.getItem('mycart'));
        console.log(dataincart)
        if(dataincart!=null){
            var count = 0
            for(var i=0;i<dataincart.length;i++){
                if(dataincart[i].iid==data[0]){
                    dataincart[i].quanlity++;
                    count = 1;
                }
            }
            if(count == 0){
                dataincart.push({
                    iid:data[0],
                    name:data[1],
                    itemprice: data[2],
                    pathpic:data[3],
                    code:data[5],
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

    async function getitem(id) {
        console.log(id)
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
                console.log("response: ", response)

            })
            .catch(err => console.log(err));
        if (message === "Success") {

        }
        else {
            // return notification["error"]({
            //   message: 'something wrong',
            // });
        }
        setVisible(true)
    }

    const genitem = ()=>{
        return (
            <div>
                <Row gutter={[16, 24]}>
                    {(datas.length > 1) ?
                        datas.map(data =>
                            <Col className="gutter-row" xs={24} md={12} xl={6}>
                                <Card
                                    hoverable
                                    cover={<img alt="glasses!!" src={data[3]} onClick={() => getitem(data[0])} width="100%" height="100%" />}
                                >
                                    <div onClick={() => getitem(data[0])}>
                                        <Meta title={data[1]} description={"Category : " + data[4]} /><br />
                                        <p><h7 style={fontLeft}>{data[5]} </h7> <h7 style={fontRight}>{(data[2]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} ฿</h7></p>
                                        <br />
                                    </div>
                                    <Button type="button" onClick={() => onClickHandler(data)} style={blue}>
                                        Add to cart
                                    </Button>
                                </Card>
                            </Col>
                        )
                        : <div style={{ width: '100%' }}>
                            <h5 style={{ color: 'red', textAlign: 'center' }}>Nothing Here </h5>
                        </div>
                    }
                </Row>
            </div>
        )
    }

    const useajax = async (x) => {
        console.log(x)
        let name = document.getElementById('searchbar').value
        await axios.get("/searchitem1/iteminfo/" + x + "")
            .then(res => {
                // const datas = res.data[0];
                const datas = res.data;
                console.log(datas)
                let countoption = []
                for(var i=0;i<datas.length;i++){
                    countoption.push({
                        value:datas[i]
                    })
                }
                // var a = countoption.filter(function (value, index) { return countoption.indexOf(value) == index })
                // console.log(a)
                //setdatas(datas)
                setoptionsearch(countoption)
            })
    }
    return (
        <div>
            <Row>
                <Col span={(window.innerWidth > 768) ? 6 : 0} push={(window.innerWidth > 768) ? 18 : 0}  >
                    <div  style={{ textAlign: 'center' }}>
                        <form action="Genpopular.js" method="GET">
                            <AutoComplete id="searchbar" name="searchbar" placeholder="searching" onChange={useajax}
                            style={{ width: 200 }}
                            options={optionsearch}
                            />
                                {/* <input type="text" id="searchbar" name="searchbar" placeholder="searching" onChange={useajax} /> */}
                            <Button type="submit" id="" name="search"  onClick={() => searchdata()}><SearchOutlined /></Button><br />
                        </form>
                        <div id="pop" style={{ paddingLeft: "20px", paddingTop: "20px" }}>
                            <Genpopular />
                        </div>
                    </div>
                </Col>
                <Col span={(window.innerWidth > 768) ? 18 : 24} pull={(window.innerWidth > 768) ? 6 : 0}>
                    <div id="Nav" style={{ textAlign: 'left' }}>
                        <Breadcrumb>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>Shop</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div style={{ fontSize: "30px" }}>
                        Shop
                    </div>
                    <div id="alert"></div>
                    <div id="listItem" style={{ textAlign: 'center' }}>
                        <div>
                            <div style={{ textAlign: "right", paddingBottom: "20px" }} >
                                <Select id="sortby" name="sortby" style={{ width: "250px" }} defaultValue="0" onChange={onChangeHandler}>
                                    <Option value="0">Sort by price (min-max)</Option>
                                    <Option value="1">Sort by price (max-min)</Option>
                                    <Option value="2">Sort by Name</Option>
                                    <Option value="3">Sort by Group</Option>
                                </Select>
                            </div>
                            <Tabs defaultActiveKey="0" size={'small'} style={{ marginBottom: 32 }}>
                                <TabPane tab={<span onClick={() =>onClickTap(" ")}>{"ALL"}</span>} key="0" >
                            <Spin spinning={loading} delay={500} size="large" tip="Loading...">
                                     {genitem()}
                                     </Spin>
                                </TabPane>
                                <TabPane tab={<span onClick={() =>onClickTap("boston")}>{"Boston"}</span>} key="1" >
                                    
                            <Spin spinning={loading} delay={500} size="large" tip="Loading...">
                                     {genitem()}
                                     </Spin>
                                </TabPane>
                                <TabPane tab={<span onClick={() =>onClickTap("browline")}>{"Browline"}</span>} key="2">
                                    
                            <Spin spinning={loading} delay={500} size="large" tip="Loading...">
                                     {genitem()}
                                     </Spin>
                                </TabPane>
                                <TabPane tab={<span onClick={() =>onClickTap("oval")}>{"Oval"}</span>} key="3">
                                    
                            <Spin spinning={loading} delay={500} size="large" tip="Loading...">
                                     {genitem()}
                                     </Spin>
                                </TabPane>
                                <TabPane tab={<span onClick={() =>onClickTap("rectangle")}>{"Rectangle"}</span>} key="4">
                                    
                            <Spin spinning={loading} delay={500} size="large" tip="Loading...">
                                     {genitem()}
                                     </Spin>
                                </TabPane>
                                <TabPane tab={<span onClick={() =>onClickTap("rimless")}>{"Rimless"}</span>} key="5" >
                                    
                            <Spin spinning={loading} delay={500} size="large" tip="Loading...">
                                     {genitem()}
                                     </Spin>
                                </TabPane>
                                <TabPane tab={<span onClick={() =>onClickTap("round")}>{"Round"}</span>}  key="6">
                                    
                            <Spin spinning={loading} delay={500} size="large" tip="Loading...">
                                     {genitem()}
                                     </Spin>
                                </TabPane>
                                <TabPane tab={<span onClick={() =>onClickTap("wellington")}>{"Wellington"}</span>} key="7">
                                    
                            <Spin spinning={loading} delay={500} size="large" tip="Loading...">
                                     {genitem()}
                                     </Spin>
                                </TabPane>
                                <TabPane tab={<span onClick={() =>onClickTap("other")}>{"Other"}</span>} key="8" >
                                    
                            <Spin spinning={loading} delay={500} size="large" tip="Loading...">
                                     {genitem()}
                                     </Spin>
                                </TabPane>
                            </Tabs>

                            <Modal
                                title=" Glasses information "
                                centered
                                visible={visible}
                                onOk={() => setVisible(false)}
                                onCancel={() => setVisible(false)}
                                width={400}
                                footer={null}
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
                                            <Button type="button" onClick={() => onClickHandler(data)} style={blueright}>
                                                Add to cart
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </Modal>
                        </div >
                    </div>
                    <div id="pagination" style={{ paddingTop: "25px", textAlign: "center" }}>
                        <Pagination  current={currentpage} onChange={onChangepage}
                        defaultCurrent={1} total={countpage} pageSize={12}/>
                    </div>
                </Col>
            </Row>
        </div >
    )
}

export default ShopHome

import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import axios from 'axios';

function BarCharted() {

  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];
  
  const [datas1, setdatas1] = useState([[]]);
  const [datas2, setdatas2] = useState([[]]);
  const [datas3, setdatas3] = useState([[]]);
  const [datas4, setdatas4] = useState([[]]);
  const [datas5, setdatas5] = useState([[]]);

  useEffect(async() => {

  //Graph interes_gender
    await axios.get("/interes_gender")
      .then(res => {
        const datas1 = res.data;
        console.log(datas1)
        var datagender = []
        for(var i = 0; i<datas1.length;i++){
          datagender.push({
            namegender: datas1[i][1] +" ("+ datas1[i][3][0] +") " ,
            numgender: datas1[i][2]
          })
          // if(datas1[i][3][0] == "m"){
          //   datagender[i].namegender = <span style={{color:"skyblue"}}> {datagender[i].namegender}</span>
          // }else{
          //   datagender[i].namegender =  <span style={{color:"pink"}}> {datagender[i].namegender}</span>
          // }
        }
        setdatas1(datagender)
      })

    // Graph interes_age_range
      await axios.get("/interes_age_range")
        .then(res => {
          const datas2 = res.data;
          console.log(datas2)
          var dataagerange = []
          for(var i = 0; i<datas2.length;i++){
            dataagerange.push({
              nameage: datas2[i][1]+ " ("+ (Number(new Date().getFullYear())-Number(datas2[i][3]))+ ") " ,
              numage: datas2[i][2]
            })
          }
          setdatas2(dataagerange)
        })

    // Graph interes_time
      await axios.get("/interes_time")
        .then(res => {
            const datas3 = res.data;
            console.log(datas3)
            var datainterestime = []
            for(var i = 0; i<datas3.length;i++){
              datainterestime.push({
              datatime: datas3[i][0]+ ":00",
              numtime: datas3[i][1]
            })
          }
          setdatas3(datainterestime)
      })

  //Graph interes_person
    await axios.get("/interes_person")
      .then(res => {
        const datas4 = res.data;
        console.log(datas4)
        var dataperson = []
        for(var i = 0; i<datas4.length;i++){
          dataperson.push({
            nameperson: datas4[i][1],
            numperson: datas4[i][0]
          });
        }
        setdatas4(dataperson)        
      });

    // Graph solditem
      await axios.get("/solditem")
        .then(res => {
          const datas5 = res.data;
          console.log(datas5)
          var datasolditem = []
          for(var i = 0; i<datas5.length;i++){
            datasolditem.push({
              nameitem: datas5[i][0],
              numitem: datas5[i][1]
            });
          }
          setdatas5(datasolditem)  
        }) 

  }, [])

  return (

    <div>
      
      <h5>ช่วงอายุสนใจของแว่นแต่ละประเภท</h5>
        <BarChart width={1400} height={300} data={datas2}>
        <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nameage" fontSize={12} angle={-15} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Bar dataKey="numage" barSize={40} fill="#4682B4"/>
        </BarChart> 
      <br></br>         
      <hr></hr>

      <h5>เพศสนใจของแว่นแต่ละประเภท</h5>
        <BarChart width={1100} height={300} data={datas1}>
        <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="namegender" fontSize={12} angle={-30} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Bar dataKey="numgender" barSize={35} fill="#483D8B"/>
        </BarChart>
      <br></br>
      <hr></hr>

      <h5>ช่วงเวลาที่คนเข้าชมสินค้า</h5>
        <BarChart width={800} height={300} data={datas3}>
        <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datatime" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Bar dataKey="numtime" barSize={20} fill="#8B8970"/>
        </BarChart>
      <br></br>
      <hr></hr>

      <h5>จำนวนยอดคนสนใจของแว่นแต่ละประเภท</h5>
        <BarChart width={800} height={300} data={datas4}>
        <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nameperson" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Bar dataKey="numperson" barSize={40} fill="#00688B"/>
        </BarChart> 
      <br></br>         
      <hr></hr>

      <h5>จำนวนยอดขายของแว่นแต่ละประเภท</h5>
        <BarChart width={800} height={300} data={datas5}>
        <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nameitem"  fontSize={15}/>
          <YAxis fontSize={17} />
          <Tooltip />
          <Bar dataKey="numitem" barSize={50} fill="#8884d8"/>
        </BarChart> 
      <br></br>  

    </div>
  )
}

export default BarCharted

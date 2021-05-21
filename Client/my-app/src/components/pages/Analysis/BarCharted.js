import React, { useEffect, useState } from "react";

import {PieChart,Pie, Line,LineChart,BarChart,Cell, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import axios from 'axios';

function BarCharted() {

  const [datas1, setdatas1] = useState([[]]);
  const [datas2, setdatas2] = useState([[]]);
  const [datas3, setdatas3] = useState([[]]);
  const [datas4, setdatas4] = useState([[]]);
  const [datas5, setdatas5] = useState([[]]);

  const barColors = ["#1f77b4", "#ff7f0e"]
  useEffect(async() => {

  //Graph interes_gender
    await axios.get("/interes_gender")
      .then(res => {
        const datas1 = res.data;
<<<<<<< HEAD
        console.log(datas1)
=======

        // this.setState({ datas1: datas });
>>>>>>> 949e639a73429f8751ab75404d9e480cc0b0c245
        var datagender = []
        for(var i = 0; i<datas1.length;i++){
          datagender.push({
            namegender: datas1[i][1] +" ("+ datas1[i][3][0] +") " ,
            numgender: datas1[i][2],
            mv:datas1[i][3][0]=="m" ? datas1[i][2] : 0 ,
            fv:datas1[i][3][0]=="f" ? datas1[i][2] : 0 ,
          })
        }
        setdatas1(datagender)
      })

    // Graph interes_age_range
      await axios.get("/interes_age_range")
        .then(res => {
          const datas2 = res.data;
 
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
  const demoUrl = 'https://codesandbox.io/s/two-simple-pie-chart-otx9h';
  return (

    <div>
<<<<<<< HEAD
      
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
=======
      <h5>ช่วงเวลาที่คนเข้าชมสินค้า</h5>
      <LineChart
      width={1400}
      height={400}
      data={datas3}
      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
      <XAxis dataKey="datatime" />
      <Tooltip />
      <CartesianGrid stroke="#f5f5f5" />
      <Line type="monotone" dataKey="numtime" stroke="#ff7300" yAxisId={0} />
    </LineChart>
>>>>>>> 949e639a73429f8751ab75404d9e480cc0b0c245
      <br></br>
      <hr></hr>

      <h5>เพศสนใจของแว่นแต่ละประเภท</h5>
        <BarChart width={1400} height={300} data={datas1}>
        <CartesianGrid strokeDasharray="3 3" />
<<<<<<< HEAD
          <XAxis dataKey="datatime" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Bar dataKey="numtime" barSize={20} fill="#8B8970"/>
=======
          <XAxis dataKey="namegender" ffoontSize={15} />
          <YAxis ffoontSize={15} />
          <Bar dataKey="fv" barSize={50} fill="#4682B4" />
          <Bar dataKey="mv" barSize={50} fill="#ff7300"/>
>>>>>>> 949e639a73429f8751ab75404d9e480cc0b0c245
        </BarChart>
      <br></br>
      <hr></hr>

      <h5>จำนวนยอดคนสนใจของแว่นแต่ละประเภท</h5>
        <BarChart width={1400} height={300} data={datas4}>
        <CartesianGrid strokeDasharray="3 3" />
<<<<<<< HEAD
          <XAxis dataKey="nameperson" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
=======
          <XAxis dataKey="nameperson" ffoontSize={15} />
          <YAxis ffoontSize={15} />
>>>>>>> 949e639a73429f8751ab75404d9e480cc0b0c245
          <Bar dataKey="numperson" barSize={40} fill="#00688B"/>
        </BarChart> 
      <br></br>         
      <hr></hr>

      <h5>จำนวนยอดขายของแว่นแต่ละประเภท</h5>
        <BarChart width={1400} height={300} data={datas5}>
        <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nameitem"  fontSize={15}/>
          <YAxis fontSize={17} />
<<<<<<< HEAD
          <Tooltip />
          <Bar dataKey="numitem" barSize={50} fill="#8884d8"/>
=======
          <Bar dataKey="numitem" barSize={50} fill="#1f77b4" />
>>>>>>> 949e639a73429f8751ab75404d9e480cc0b0c245
        </BarChart> 
      <br></br>  

      <h5>ช่วงอายุสนใจของแว่นแต่ละประเภท</h5>
        <BarChart width={1400} height={300} data={datas2}>
        <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nameage" ffoontSize={15} />
          <YAxis ffoontSize={15} />
          <Bar dataKey="numage" barSize={20} fill="#4682B4"/>
        </BarChart> 
      <br></br>         
      <hr></hr>
    </div>
  )
}

export default BarCharted

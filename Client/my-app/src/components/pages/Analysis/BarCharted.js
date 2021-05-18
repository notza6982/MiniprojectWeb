import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function BarCharted() {
  const [datas, setdatas] = useState([[]]);
  
  useEffect(async() => {
    await axios.get("/interes_gender")
            .then(res => {
                const datas = res.data;
                console.log(datas)
                this.setState({ datas1: datas });
                var x = []
                for(var i = 0; i<datas.length;i++){
                  console.log(datas[i])
                  x.push({
                    name: datas[i][1]+" ("+datas[i][3][0]+") ",
                    num: datas[i][2]
                  })
                }
                setdatas(x)
            })
  }, [])

  return (
    <div>
      <BarChart width={1000} height={300} data={datas}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Bar dataKey="num" fill="#8884d8"/>
      </BarChart>
    </div>
  )
}

export default BarCharted

 // const data = [
  //   {
  //     name: 'Page A',
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: 'Page B',
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: 'Page C',
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: 'Page D',
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: 'Page E',
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: 'Page F',
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: 'Page G',
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];
  
  // const getIntroOfPage = (label) => {
  //   if (label === 'Page A') {
  //     return "Page A is about men's clothing";
  //   }
  //   if (label === 'Page B') {
  //     return "Page B is about women's dress";
  //   }
  //   if (label === 'Page C') {
  //     return "Page C is about women's bag";
  //   }
  //   if (label === 'Page D') {
  //     return 'Page D is about household goods';
  //   }
  //   if (label === 'Page E') {
  //     return 'Page E is about food';
  //   }
  //   if (label === 'Page F') {
  //     return 'Page F is about baby food';
  //   }
  //   return '';
  // };

  // const CustomTooltip = ({ active, payload, label }) => {
  //   if (active && payload && payload.length) {
  //     return (
  //       <div className="custom-tooltip">
  //         <p className="label">{`${label} : ${payload[0].value}`}</p>
  //         <p className="intro">{getIntroOfPage(label)}</p>
  //         <p className="desc">Anything you want can be displayed here.</p>
  //       </div>
  //     );
  //   }
  
  //   return null;
  // };

import {dbRealtime} from '../../firebase'
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';

import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
//export const  dbRealtime = getDatabase(app);
// const data = [
//   { name: "Febrero", Total: 10 },
//   { name: "Marzo", Total: 2100 },
// ];

const Chart = ({ aspect, title }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const databaseRef = ref(dbRealtime, "entrances");
    onValue(databaseRef, (snapshot) => {
      const dataFromFirebase = snapshot.val();
      console.log('Datos leídos:', dataFromFirebase);
      if (dataFromFirebase) {
        const formattedData = [];
        Object.keys(dataFromFirebase).forEach(date => {
          Object.keys(dataFromFirebase[date]).forEach(time => {
            formattedData.push({
              name: `${date} ${time}`, // Combine date and time
              Total: dataFromFirebase[date][time] // Total entrances
            });
          });
        });
        setData(formattedData);
      }
    });
  }, []); 
    
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

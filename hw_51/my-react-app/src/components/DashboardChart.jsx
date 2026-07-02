import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Пн', mins: 30 },
  { name: 'Вт', mins: 45 },
  { name: 'Ср', mins: 20 },
  { name: 'Чт', mins: 60 },
  { name: 'Пт', mins: 90 },
];

export default function DashboardChart() {
  return (
    <div style={{ width: '100%', height: 250, marginTop: '20px' }}>
      <h3>Прогрес за тиждень (хвилини)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="mins" stroke="#8884d8" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
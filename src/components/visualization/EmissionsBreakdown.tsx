
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface EmissionsBreakdownProps {
  breakdownType: 'building' | 'energy';
}

// 惠安县模拟数据
const buildingData = [
  { name: '政府办公楼', value: 35, color: '#22c55e' },
  { name: '商业建筑', value: 25, color: '#16a34a' },
  { name: '工业厂房', value: 20, color: '#15803d' },
  { name: '住宅小区', value: 10, color: '#4ade80' },
  { name: '其他建筑', value: 10, color: '#86efac' },
];

const energyData = [
  { name: '电力', value: 45, color: '#3b82f6' },
  { name: '天然气', value: 25, color: '#2563eb' },
  { name: '煤炭', value: 15, color: '#1d4ed8' },
  { name: '石油', value: 10, color: '#60a5fa' },
  { name: '其他能源', value: 5, color: '#93c5fd' },
];

export const EmissionsBreakdown = ({ breakdownType }: EmissionsBreakdownProps) => {
  const data = breakdownType === 'building' ? buildingData : energyData;
  
  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent, 
    name 
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent * 100 > 5 ? (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };
  
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}%`, '占比']}
          />
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

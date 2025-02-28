
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartCard } from './ChartCard';

// Sample data
const data = [
  { name: '电力消耗', value: 40, color: '#22c55e' },
  { name: '天然气', value: 30, color: '#3b82f6' },
  { name: '交通运输', value: 20, color: '#f59e0b' },
  { name: '其他来源', value: 10, color: '#8b5cf6' },
];

const renderCustomizedLabel = ({ 
  cx, 
  cy, 
  midAngle, 
  innerRadius, 
  outerRadius, 
  percent 
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const customTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-white dark:bg-carbon-gray-900 shadow-lg border border-carbon-gray-200 dark:border-carbon-gray-800 rounded-md">
        <p className="font-medium text-sm text-carbon-gray-900 dark:text-carbon-gray-100 mb-1">{payload[0].name}</p>
        <div className="flex items-center text-xs">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: payload[0].payload.color }} 
          />
          <span className="text-carbon-gray-600 dark:text-carbon-gray-400">
            占比: 
          </span>
          <span className="ml-1 font-medium text-carbon-gray-900 dark:text-carbon-gray-100">
            {payload[0].value}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <ul className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-1.5" 
            style={{ backgroundColor: entry.color }} 
          />
          <span className="text-carbon-gray-700 dark:text-carbon-gray-300">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

export const EmissionsByTypeChart = () => {
  return (
    <ChartCard 
      title="排放类型占比" 
      description="按能源类型的碳排放占比分析"
    >
      <div className="h-80 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={90}
              innerRadius={40}
              dataKey="value"
              strokeWidth={2}
              animationDuration={1500}
              animationBegin={300}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
              ))}
            </Pie>
            <Tooltip content={customTooltip} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

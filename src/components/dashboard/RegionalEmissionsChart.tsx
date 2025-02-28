
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { ChartCard } from './ChartCard';

// Sample data
const data = [
  { name: '福州市', value: 4000 },
  { name: '厦门市', value: 3000 },
  { name: '泉州市', value: 2000 },
  { name: '莆田市', value: 2780 },
  { name: '漳州市', value: 1890 },
  { name: '龙岩市', value: 2390 },
  { name: '三明市', value: 3490 },
  { name: '南平市', value: 2200 },
  { name: '宁德市', value: 2900 },
];

interface CustomTooltipProps extends TooltipProps<number, string> {}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-white dark:bg-carbon-gray-900 shadow-lg border border-carbon-gray-200 dark:border-carbon-gray-800 rounded-md">
        <p className="font-medium text-sm text-carbon-gray-900 dark:text-carbon-gray-100 mb-1">{label}</p>
        <div className="flex items-center text-xs">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: payload[0].color }} 
          />
          <span className="text-carbon-gray-600 dark:text-carbon-gray-400">
            碳排放量: 
          </span>
          <span className="ml-1 font-medium text-carbon-gray-900 dark:text-carbon-gray-100">
            {payload[0].value} kg
          </span>
        </div>
      </div>
    );
  }

  return null;
};

export const RegionalEmissionsChart = () => {
  return (
    <ChartCard 
      title="区域排放分布" 
      description="各地区碳排放总量对比"
    >
      <div className="h-80 pt-4 px-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
            />
            <YAxis 
              tickFormatter={(value) => `${value}kg`} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill="#22c55e" 
              radius={[4, 4, 0, 0]} 
              barSize={30} 
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

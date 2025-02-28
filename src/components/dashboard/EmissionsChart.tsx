
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { ChartCard } from './ChartCard';

// Sample data
const data = [
  { name: '一月', 电力: 4000, 天然气: 2400, 交通: 2400 },
  { name: '二月', 电力: 3000, 天然气: 1398, 交通: 2210 },
  { name: '三月', 电力: 2000, 天然气: 9800, 交通: 2290 },
  { name: '四月', 电力: 2780, 天然气: 3908, 交通: 2000 },
  { name: '五月', 电力: 1890, 天然气: 4800, 交通: 2181 },
  { name: '六月', 电力: 2390, 天然气: 3800, 交通: 2500 },
  { name: '七月', 电力: 3490, 天然气: 4300, 交通: 2100 },
];

interface CustomTooltipProps extends TooltipProps<number, string> {}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-white dark:bg-carbon-gray-900 shadow-lg border border-carbon-gray-200 dark:border-carbon-gray-800 rounded-md">
        <p className="font-medium text-sm text-carbon-gray-900 dark:text-carbon-gray-100 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center text-xs">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: entry.color }} 
            />
            <span className="text-carbon-gray-600 dark:text-carbon-gray-400">
              {entry.name}: 
            </span>
            <span className="ml-1 font-medium text-carbon-gray-900 dark:text-carbon-gray-100">
              {entry.value} kg
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export const EmissionsChart = () => {
  return (
    <ChartCard 
      title="排放量趋势" 
      description="按能源类型划分的碳排放量月度趋势"
    >
      <div className="h-80 pt-4 px-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorElectricity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTransport" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
            <Area 
              type="monotone" 
              dataKey="电力" 
              stroke="#22c55e" 
              fillOpacity={1} 
              fill="url(#colorElectricity)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="天然气" 
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#colorGas)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="交通" 
              stroke="#f59e0b" 
              fillOpacity={1} 
              fill="url(#colorTransport)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

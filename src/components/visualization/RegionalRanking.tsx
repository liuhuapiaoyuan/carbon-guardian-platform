
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface RegionalRankingProps {
  selectedFilter: string;
  onRegionClick: (region: string) => void;
}

// 惠安县模拟数据
const regionData = [
  { name: '惠安城区', value: 4200 },
  { name: '东桥镇', value: 3600 },
  { name: '崇武镇', value: 2800 },
  { name: '黄塘镇', value: 2300 },
  { name: '山霞镇', value: 1900 },
  { name: '净峰镇', value: 1700 },
  { name: '螺阳镇', value: 1400 },
  { name: '张坂镇', value: 1100 },
];

const buildingData = [
  { name: '政府办公楼', value: 3800 },
  { name: '商业建筑', value: 3200 },
  { name: '工业厂房', value: 2900 },
  { name: '住宅小区', value: 2400 },
  { name: '医院', value: 1800 },
  { name: '学校', value: 1500 },
  { name: '文化场馆', value: 900 },
  { name: '其他', value: 600 },
];

const energyData = [
  { name: '电力', value: 5200 },
  { name: '天然气', value: 3800 },
  { name: '煤炭', value: 2600 },
  { name: '汽油', value: 2100 },
  { name: '柴油', value: 1900 },
  { name: '其他', value: 800 },
];

export const RegionalRanking = ({ selectedFilter, onRegionClick }: RegionalRankingProps) => {
  // 根据选择的筛选条件选择不同的数据
  const getData = () => {
    switch (selectedFilter) {
      case 'region':
        return regionData;
      case 'building':
        return buildingData;
      case 'energy':
        return energyData;
      default:
        return regionData;
    }
  };
  
  const data = getData().sort((a, b) => b.value - a.value);
  
  const getTitle = () => {
    switch (selectedFilter) {
      case 'region':
        return '区域';
      case 'building':
        return '建筑类型';
      case 'energy':
        return '能源类型';
      default:
        return '区域';
    }
  };
  
  const handleClick = (data: any) => {
    if (selectedFilter === 'region') {
      onRegionClick(data.name);
    }
  };
  
  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 5, bottom: 5, left: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}kg`}
            fontSize={12}
          />
          <YAxis
            dataKey="name"
            type="category"
            axisLine={false}
            tickLine={false}
            width={80}
            fontSize={12}
          />
          <Tooltip
            formatter={(value) => [`${value} kg`, `碳排放量`]}
            cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
          />
          <Bar
            dataKey="value"
            fill="#22c55e"
            barSize={20}
            radius={[0, 4, 4, 0]}
            onClick={handleClick}
            cursor={selectedFilter === 'region' ? 'pointer' : 'default'}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="text-xs text-center text-muted-foreground mt-2">
        {selectedFilter === 'region' ? '点击区域查看详情' : `按${getTitle()}排序的碳排放量`}
      </div>
    </div>
  );
};

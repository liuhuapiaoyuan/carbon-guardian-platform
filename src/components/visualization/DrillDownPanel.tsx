
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, BarChart2, FileBarChart2, LucideCalendarClock } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface DrillDownPanelProps {
  region: string;
  filterType: string;
}

// 惠安县模拟数据 - 按月度的碳排放数据
const monthlyData = {
  '惠安城区': [
    { name: '一月', value: 380 },
    { name: '二月', value: 320 },
    { name: '三月', value: 350 },
    { name: '四月', value: 410 },
    { name: '五月', value: 390 },
    { name: '六月', value: 420 },
    { name: '七月', value: 450 },
    { name: '八月', value: 480 },
    { name: '九月', value: 460 },
    { name: '十月', value: 400 },
    { name: '十一月', value: 380 },
    { name: '十二月', value: 390 },
  ],
  '东桥镇': [
    { name: '一月', value: 320 },
    { name: '二月', value: 290 },
    { name: '三月', value: 300 },
    { name: '四月', value: 330 },
    { name: '五月', value: 340 },
    { name: '六月', value: 350 },
    { name: '七月', value: 370 },
    { name: '八月', value: 380 },
    { name: '九月', value: 350 },
    { name: '十月', value: 330 },
    { name: '十一月', value: 310 },
    { name: '十二月', value: 330 },
  ],
  '崇武镇': [
    { name: '一月', value: 220 },
    { name: '二月', value: 210 },
    { name: '三月', value: 240 },
    { name: '四月', value: 230 },
    { name: '五月', value: 250 },
    { name: '六月', value: 270 },
    { name: '七月', value: 290 },
    { name: '八月', value: 300 },
    { name: '九月', value: 280 },
    { name: '十月', value: 260 },
    { name: '十一月', value: 240 },
    { name: '十二月', value: 230 },
  ],
  '黄塘镇': [
    { name: '一月', value: 180 },
    { name: '二月', value: 170 },
    { name: '三月', value: 190 },
    { name: '四月', value: 200 },
    { name: '五月', value: 210 },
    { name: '六月', value: 220 },
    { name: '七月', value: 230 },
    { name: '八月', value: 240 },
    { name: '九月', value: 220 },
    { name: '十月', value: 200 },
    { name: '十一月', value: 190 },
    { name: '十二月', value: 180 },
  ],
};

// 按建筑类型的碳排放数据
const buildingTypeData = {
  '惠安城区': [
    { name: '政府办公楼', value: 1200 },
    { name: '商业建筑', value: 980 },
    { name: '工业厂房', value: 650 },
    { name: '住宅小区', value: 850 },
    { name: '医院', value: 520 },
  ],
  '东桥镇': [
    { name: '政府办公楼', value: 800 },
    { name: '商业建筑', value: 750 },
    { name: '工业厂房', value: 1200 },
    { name: '住宅小区', value: 600 },
    { name: '医院', value: 250 },
  ],
  '崇武镇': [
    { name: '政府办公楼', value: 600 },
    { name: '商业建筑', value: 850 },
    { name: '工业厂房', value: 400 },
    { name: '住宅小区', value: 720 },
    { name: '医院', value: 230 },
  ],
  '黄塘镇': [
    { name: '政府办公楼', value: 500 },
    { name: '商业建筑', value: 420 },
    { name: '工业厂房', value: 780 },
    { name: '住宅小区', value: 380 },
    { name: '医院', value: 220 },
  ],
};

// 按能源类型的碳排放数据
const energyTypeData = {
  '惠安城区': [
    { name: '电力', value: 1800 },
    { name: '天然气', value: 1200 },
    { name: '煤炭', value: 600 },
    { name: '石油', value: 400 },
    { name: '其他', value: 200 },
  ],
  '东桥镇': [
    { name: '电力', value: 1400 },
    { name: '天然气', value: 900 },
    { name: '煤炭', value: 800 },
    { name: '石油', value: 300 },
    { name: '其他', value: 200 },
  ],
  '崇武镇': [
    { name: '电力', value: 1200 },
    { name: '天然气', value: 800 },
    { name: '煤炭', value: 400 },
    { name: '石油', value: 300 },
    { name: '其他', value: 100 },
  ],
  '黄塘镇': [
    { name: '电力', value: 900 },
    { name: '天然气', value: 600 },
    { name: '煤炭', value: 500 },
    { name: '石油', value: 200 },
    { name: '其他', value: 100 },
  ],
};

export const DrillDownPanel = ({ region, filterType }: DrillDownPanelProps) => {
  const [chartType, setChartType] = useState('trend');
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <Building2 className="h-5 w-5 mr-2 text-muted-foreground" />
            {region} 碳排放详情
          </CardTitle>
          <CardDescription>选择不同维度查看排放详情</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={chartType} onValueChange={setChartType} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="trend">月度趋势</TabsTrigger>
              <TabsTrigger value="building">建筑分布</TabsTrigger>
              <TabsTrigger value="energy">能源分布</TabsTrigger>
            </TabsList>
            
            <TabsContent value="trend" className="mt-4">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyData[region as keyof typeof monthlyData]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} kg`, '碳排放量']} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#22c55e"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {region}2023年各月碳排放量趋势图，单位：kg CO₂当量
              </p>
            </TabsContent>
            
            <TabsContent value="building" className="mt-4">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={buildingTypeData[region as keyof typeof buildingTypeData]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} kg`, '碳排放量']} />
                    <Bar dataKey="value" fill="#16a34a" barSize={40} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {region}各类型建筑碳排放量分布，单位：kg CO₂当量
              </p>
            </TabsContent>
            
            <TabsContent value="energy" className="mt-4">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={energyTypeData[region as keyof typeof energyTypeData]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} kg`, '碳排放量']} />
                    <Bar dataKey="value" fill="#3b82f6" barSize={40} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {region}各能源类型碳排放量分布，单位：kg CO₂当量
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

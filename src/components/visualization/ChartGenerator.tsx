
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Slider } from "@/components/ui/slider";
import {
  BarChart2,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  AreaChart as AreaChartIcon,
  Download,
  RefreshCcw
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export const ChartGenerator = () => {
  const [chartType, setChartType] = useState('bar');
  const [dataSource, setDataSource] = useState('region');
  const [timeRange, setTimeRange] = useState('month');
  const [colorScheme, setColorScheme] = useState('green');
  
  // 惠安县模拟数据 - 月度碳排放
  const monthlyData = [
    { name: '一月', value: 3800 },
    { name: '二月', value: 3200 },
    { name: '三月', value: 3500 },
    { name: '四月', value: 4100 },
    { name: '五月', value: 3900 },
    { name: '六月', value: 4200 },
    { name: '七月', value: 4500 },
    { name: '八月', value: 4800 },
    { name: '九月', value: 4600 },
    { name: '十月', value: 4000 },
    { name: '十一月', value: 3800 },
    { name: '十二月', value: 3900 },
  ];
  
  // 区域数据
  const regionData = [
    { name: '惠安城区', value: 4200 },
    { name: '东桥镇', value: 3600 },
    { name: '崇武镇', value: 2800 },
    { name: '黄塘镇', value: 2300 },
    { name: '山霞镇', value: 1900 },
    { name: '净峰镇', value: 1700 },
  ];
  
  // 建筑类型数据
  const buildingData = [
    { name: '政府办公楼', value: 3800 },
    { name: '商业建筑', value: 3200 },
    { name: '工业厂房', value: 2900 },
    { name: '住宅小区', value: 2400 },
    { name: '医院', value: 1800 },
    { name: '学校', value: 1500 },
  ];
  
  // 能源类型数据
  const energyData = [
    { name: '电力', value: 5200 },
    { name: '天然气', value: 3800 },
    { name: '煤炭', value: 2600 },
    { name: '汽油', value: 2100 },
    { name: '柴油', value: 1900 },
  ];
  
  // 获取当前选择的数据源
  const getActiveData = () => {
    switch (dataSource) {
      case 'region':
        return regionData;
      case 'building':
        return buildingData;
      case 'energy':
        return energyData;
      case 'time':
        return monthlyData;
      default:
        return regionData;
    }
  };
  
  // 获取颜色方案
  const getColors = () => {
    switch (colorScheme) {
      case 'green':
        return ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'];
      case 'blue':
        return ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'];
      case 'purple':
        return ['#a855f7', '#9333ea', '#7e22ce', '#6b21a8', '#581c87'];
      case 'orange':
        return ['#f97316', '#ea580c', '#c2410c', '#9a3412', '#7c2d12'];
      default:
        return ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'];
    }
  };
  
  // 渲染选择的图表类型
  const renderChart = () => {
    const data = getActiveData();
    const colors = getColors();
    
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} kg`, '碳排放量']} />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke={colors[0]}
                strokeWidth={2}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} kg`, '碳排放量']} />
              <Legend />
              <Bar
                dataKey="value"
                fill={colors[0]}
                barSize={40}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colors[0]} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} kg`, '碳排放量']} />
              <Legend />
              <Area
                type="monotone"
                dataKey="value"
                stroke={colors[0]}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={140}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} kg`, '碳排放量']} />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return <div>请选择图表类型</div>;
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>图表类型</Label>
                <RadioGroup defaultValue={chartType} onValueChange={setChartType} className="flex flex-wrap gap-4">
                  <div className="flex flex-col items-center">
                    <div className="bg-primary/10 hover:bg-primary/20 cursor-pointer p-4 rounded-md flex items-center justify-center mb-2">
                      <BarChart2 className={`h-6 w-6 ${chartType === 'bar' ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <RadioGroupItem value="bar" id="bar" className="sr-only" />
                    <Label htmlFor="bar" className="text-xs">柱状图</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-primary/10 hover:bg-primary/20 cursor-pointer p-4 rounded-md flex items-center justify-center mb-2">
                      <LineChartIcon className={`h-6 w-6 ${chartType === 'line' ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <RadioGroupItem value="line" id="line" className="sr-only" />
                    <Label htmlFor="line" className="text-xs">折线图</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-primary/10 hover:bg-primary/20 cursor-pointer p-4 rounded-md flex items-center justify-center mb-2">
                      <AreaChartIcon className={`h-6 w-6 ${chartType === 'area' ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <RadioGroupItem value="area" id="area" className="sr-only" />
                    <Label htmlFor="area" className="text-xs">面积图</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-primary/10 hover:bg-primary/20 cursor-pointer p-4 rounded-md flex items-center justify-center mb-2">
                      <PieChartIcon className={`h-6 w-6 ${chartType === 'pie' ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <RadioGroupItem value="pie" id="pie" className="sr-only" />
                    <Label htmlFor="pie" className="text-xs">饼图</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>数据源</Label>
                <Select value={dataSource} onValueChange={setDataSource}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择数据源" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="region">按区域</SelectItem>
                    <SelectItem value="building">按建筑类型</SelectItem>
                    <SelectItem value="energy">按能源类型</SelectItem>
                    <SelectItem value="time">按时间</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>时间范围</Label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择时间范围" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">月度</SelectItem>
                    <SelectItem value="quarter">季度</SelectItem>
                    <SelectItem value="year">年度</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>颜色方案</Label>
                <Select value={colorScheme} onValueChange={setColorScheme}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择颜色方案" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="green">绿色主题</SelectItem>
                    <SelectItem value="blue">蓝色主题</SelectItem>
                    <SelectItem value="purple">紫色主题</SelectItem>
                    <SelectItem value="orange">橙色主题</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col space-y-2 pt-2">
                <Button className="w-full">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  更新图表
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  导出图表
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {dataSource === 'region' && '惠安县各区域碳排放量'}
                {dataSource === 'building' && '惠安县各类型建筑碳排放量'}
                {dataSource === 'energy' && '惠安县各能源类型碳排放量'}
                {dataSource === 'time' && '惠安县月度碳排放量趋势'}
              </h3>
            </div>
            
            <div className="h-[400px]">
              {renderChart()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

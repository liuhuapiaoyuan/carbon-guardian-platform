
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TreePine, 
  Leaf, 
  MountainSnow, 
  Clock, 
  BarChart2,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample data for forest coverage
const forestCoverageData = [
  { year: '2018', coverage: 56.3, area: 15783, growthRate: 0.4 },
  { year: '2019', coverage: 56.9, area: 15944, growthRate: 1.0 },
  { year: '2020', coverage: 57.6, area: 16150, growthRate: 1.3 },
  { year: '2021', coverage: 58.4, area: 16379, growthRate: 1.4 },
  { year: '2022', coverage: 59.1, area: 16570, growthRate: 1.2 },
  { year: '2023', coverage: 59.7, area: 16742, growthRate: 1.0 },
];

// Sample data for green area
const greenAreaData = [
  { year: '2018', area: 2350, growthRate: 0.8 },
  { year: '2019', area: 2420, growthRate: 3.0 },
  { year: '2020', area: 2515, growthRate: 3.9 },
  { year: '2021', area: 2630, growthRate: 4.6 },
  { year: '2022', area: 2740, growthRate: 4.2 },
  { year: '2023', area: 2850, growthRate: 4.0 },
];

// Sample data for carbon sink by type
const carbonSinkByTypeData = [
  { name: '森林碳汇', value: 18500, color: '#10B981' },
  { name: '绿化碳汇', value: 5300, color: '#6EE7B7' },
  { name: '湿地碳汇', value: 3200, color: '#34D399' },
  { name: '农田碳汇', value: 2000, color: '#A7F3D0' },
];

// Sample data for carbon sink comparison by region
const regionComparisonData = [
  { name: '福州市', forest: 4200, green: 1200 },
  { name: '厦门市', forest: 2800, green: 1400 },
  { name: '泉州市', forest: 3800, green: 950 },
  { name: '漳州市', forest: 3200, green: 850 },
  { name: '莆田市', forest: 2100, green: 550 },
  { name: '三明市', forest: 3900, green: 450 },
];

// Sample data for carbon sink targets
const carbonSinkTargetData = [
  {
    title: '森林覆盖率',
    current: 59.7,
    target: 65.0,
    percentage: 92,
    trend: 1.0,
    unit: '%'
  },
  {
    title: '森林碳汇',
    current: 18500,
    target: 22000,
    percentage: 84,
    trend: 3.2,
    unit: '吨CO₂'
  },
  {
    title: '绿化面积',
    current: 2850,
    target: 3500,
    percentage: 81,
    trend: 4.0,
    unit: '公顷'
  },
  {
    title: '林地面积',
    current: 16742,
    target: 17500,
    percentage: 96,
    trend: 1.0,
    unit: 'km²'
  }
];

const CarbonSinkDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {carbonSinkTargetData.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.title}</h3>
                {item.title === '森林覆盖率' ? (
                  <TreePine className="h-5 w-5 text-green-500" />
                ) : item.title === '绿化面积' ? (
                  <Leaf className="h-5 w-5 text-green-500" />
                ) : item.title === '森林碳汇' ? (
                  <MountainSnow className="h-5 w-5 text-green-500" />
                ) : (
                  <Clock className="h-5 w-5 text-green-500" />
                )}
              </div>
              
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold">{item.current.toLocaleString()}</span>
                <span className="text-sm text-gray-500">{item.unit}</span>
              </div>
              
              <div className="mt-4 mb-1 flex justify-between items-center text-xs text-gray-500">
                <span>目标 {item.target.toLocaleString()} {item.unit}</span>
                <span>{item.percentage}%</span>
              </div>
              
              <Progress value={item.percentage} className="h-1.5" />
              
              <div className="mt-2 flex justify-end">
                <span className="text-xs font-medium text-green-600">↑ {item.trend}% 同比增长</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Forest Coverage Trend */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">森林覆盖率变化趋势</CardTitle>
                <CardDescription>历年森林覆盖率与增长率</CardDescription>
              </div>
              <Tabs defaultValue="chart" className="w-[120px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chart">
                    <LineChartIcon className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="bar">
                    <BarChart2 className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="chart" className="w-full">
              <TabsContent value="chart" className="mt-0">
                <div className="h-80 pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={forestCoverageData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" strokeOpacity={0.1} />
                      <XAxis dataKey="year" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 2]} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          borderRadius: '8px',
                          border: '1px solid #eee',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value, name) => {
                          if (name === 'coverage') return [`${value}%`, '森林覆盖率'];
                          if (name === 'growthRate') return [`${value}%`, '同比增长率'];
                          return [value, name];
                        }}
                      />
                      <Legend />
                      <Line 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="coverage" 
                        name="森林覆盖率" 
                        stroke="#10B981" 
                        strokeWidth={2} 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="growthRate" 
                        name="同比增长率" 
                        stroke="#6366F1" 
                        strokeWidth={2} 
                        strokeDasharray="5 5" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="bar" className="mt-0">
                <div className="h-80 pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={forestCoverageData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" strokeOpacity={0.1} />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          borderRadius: '8px',
                          border: '1px solid #eee',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value, name) => {
                          if (name === 'coverage') return [`${value}%`, '森林覆盖率'];
                          return [value, name];
                        }}
                      />
                      <Legend />
                      <Bar dataKey="coverage" name="森林覆盖率" fill="#10B981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Green Area Trend */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">绿化面积变化趋势</CardTitle>
                <CardDescription>历年绿化面积与增长率</CardDescription>
              </div>
              <Tabs defaultValue="area" className="w-[120px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="area">
                    <BarChart2 className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="rate">
                    <LineChartIcon className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="area" className="w-full">
              <TabsContent value="area" className="mt-0">
                <div className="h-80 pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={greenAreaData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" strokeOpacity={0.1} />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          borderRadius: '8px',
                          border: '1px solid #eee',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value, name) => {
                          if (name === 'area') return [`${value} 公顷`, '绿化面积'];
                          return [value, name];
                        }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="area" 
                        name="绿化面积" 
                        stroke="#059669" 
                        fill="#A7F3D0" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="rate" className="mt-0">
                <div className="h-80 pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={greenAreaData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" strokeOpacity={0.1} />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          borderRadius: '8px',
                          border: '1px solid #eee',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value, name) => {
                          if (name === 'growthRate') return [`${value}%`, '增长率'];
                          return [value, name];
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="growthRate" 
                        name="增长率" 
                        stroke="#EA580C" 
                        strokeWidth={2} 
                        dot={{ stroke: '#EA580C', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carbon Sink by Type */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">碳汇类型分布</CardTitle>
            <CardDescription>不同类型碳汇能力占比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={carbonSinkByTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {carbonSinkByTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value.toLocaleString()} 吨CO₂`, '碳汇量']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '8px',
                      border: '1px solid #eee',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Carbon Sink by Region */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">各地区碳汇能力对比</CardTitle>
            <CardDescription>主要城市森林与绿化碳汇对比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={regionComparisonData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#444" strokeOpacity={0.1} />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={60} />
                  <Tooltip 
                    formatter={(value) => [`${value.toLocaleString()} 吨CO₂`, '碳汇量']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '8px',
                      border: '1px solid #eee',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="forest" name="森林碳汇" fill="#10B981" barSize={20} radius={[0, 4, 4, 0]} />
                  <Bar dataKey="green" name="绿化碳汇" fill="#6EE7B7" barSize={20} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Historical Data Summary */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">碳汇数据历史汇总</CardTitle>
              <CardDescription>近年来森林覆盖与绿化面积碳汇量</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              查看全部数据
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={forestCoverageData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" strokeOpacity={0.1} />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '8px',
                    border: '1px solid #eee',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value, name) => {
                    if (name === 'area') return [`${value.toLocaleString()} km²`, '森林面积'];
                    return [value, name];
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="area" 
                  name="森林面积" 
                  stroke="#047857" 
                  fill="url(#colorForest)" 
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorForest" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarbonSinkDashboard;

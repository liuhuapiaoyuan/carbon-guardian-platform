
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
import { ArrowUpDown, Download, RefreshCcw } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

export const ComparisonAnalysis = () => {
  const [comparisonType, setComparisonType] = useState('yoy');
  const [dataSource, setDataSource] = useState('region');
  const [region, setRegion] = useState('惠安城区');
  
  // 模拟数据 - 同比数据
  const yoyData = {
    '惠安城区': [
      { name: '一月', current: 380, previous: 350 },
      { name: '二月', current: 320, previous: 300 },
      { name: '三月', current: 350, previous: 320 },
      { name: '四月', current: 410, previous: 380 },
      { name: '五月', current: 390, previous: 370 },
      { name: '六月', current: 420, previous: 390 },
      { name: '七月', current: 450, previous: 410 },
      { name: '八月', current: 480, previous: 430 },
      { name: '九月', current: 460, previous: 420 },
      { name: '十月', current: 400, previous: 380 },
      { name: '十一月', current: 380, previous: 360 },
      { name: '十二月', current: 390, previous: 370 },
    ],
    '东桥镇': [
      { name: '一月', current: 320, previous: 280 },
      { name: '二月', current: 290, previous: 260 },
      { name: '三月', current: 300, previous: 270 },
      { name: '四月', current: 330, previous: 290 },
      { name: '五月', current: 340, previous: 300 },
      { name: '六月', current: 350, previous: 310 },
      { name: '七月', current: 370, previous: 330 },
      { name: '八月', current: 380, previous: 340 },
      { name: '九月', current: 350, previous: 320 },
      { name: '十月', current: 330, previous: 300 },
      { name: '十一月', current: 310, previous: 290 },
      { name: '十二月', current: 330, previous: 310 },
    ],
  };
  
  // 模拟数据 - 环比数据
  const momData = {
    '惠安城区': [
      { name: '2023年1月', current: 380, previous: 370 },
      { name: '2023年2月', current: 320, previous: 380 },
      { name: '2023年3月', current: 350, previous: 320 },
      { name: '2023年4月', current: 410, previous: 350 },
      { name: '2023年5月', current: 390, previous: 410 },
      { name: '2023年6月', current: 420, previous: 390 },
      { name: '2023年7月', current: 450, previous: 420 },
      { name: '2023年8月', current: 480, previous: 450 },
      { name: '2023年9月', current: 460, previous: 480 },
      { name: '2023年10月', current: 400, previous: 460 },
      { name: '2023年11月', current: 380, previous: 400 },
      { name: '2023年12月', current: 390, previous: 380 },
    ],
    '东桥镇': [
      { name: '2023年1月', current: 320, previous: 310 },
      { name: '2023年2月', current: 290, previous: 320 },
      { name: '2023年3月', current: 300, previous: 290 },
      { name: '2023年4月', current: 330, previous: 300 },
      { name: '2023年5月', current: 340, previous: 330 },
      { name: '2023年6月', current: 350, previous: 340 },
      { name: '2023年7月', current: 370, previous: 350 },
      { name: '2023年8月', current: 380, previous: 370 },
      { name: '2023年9月', current: 350, previous: 380 },
      { name: '2023年10月', current: 330, previous: 350 },
      { name: '2023年11月', current: 310, previous: 330 },
      { name: '2023年12月', current: 330, previous: 310 },
    ],
  };
  
  // 模拟数据 - 基准对比数据
  const benchmarkData = {
    '惠安城区': [
      { name: '一月', value: 380, benchmark: 300 },
      { name: '二月', value: 320, benchmark: 300 },
      { name: '三月', value: 350, benchmark: 300 },
      { name: '四月', value: 410, benchmark: 300 },
      { name: '五月', value: 390, benchmark: 300 },
      { name: '六月', value: 420, benchmark: 300 },
      { name: '七月', value: 450, benchmark: 300 },
      { name: '八月', value: 480, benchmark: 300 },
      { name: '九月', value: 460, benchmark: 300 },
      { name: '十月', value: 400, benchmark: 300 },
      { name: '十一月', value: 380, benchmark: 300 },
      { name: '十二月', value: 390, benchmark: 300 },
    ],
    '东桥镇': [
      { name: '一月', value: 320, benchmark: 250 },
      { name: '二月', value: 290, benchmark: 250 },
      { name: '三月', value: 300, benchmark: 250 },
      { name: '四月', value: 330, benchmark: 250 },
      { name: '五月', value: 340, benchmark: 250 },
      { name: '六月', value: 350, benchmark: 250 },
      { name: '七月', value: 370, benchmark: 250 },
      { name: '八月', value: 380, benchmark: 250 },
      { name: '九月', value: 350, benchmark: 250 },
      { name: '十月', value: 330, benchmark: 250 },
      { name: '十一月', value: 310, benchmark: 250 },
      { name: '十二月', value: 330, benchmark: 250 },
    ],
  };
  
  // 获取当前选择的数据
  const getData = () => {
    switch (comparisonType) {
      case 'yoy':
        return yoyData[region as keyof typeof yoyData] || yoyData['惠安城区'];
      case 'mom':
        return momData[region as keyof typeof momData] || momData['惠安城区'];
      case 'benchmark':
        return benchmarkData[region as keyof typeof benchmarkData] || benchmarkData['惠安城区'];
      default:
        return yoyData['惠安城区'];
    }
  };
  
  // 渲染不同类型的对比图表
  const renderComparisonChart = () => {
    const data = getData();
    
    switch (comparisonType) {
      case 'yoy':
      case 'mom':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'current') return [`${value} kg`, '当期'];
                  if (name === 'previous') return [`${value} kg`, '同期'];
                  return [value, name];
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="current"
                name="当期"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="previous"
                name="同期"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'benchmark':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'value') return [`${value} kg`, '实际排放'];
                  if (name === 'benchmark') return [`${value} kg`, '基准值'];
                  return [value, name];
                }}
              />
              <Legend />
              <Bar
                dataKey="value"
                name="实际排放"
                fill="#22c55e"
                barSize={30}
                radius={[4, 4, 0, 0]}
              />
              <ReferenceLine y={data[0].benchmark} stroke="#ef4444" strokeDasharray="3 3" />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return <div>请选择对比类型</div>;
    }
  };
  
  // 计算增长率
  const calculateGrowthRates = () => {
    const data = getData();
    
    if (comparisonType === 'benchmark') {
      // 基准值对比直接计算与基准的差异
      const totalActual = data.reduce((sum, item) => sum + item.value, 0);
      const totalBenchmark = data.reduce((sum, item) => sum + item.benchmark, 0);
      const diffPercentage = ((totalActual - totalBenchmark) / totalBenchmark * 100).toFixed(1);
      
      return {
        totalActual,
        totalBenchmark,
        diffPercentage,
      };
    } else {
      // 同比或环比计算
      const totalCurrent = data.reduce((sum, item) => sum + item.current, 0);
      const totalPrevious = data.reduce((sum, item) => sum + item.previous, 0);
      const growthPercentage = ((totalCurrent - totalPrevious) / totalPrevious * 100).toFixed(1);
      
      return {
        totalCurrent,
        totalPrevious,
        growthPercentage,
      };
    }
  };
  
  const growthData = calculateGrowthRates();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>对比类型</Label>
                <RadioGroup defaultValue={comparisonType} onValueChange={setComparisonType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yoy" id="yoy" />
                    <Label htmlFor="yoy">同比分析 (同比去年)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mom" id="mom" />
                    <Label htmlFor="mom">环比分析 (环比上月)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="benchmark" id="benchmark" />
                    <Label htmlFor="benchmark">基准值对比</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>区域选择</Label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择区域" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="惠安城区">惠安城区</SelectItem>
                    <SelectItem value="东桥镇">东桥镇</SelectItem>
                    <SelectItem value="崇武镇">崇武镇</SelectItem>
                    <SelectItem value="黄塘镇">黄塘镇</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-base font-medium mb-3">对比结果摘要</h3>
                
                {comparisonType === 'benchmark' ? (
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">实际排放总量</div>
                      <div className="text-xl font-bold">{growthData.totalActual.toLocaleString()} kg</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">基准排放量</div>
                      <div className="text-xl font-bold">{growthData.totalBenchmark.toLocaleString()} kg</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">差异比例</div>
                      <div className={`text-xl font-bold ${Number(growthData.diffPercentage) > 0 ? 'text-rose-500' : 'text-green-500'}`}>
                        {Number(growthData.diffPercentage) > 0 ? '+' : ''}{growthData.diffPercentage}%
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">当期排放总量</div>
                      <div className="text-xl font-bold">{growthData.totalCurrent.toLocaleString()} kg</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">同期排放总量</div>
                      <div className="text-xl font-bold">{growthData.totalPrevious.toLocaleString()} kg</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">增长率</div>
                      <div className={`text-xl font-bold ${Number(growthData.growthPercentage) > 0 ? 'text-rose-500' : 'text-green-500'}`}>
                        {Number(growthData.growthPercentage) > 0 ? '+' : ''}{growthData.growthPercentage}%
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col space-y-2 pt-2">
                <Button className="w-full">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  更新分析
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  导出数据
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
                {comparisonType === 'yoy' && `${region} 同比分析 (2023年与2022年对比)`}
                {comparisonType === 'mom' && `${region} 环比分析 (2023年各月对比)`}
                {comparisonType === 'benchmark' && `${region} 基准值对比分析`}
              </h3>
            </div>
            
            <div className="h-[400px]">
              {renderComparisonChart()}
            </div>
            
            <div className="text-sm text-muted-foreground mt-4">
              {comparisonType === 'yoy' && '同比分析显示当前年度与去年同期的碳排放量对比，可以评估年度间的变化趋势。'}
              {comparisonType === 'mom' && '环比分析显示当前月份与上月的碳排放量对比，可以评估短期内的变化趋势。'}
              {comparisonType === 'benchmark' && '基准值对比分析显示实际碳排放量与设定的基准值的对比，红线表示基准值水平。'}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

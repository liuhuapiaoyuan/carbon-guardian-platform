
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Calendar,
  FileBarChart2,
  Download,
  Printer,
  Share2
} from 'lucide-react';

export const ReportGenerator = () => {
  const [reportType, setReportType] = useState('monthly');
  const [region, setRegion] = useState('all');
  const [period, setPeriod] = useState('2023-12');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeComparison, setIncludeComparison] = useState(true);
  
  // 惠安县区域列表
  const regions = [
    { value: 'all', label: '全部区域' },
    { value: '惠安城区', label: '惠安城区' },
    { value: '东桥镇', label: '东桥镇' },
    { value: '崇武镇', label: '崇武镇' },
    { value: '黄塘镇', label: '黄塘镇' },
    { value: '山霞镇', label: '山霞镇' },
    { value: '净峰镇', label: '净峰镇' },
    { value: '螺阳镇', label: '螺阳镇' },
    { value: '张坂镇', label: '张坂镇' },
  ];
  
  // 月份列表
  const months = [
    { value: '2023-01', label: '2023年1月' },
    { value: '2023-02', label: '2023年2月' },
    { value: '2023-03', label: '2023年3月' },
    { value: '2023-04', label: '2023年4月' },
    { value: '2023-05', label: '2023年5月' },
    { value: '2023-06', label: '2023年6月' },
    { value: '2023-07', label: '2023年7月' },
    { value: '2023-08', label: '2023年8月' },
    { value: '2023-09', label: '2023年9月' },
    { value: '2023-10', label: '2023年10月' },
    { value: '2023-11', label: '2023年11月' },
    { value: '2023-12', label: '2023年12月' },
  ];
  
  // 年份列表
  const years = [
    { value: '2023', label: '2023年' },
    { value: '2022', label: '2022年' },
    { value: '2021', label: '2021年' },
    { value: '2020', label: '2020年' },
  ];
  
  // 季度列表
  const quarters = [
    { value: '2023-Q1', label: '2023年第一季度' },
    { value: '2023-Q2', label: '2023年第二季度' },
    { value: '2023-Q3', label: '2023年第三季度' },
    { value: '2023-Q4', label: '2023年第四季度' },
  ];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>报表类型</Label>
                <RadioGroup defaultValue={reportType} onValueChange={setReportType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">月度报表</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quarterly" id="quarterly" />
                    <Label htmlFor="quarterly">季度报表</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="annual" id="annual" />
                    <Label htmlFor="annual">年度报表</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>选择区域</Label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择区域" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((r) => (
                      <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>选择时间范围</Label>
                <Select 
                  value={period} 
                  onValueChange={setPeriod}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择时间范围" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportType === 'monthly' && months.map((m) => (
                      <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                    ))}
                    {reportType === 'quarterly' && quarters.map((q) => (
                      <SelectItem key={q.value} value={q.value}>{q.label}</SelectItem>
                    ))}
                    {reportType === 'annual' && years.map((y) => (
                      <SelectItem key={y.value} value={y.value}>{y.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label>报表内容</Label>
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="charts" 
                    checked={includeCharts}
                    onCheckedChange={(checked) => setIncludeCharts(!!checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="charts">包含图表分析</Label>
                    <p className="text-xs text-muted-foreground">添加各类碳排放分析图表</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="comparison" 
                    checked={includeComparison}
                    onCheckedChange={(checked) => setIncludeComparison(!!checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="comparison">包含同比环比分析</Label>
                    <p className="text-xs text-muted-foreground">与历史同期数据进行对比分析</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 pt-2">
                <Button className="w-full">
                  <FileBarChart2 className="h-4 w-4 mr-2" />
                  生成报表
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    导出
                  </Button>
                  <Button variant="outline">
                    <Printer className="h-4 w-4 mr-2" />
                    打印
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">报表预览</h3>
              <div className="text-sm text-muted-foreground">
                {reportType === 'monthly' && '月度报表'}
                {reportType === 'quarterly' && '季度报表'}
                {reportType === 'annual' && '年度报表'}
              </div>
            </div>
            
            <div className="bg-muted/40 border border-dashed rounded-md p-6 flex flex-col items-center justify-center h-[500px]">
              <FileBarChart2 className="h-16 w-16 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">报表将在此处预览</h3>
              <p className="text-sm text-muted-foreground max-w-md text-center mt-2">
                选择所需的报表类型、区域和时间范围，然后点击"生成报表"按钮查看预览
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

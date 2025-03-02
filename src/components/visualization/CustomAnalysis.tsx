
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar,
  BarChart2,
  LineChart,
  PieChart,
  FileBarChart2,
  Download,
  RefreshCcw,
  BarChart3,
  ArrowUpDown,
  CalendarRange
} from 'lucide-react';
import { ReportGenerator } from './ReportGenerator';
import { ChartGenerator } from './ChartGenerator';
import { ComparisonAnalysis } from './ComparisonAnalysis';

const CustomAnalysis = () => {
  const [analysisType, setAnalysisType] = useState('report');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">自定义分析工具</h2>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          <span>导出数据</span>
        </Button>
      </div>
      
      <Tabs value={analysisType} onValueChange={setAnalysisType} className="w-full space-y-6">
        <TabsList className="w-full max-w-xl grid grid-cols-3">
          <TabsTrigger value="report" className="flex items-center">
            <FileBarChart2 className="h-4 w-4 mr-2" />
            <span>报表生成</span>
          </TabsTrigger>
          <TabsTrigger value="chart" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            <span>图表工具</span>
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            <span>数据对比</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="report" className="mt-6">
          <ReportGenerator />
        </TabsContent>
        
        <TabsContent value="chart" className="mt-6">
          <ChartGenerator />
        </TabsContent>
        
        <TabsContent value="comparison" className="mt-6">
          <ComparisonAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomAnalysis;

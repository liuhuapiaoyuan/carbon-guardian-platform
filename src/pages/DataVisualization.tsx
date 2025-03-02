
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Download, FileBarChart, BarChart3 } from 'lucide-react';
import CarbonDashboard from '@/components/visualization/CarbonDashboard';
import CustomAnalysis from '@/components/visualization/CustomAnalysis';

const DataVisualization = () => {
  return (
    <MainLayout>
      <PageHeader 
        title="数据可视化与分析" 
        subtitle="碳排放数据多维度可视化展示与分析工具"
      >
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            <span>导出数据</span>
          </Button>
          <Button variant="default" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            <span>生成报表</span>
          </Button>
        </div>
      </PageHeader>
      
      <Tabs defaultValue="dashboard" className="w-full space-y-6">
        <TabsList className="w-full max-w-md grid grid-cols-2">
          <TabsTrigger value="dashboard" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            <span>碳排放一张图</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center">
            <FileBarChart className="h-4 w-4 mr-2" />
            <span>自定义分析</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <CarbonDashboard />
        </TabsContent>
        
        <TabsContent value="analysis" className="mt-6">
          <CustomAnalysis />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default DataVisualization;

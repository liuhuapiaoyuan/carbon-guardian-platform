
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  ArrowUpDown,
  FileInput,
  FileUp,
  BarChart2,
  PieChart,
  TreePine,
  LineChart,
  Landmark,
  Download,
  Calendar,
  Leaf,
  PlusCircle,
  RefreshCcw,
  Clock
} from 'lucide-react';
import CarbonSinkFileUpload from '@/components/carbon-sink/CarbonSinkFileUpload';
import CarbonSinkDashboard from '@/components/carbon-sink/CarbonSinkDashboard';
import CarbonSinkHistory from '@/components/carbon-sink/CarbonSinkHistory';

const CarbonSink = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <MainLayout>
      <PageHeader 
        title="碳汇监测" 
        subtitle="森林覆盖与绿化面积碳汇能力监测与数据管理"
      >
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            <span>导出报告</span>
          </Button>
          <Button variant="default" size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            <span>新增数据</span>
          </Button>
        </div>
      </PageHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="h-10">
            <TabsTrigger value="dashboard" className="text-sm px-4 py-2">
              <Leaf className="h-4 w-4 mr-2" />
              碳汇概览
            </TabsTrigger>
            <TabsTrigger value="upload" className="text-sm px-4 py-2">
              <FileUp className="h-4 w-4 mr-2" />
              数据上传
            </TabsTrigger>
            <TabsTrigger value="history" className="text-sm px-4 py-2">
              <Clock className="h-4 w-4 mr-2" />
              历史数据
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="mt-0">
          <CarbonSinkDashboard />
        </TabsContent>
        
        <TabsContent value="upload" className="mt-0">
          <CarbonSinkFileUpload />
        </TabsContent>
        
        <TabsContent value="history" className="mt-0">
          <CarbonSinkHistory />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default CarbonSink;

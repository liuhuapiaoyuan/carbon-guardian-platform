
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ManualDataForm from '@/components/data-collection/ManualDataForm';
import FileImport from '@/components/data-collection/FileImport';
import ApiIntegration from '@/components/data-collection/ApiIntegration';
import IntegrationLogs from '@/components/data-collection/IntegrationLogs';
import { Button } from '@/components/ui/button';
import { PlusCircle, Workflow, FileSpreadsheet, WifiIcon, History } from 'lucide-react';

const DataCollection = () => {
  const [activeTab, setActiveTab] = useState('manual');

  return (
    <MainLayout>
      <PageHeader 
        title="数据采集" 
        subtitle="支持手动上报和自动对接的碳排放数据采集模块"
      >
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          <span>新数据上报</span>
        </Button>
      </PageHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="h-10">
            <TabsTrigger value="manual" className="text-sm px-4 py-2">
              <Workflow className="h-4 w-4 mr-2" />
              手动上报
            </TabsTrigger>
            <TabsTrigger value="file-import" className="text-sm px-4 py-2">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              文件导入
            </TabsTrigger>
            <TabsTrigger value="api" className="text-sm px-4 py-2">
              <WifiIcon className="h-4 w-4 mr-2" />
              接口对接
            </TabsTrigger>
            <TabsTrigger value="logs" className="text-sm px-4 py-2">
              <History className="h-4 w-4 mr-2" />
              调用日志
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="manual" className="mt-0">
          <ManualDataForm />
        </TabsContent>
        
        <TabsContent value="file-import" className="mt-0">
          <FileImport />
        </TabsContent>
        
        <TabsContent value="api" className="mt-0">
          <ApiIntegration />
        </TabsContent>
        
        <TabsContent value="logs" className="mt-0">
          <IntegrationLogs />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default DataCollection;

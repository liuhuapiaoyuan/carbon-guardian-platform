
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, ClipboardList, Settings, History, CheckCircle2 } from 'lucide-react';
import AlertThresholds from '@/components/alerts/AlertThresholds';
import AlertsList from '@/components/alerts/AlertsList';
import TasksList from '@/components/alerts/TasksList';
import TasksTracking from '@/components/alerts/TasksTracking';

const AlertsAndTasks = () => {
  const [activeTab, setActiveTab] = useState('alerts');
  const [alertsSubTab, setAlertsSubTab] = useState('list');
  const [tasksSubTab, setTasksSubTab] = useState('list');

  return (
    <MainLayout>
      <PageHeader 
        title="预警与任务管理" 
        subtitle="监控异常情况，及时处理碳排放相关任务"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="h-10">
            <TabsTrigger value="alerts" className="text-sm px-4 py-2">
              <Bell className="h-4 w-4 mr-2" />
              智能预警
            </TabsTrigger>
            <TabsTrigger value="tasks" className="text-sm px-4 py-2">
              <ClipboardList className="h-4 w-4 mr-2" />
              任务闭环
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="alerts" className="mt-0">
          <Tabs value={alertsSubTab} onValueChange={setAlertsSubTab} className="w-full">
            <div className="flex justify-start items-center mb-6">
              <TabsList className="h-9">
                <TabsTrigger value="list" className="text-xs px-3 py-1.5">
                  <History className="h-3.5 w-3.5 mr-1.5" />
                  预警记录
                </TabsTrigger>
                <TabsTrigger value="thresholds" className="text-xs px-3 py-1.5">
                  <Settings className="h-3.5 w-3.5 mr-1.5" />
                  阈值配置
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="list" className="mt-0">
              <AlertsList />
            </TabsContent>
            
            <TabsContent value="thresholds" className="mt-0">
              <AlertThresholds />
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-0">
          <Tabs value={tasksSubTab} onValueChange={setTasksSubTab} className="w-full">
            <div className="flex justify-start items-center mb-6">
              <TabsList className="h-9">
                <TabsTrigger value="list" className="text-xs px-3 py-1.5">
                  <ClipboardList className="h-3.5 w-3.5 mr-1.5" />
                  任务列表
                </TabsTrigger>
                <TabsTrigger value="tracking" className="text-xs px-3 py-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                  执行跟踪
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="list" className="mt-0">
              <TasksList />
            </TabsContent>
            
            <TabsContent value="tracking" className="mt-0">
              <TasksTracking />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default AlertsAndTasks;

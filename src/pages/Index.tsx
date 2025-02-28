
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { EmissionsChart } from '@/components/dashboard/EmissionsChart';
import { EmissionsByTypeChart } from '@/components/dashboard/EmissionsByTypeChart';
import { RegionalEmissionsChart } from '@/components/dashboard/RegionalEmissionsChart';
import { CarbonSinkCard } from '@/components/dashboard/CarbonSinkCard';
import { AlertsTable, Alert } from '@/components/dashboard/AlertsTable';
import { Button } from '@/components/ui/button';
import { Activity, AlertTriangle, BarChart3, Clock, Building2, Leaf } from 'lucide-react';

// Sample data for carbon sink
const carbonSinkData = [
  {
    label: '森林碳汇',
    current: 4200,
    target: 5000,
    percentage: 84,
    trend: 5.2,
  },
  {
    label: '绿化面积',
    current: 2800,
    target: 4000,
    percentage: 70,
    trend: 3.8,
  },
  {
    label: '湿地碳汇',
    current: 1600,
    target: 2500,
    percentage: 64,
    trend: -2.1,
  },
];

// Sample data for alerts
const alertsData: Alert[] = [
  {
    id: 1,
    title: '林业大厦电力消耗异常',
    location: '福州市鼓楼区',
    timestamp: '今天 09:41',
    type: 'high',
    status: 'open',
  },
  {
    id: 2,
    title: '行政中心天然气用量超标',
    location: '厦门市思明区',
    timestamp: '今天 10:22',
    type: 'medium',
    status: 'assigned',
  },
  {
    id: 3,
    title: '公务车队燃油消耗增加',
    location: '泉州市丰泽区',
    timestamp: '昨天 16:18',
    type: 'low',
    status: 'resolved',
  },
  {
    id: 4,
    title: '环保局办公楼能耗异常',
    location: '莆田市城厢区',
    timestamp: '昨天 14:35',
    type: 'medium',
    status: 'open',
  },
];

const Index = () => {
  return (
    <MainLayout>
      <PageHeader 
        title="碳排放概览" 
        subtitle="欢迎使用碳排放监测平台，查看实时数据和分析报告"
      >
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            <span>生成报告</span>
          </Button>
          <Button variant="default" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            <span>查看大屏</span>
          </Button>
        </div>
      </PageHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="总碳排放量" 
          value="42,560 kg" 
          icon={<Activity className="h-5 w-5" />}
          trend={{ value: 3.2, label: "同比上月", positive: false }}
          info="所有监测点碳排放总量，按CO2当量计算"
        />
        <StatCard 
          title="监测楼栋数" 
          value="128" 
          icon={<Building2 className="h-5 w-5" />}
          trend={{ value: 5.8, label: "本季度增长", positive: true }}
        />
        <StatCard 
          title="碳汇总量" 
          value="18,920 kg" 
          icon={<Leaf className="h-5 w-5" />}
          trend={{ value: 2.3, label: "同比上月", positive: true }}
        />
        <StatCard 
          title="活跃预警" 
          value="12" 
          icon={<AlertTriangle className="h-5 w-5" />}
          trend={{ value: 4.1, label: "同比上周", positive: false }}
          className="bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/20"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <EmissionsChart />
        </div>
        <div>
          <EmissionsByTypeChart />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <RegionalEmissionsChart />
        </div>
        <div>
          <CarbonSinkCard data={carbonSinkData} />
        </div>
      </div>
      
      <div className="mb-6">
        <AlertsTable alerts={alertsData} />
      </div>
    </MainLayout>
  );
};

export default Index;

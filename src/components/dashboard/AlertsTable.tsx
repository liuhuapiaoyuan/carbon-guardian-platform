
import React from 'react';
import { ChartCard } from './ChartCard';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

export interface Alert {
  id: number;
  title: string;
  location: string;
  timestamp: string;
  type: 'high' | 'medium' | 'low';
  status: 'open' | 'assigned' | 'resolved';
}

interface AlertsTableProps {
  alerts: Alert[];
}

export const AlertsTable = ({ alerts }: AlertsTableProps) => {
  const getStatusText = (status: Alert['status']) => {
    switch (status) {
      case 'open':
        return '待处理';
      case 'assigned':
        return '已分配';
      case 'resolved':
        return '已解决';
      default:
        return status;
    }
  };

  const getTypeText = (type: Alert['type']) => {
    switch (type) {
      case 'high':
        return '高';
      case 'medium':
        return '中';
      case 'low':
        return '低';
      default:
        return type;
    }
  };

  const getStatusColor = (status: Alert['status']) => {
    switch (status) {
      case 'open':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300';
      case 'assigned':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'resolved':
        return 'bg-carbon-green-100 text-carbon-green-800 dark:bg-carbon-green-900/30 dark:text-carbon-green-300';
      default:
        return '';
    }
  };

  const getTypeColor = (type: Alert['type']) => {
    switch (type) {
      case 'high':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'low':
        return 'bg-carbon-green-100 text-carbon-green-800 dark:bg-carbon-green-900/30 dark:text-carbon-green-300';
      default:
        return '';
    }
  };

  return (
    <ChartCard
      title="最近预警"
      description="需要处理的碳排放异常预警"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-carbon-gray-200 dark:border-carbon-gray-800">
              <th className="px-6 py-3 text-left text-xs font-medium text-carbon-gray-500 dark:text-carbon-gray-400 uppercase tracking-wider">预警内容</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-carbon-gray-500 dark:text-carbon-gray-400 uppercase tracking-wider">优先级</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-carbon-gray-500 dark:text-carbon-gray-400 uppercase tracking-wider">位置</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-carbon-gray-500 dark:text-carbon-gray-400 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-carbon-gray-500 dark:text-carbon-gray-400 uppercase tracking-wider">时间</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-carbon-gray-500 dark:text-carbon-gray-400 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-carbon-gray-200 dark:divide-carbon-gray-800">
            {alerts.map((alert) => (
              <tr key={alert.id} className="hover:bg-carbon-gray-50 dark:hover:bg-carbon-gray-900/50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-carbon-gray-900 dark:text-carbon-gray-100">
                    {alert.title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge className={cn("font-normal", getTypeColor(alert.type))}>
                    {getTypeText(alert.type)}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-carbon-gray-500 dark:text-carbon-gray-400">
                    {alert.location}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge className={cn("font-normal", getStatusColor(alert.status))}>
                    {getStatusText(alert.status)}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-carbon-gray-500 dark:text-carbon-gray-400">
                    {alert.timestamp}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="outline" size="sm">
                    查看
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartCard>
  );
};

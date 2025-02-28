
import React from 'react';
import { ChartCard } from './ChartCard';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface CarbonSinkProps {
  data: {
    current: number;
    target: number;
    label: string;
    percentage: number;
    trend: number;
  }[];
}

export const CarbonSinkCard = ({ data }: CarbonSinkProps) => {
  return (
    <ChartCard
      title="碳汇能力"
      description="森林覆盖与绿化面积碳汇能力"
    >
      <div className="p-6 divide-y divide-carbon-gray-200 dark:divide-carbon-gray-800">
        {data.map((item, index) => (
          <div 
            key={index} 
            className={cn(
              "py-4", 
              index === 0 ? "pt-0" : "",
              index === data.length - 1 ? "pb-0" : ""
            )}
          >
            <div className="flex justify-between items-center mb-1">
              <div>
                <span className="text-sm font-medium text-carbon-gray-700 dark:text-carbon-gray-300">
                  {item.label}
                </span>
              </div>
              <div className="text-xs text-carbon-gray-500 dark:text-carbon-gray-400">
                {item.current.toLocaleString()} / {item.target.toLocaleString()} 吨
              </div>
            </div>
            <Progress value={item.percentage} className="h-2 mt-1.5 mb-2" />
            <div className="flex justify-between items-center mt-1">
              <div className="text-xs text-carbon-gray-500 dark:text-carbon-gray-400">
                完成目标的 {item.percentage}%
              </div>
              <div className="text-xs">
                <span className={cn(
                  "font-medium",
                  item.trend > 0 
                    ? "text-carbon-green-600 dark:text-carbon-green-500" 
                    : "text-rose-600 dark:text-rose-500"
                )}>
                  {item.trend > 0 ? "↑" : "↓"} {Math.abs(item.trend)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
};

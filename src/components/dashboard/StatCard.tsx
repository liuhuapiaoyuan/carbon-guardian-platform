
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  info?: string;
  className?: string;
}

export const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  info,
  className 
}: StatCardProps) => {
  return (
    <div className={cn("carbon-stat group", className)}>
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <h3 className="stat-label flex items-center gap-2">
            {title}
            {info && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-3.5 w-3.5 text-carbon-gray-400 hover:text-carbon-gray-500 dark:text-carbon-gray-500 dark:hover:text-carbon-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">{info}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </h3>
        </div>
        {icon && <div className="text-carbon-gray-400 group-hover:text-carbon-green-500 dark:text-carbon-gray-500 dark:group-hover:text-carbon-green-500 transition-colors">{icon}</div>}
      </div>
      <div className="mt-1">
        <div className="stat-value">{value}</div>
        {trend && (
          <div className="flex items-center mt-1">
            <span 
              className={cn(
                "text-xs font-medium",
                trend.positive 
                  ? "text-carbon-green-600 dark:text-carbon-green-500" 
                  : "text-rose-600 dark:text-rose-500"
              )}
            >
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
            <span className="ml-1.5 text-xs text-carbon-gray-500 dark:text-carbon-gray-400">
              {trend.label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

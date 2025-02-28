
import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export const PageHeader = ({ title, subtitle, children, className }: PageHeaderProps) => {
  return (
    <div className={cn(
      "flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 mb-6 border-b border-carbon-gray-200 dark:border-carbon-gray-800",
      className
    )}>
      <div>
        <h1 className="text-2xl font-bold text-carbon-gray-900 dark:text-white">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-carbon-gray-500 dark:text-carbon-gray-400">{subtitle}</p>
        )}
      </div>
      {children && <div className="mt-4 sm:mt-0">{children}</div>}
    </div>
  );
};

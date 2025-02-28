
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart3, Building2, Settings, Users, Layers, Clock, FileText,
  PieChart, AlertTriangle, Leaf, Home, Activity, Database
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  collapsed: boolean;
  end?: boolean;
}

const SidebarItem = ({ icon: Icon, label, to, collapsed, end = false }: SidebarItemProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => cn(
        "flex items-center px-3 py-2 my-1 rounded-md group transition-all duration-200",
        collapsed ? "justify-center" : "justify-start",
        isActive 
          ? "bg-carbon-green-100 text-carbon-green-700 dark:bg-carbon-green-900/30 dark:text-carbon-green-500" 
          : "text-carbon-gray-600 dark:text-carbon-gray-400 hover:bg-carbon-gray-100 dark:hover:bg-carbon-gray-800/50"
      )}
    >
      <Icon 
        className={cn(
          "flex-shrink-0 transition-all",
          collapsed ? "w-6 h-6" : "w-5 h-5 mr-3"
        )} 
      />
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
      {collapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-carbon-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </NavLink>
  );
};

const SidebarSection = ({ title, children, collapsed }: { title: string; children: React.ReactNode; collapsed: boolean }) => {
  return (
    <div className="mb-6">
      {!collapsed && (
        <h3 className="px-3 text-xs font-semibold text-carbon-gray-500 uppercase tracking-wider mb-2">
          {title}
        </h3>
      )}
      <div>{children}</div>
    </div>
  );
};

export const Sidebar = ({ collapsed }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 bg-white dark:bg-carbon-gray-950 border-r border-carbon-gray-200 dark:border-carbon-gray-800 flex flex-col py-4 transition-all duration-300 ease-in-out z-30",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className={cn("flex items-center justify-center px-4 mb-8", collapsed ? "h-10" : "h-12")}>
        {collapsed ? (
          <div className="w-8 h-8 bg-carbon-green-500 rounded-full flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
        ) : (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-carbon-green-500 rounded-full flex items-center justify-center mr-3">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-carbon-gray-900 dark:text-white">
              Carbon<span className="text-carbon-green-500">Guardian</span>
            </h1>
          </div>
        )}
      </div>

      <div className="overflow-y-auto flex-1 px-2">
        <SidebarSection title="首页" collapsed={collapsed}>
          <SidebarItem icon={Home} label="概览" to="/" collapsed={collapsed} end />
          <SidebarItem icon={BarChart3} label="数据大屏" to="/dashboard" collapsed={collapsed} />
        </SidebarSection>

        <SidebarSection title="组织管理" collapsed={collapsed}>
          <SidebarItem icon={Building2} label="组织架构" to="/organization" collapsed={collapsed} />
          <SidebarItem icon={Users} label="人员权限" to="/users" collapsed={collapsed} />
        </SidebarSection>
        
        <SidebarSection title="碳排放管理" collapsed={collapsed}>
          <SidebarItem icon={Database} label="数据采集" to="/data-collection" collapsed={collapsed} />
          <SidebarItem icon={Layers} label="楼栋管理" to="/buildings" collapsed={collapsed} />
          <SidebarItem icon={Leaf} label="碳汇监测" to="/carbon-sink" collapsed={collapsed} />
          <SidebarItem icon={Activity} label="参数管理" to="/parameters" collapsed={collapsed} />
        </SidebarSection>
        
        <SidebarSection title="任务与预警" collapsed={collapsed}>
          <SidebarItem icon={AlertTriangle} label="预警管理" to="/alerts" collapsed={collapsed} />
          <SidebarItem icon={Clock} label="任务管理" to="/tasks" collapsed={collapsed} />
        </SidebarSection>
        
        <SidebarSection title="报表分析" collapsed={collapsed}>
          <SidebarItem icon={PieChart} label="数据分析" to="/analysis" collapsed={collapsed} />
          <SidebarItem icon={FileText} label="报表生成" to="/reports" collapsed={collapsed} />
        </SidebarSection>
      </div>

      <div className="mt-auto px-2">
        <SidebarItem icon={Settings} label="系统设置" to="/settings" collapsed={collapsed} />
      </div>
    </aside>
  );
};


import React, { useState } from 'react';
import { 
  Bell, 
  Menu, 
  X, 
  ChevronDown, 
  Moon, 
  Sun, 
  Search 
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/hooks/use-theme";
import { cn } from '@/lib/utils';

interface TopNavProps {
  onToggleSidebar: () => void;
  collapsed: boolean;
}

export const TopNav = ({ onToggleSidebar, collapsed }: TopNavProps) => {
  const { theme, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-carbon-gray-950 border-b border-carbon-gray-200 dark:border-carbon-gray-800 h-16">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleSidebar}
            className="text-carbon-gray-500 hover:text-carbon-gray-900 dark:text-carbon-gray-400 dark:hover:text-carbon-gray-50"
          >
            {collapsed ? <Menu /> : <X />}
          </Button>
          
          <div className={cn(
            "ml-4 hidden md:flex transition-all overflow-hidden",
            searchOpen ? "max-w-0" : "max-w-md"
          )}>
            <h2 className="text-lg font-medium text-carbon-gray-900 dark:text-white">
              碳排放检测平台
            </h2>
          </div>

          <div className={cn(
            "hidden md:flex items-center relative transition-all ml-4",
            searchOpen ? "max-w-md w-96" : "max-w-0 w-0"
          )}>
            <Input
              type="search"
              placeholder="搜索..."
              className="w-full bg-carbon-gray-50 dark:bg-carbon-gray-900 border-carbon-gray-200 dark:border-carbon-gray-800"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-carbon-gray-500 hover:text-carbon-gray-900 dark:text-carbon-gray-400 dark:hover:text-carbon-gray-50"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="relative text-carbon-gray-500 hover:text-carbon-gray-900 dark:text-carbon-gray-400 dark:hover:text-carbon-gray-50"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="px-4 py-3 font-medium">通知</div>
              <DropdownMenuSeparator />
              <div className="py-2 max-h-[60vh] overflow-y-auto">
                <div className="px-4 py-2 hover:bg-carbon-gray-100 dark:hover:bg-carbon-gray-800 cursor-pointer">
                  <div className="flex justify-between">
                    <span className="font-medium text-sm">数据上报提醒</span>
                    <span className="text-xs text-carbon-gray-500">5分钟前</span>
                  </div>
                  <p className="text-xs text-carbon-gray-500 mt-1">
                    福建省级平台数据同步失败，请检查网络连接
                  </p>
                </div>
                <div className="px-4 py-2 hover:bg-carbon-gray-100 dark:hover:bg-carbon-gray-800 cursor-pointer">
                  <div className="flex justify-between">
                    <span className="font-medium text-sm">碳排放预警</span>
                    <span className="text-xs text-carbon-gray-500">30分钟前</span>
                  </div>
                  <p className="text-xs text-carbon-gray-500 mt-1">
                    林业大厦用电量异常增高，已超过预警阈值20%
                  </p>
                </div>
                <div className="px-4 py-2 hover:bg-carbon-gray-100 dark:hover:bg-carbon-gray-800 cursor-pointer">
                  <div className="flex justify-between">
                    <span className="font-medium text-sm">任务通知</span>
                    <span className="text-xs text-carbon-gray-500">2小时前</span>
                  </div>
                  <p className="text-xs text-carbon-gray-500 mt-1">
                    您有3个巡检任务待完成，请及时处理
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <div className="p-2">
                <Button variant="outline" size="sm" className="w-full">
                  查看全部通知
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="text-carbon-gray-500 hover:text-carbon-gray-900 dark:text-carbon-gray-400 dark:hover:text-carbon-gray-50"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-carbon-green-100 text-carbon-green-800 dark:bg-carbon-green-900 dark:text-carbon-green-300">
                    AD
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-carbon-gray-700 dark:text-carbon-gray-300 hidden md:inline-block">
                  管理员
                </span>
                <ChevronDown className="h-4 w-4 text-carbon-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>个人资料</DropdownMenuItem>
              <DropdownMenuItem>账号设置</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>退出登录</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

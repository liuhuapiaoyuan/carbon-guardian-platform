
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Search,
  Calendar,
  MapPin,
  CheckSquare,
  Clock,
  User,
  FileText,
  Filter,
  AlertTriangle
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  description: string;
  location: string;
  building?: string;
  assignee: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  relatedAlert?: string;
  createdAt: string;
}

// Sample data for Huian County, Quanzhou City, Fujian Province
const mockTasks: Task[] = [
  {
    id: 'TASK-001',
    title: '政府大楼空调系统检查',
    description: '检查政府大楼空调系统异常耗电问题，并进行必要维修',
    location: '惠安县政府大楼',
    building: '主楼',
    assignee: '张工程师',
    dueDate: '2023-06-20',
    priority: 'high',
    status: 'completed',
    relatedAlert: 'TH-001',
    createdAt: '2023-06-15'
  },
  {
    id: 'TASK-002',
    title: '第一中学水管漏水排查',
    description: '排查第一中学教学楼水管漏水情况，并进行维修',
    location: '惠安县第一中学',
    building: '教学楼',
    assignee: '李维修',
    dueDate: '2023-06-25',
    priority: 'medium',
    status: 'in-progress',
    relatedAlert: 'TH-002',
    createdAt: '2023-06-18'
  },
  {
    id: 'TASK-003',
    title: '医院天然气管道安全检查',
    description: '对人民医院天然气管道进行安全检查，确保无泄漏风险',
    location: '惠安县人民医院',
    building: '住院部',
    assignee: '王安全',
    dueDate: '2023-06-19',
    priority: 'high',
    status: 'overdue',
    relatedAlert: 'TH-003',
    createdAt: '2023-06-17'
  },
  {
    id: 'TASK-004',
    title: '文化馆照明系统优化',
    description: '对文化馆照明系统进行调整，降低峰值负荷',
    location: '惠安县文化馆',
    assignee: '陈电工',
    dueDate: '2023-06-30',
    priority: 'low',
    status: 'pending',
    relatedAlert: 'TH-004',
    createdAt: '2023-06-20'
  },
  {
    id: 'TASK-005',
    title: '公安局设备冷却系统维护',
    description: '检查并维护公安局指挥中心设备冷却系统，降低设备温度',
    location: '惠安县公安局',
    building: '指挥中心',
    assignee: '刘技术',
    dueDate: '2023-06-22',
    priority: 'high',
    status: 'in-progress',
    relatedAlert: 'TH-005',
    createdAt: '2023-06-19'
  },
  {
    id: 'TASK-006',
    title: '体育馆游泳池水质调节',
    description: '调节游泳池水质pH值至标准范围',
    location: '惠安县体育馆',
    building: '游泳馆',
    assignee: '林水务',
    dueDate: '2023-06-21',
    priority: 'medium',
    status: 'completed',
    relatedAlert: 'TH-006',
    createdAt: '2023-06-18'
  }
];

const TasksList = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    location: '',
    building: '',
    assignee: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending',
  });
  
  const { toast } = useToast();

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.location.toLowerCase().includes(search.toLowerCase()) ||
      task.assignee.toLowerCase().includes(search.toLowerCase()) ||
      task.id.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleSaveTask = () => {
    if (!newTask.title || !newTask.location || !newTask.assignee || !newTask.dueDate) {
      toast({
        title: '输入不完整',
        description: '请填写所有必要的信息',
        variant: 'destructive'
      });
      return;
    }

    const newId = `TASK-${String(tasks.length + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];
    
    setTasks([...tasks, { 
      id: newId, 
      ...newTask,
      priority: newTask.priority as Task['priority'],
      status: newTask.status as Task['status'],
      createdAt: today
    } as Task]);
    
    toast({
      title: '任务已添加',
      description: `新的任务 ${newId} 已成功添加`,
    });
    
    setIsAddingTask(false);
    setNewTask({
      title: '',
      description: '',
      location: '',
      building: '',
      assignee: '',
      dueDate: '',
      priority: 'medium',
      status: 'pending',
    });
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'low': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      default: return '';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      case 'overdue': return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300';
      default: return '';
    }
  };

  const getStatusText = (status: Task['status']) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'in-progress': return '进行中';
      case 'pending': return '待处理';
      case 'overdue': return '已逾期';
      default: return status;
    }
  };

  const getPriorityText = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return priority;
    }
  };

  return (
    <div className="space-y-6">
      <ChartCard title="任务管理" description="分配、跟踪和管理碳排放相关任务">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="搜索任务..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="状态筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有状态</SelectItem>
                <SelectItem value="pending">待处理</SelectItem>
                <SelectItem value="in-progress">进行中</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
                <SelectItem value="overdue">已逾期</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="优先级筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有优先级</SelectItem>
                <SelectItem value="high">高优先级</SelectItem>
                <SelectItem value="medium">中优先级</SelectItem>
                <SelectItem value="low">低优先级</SelectItem>
              </SelectContent>
            </Select>
            
            <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  添加任务
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>添加新任务</DialogTitle>
                  <DialogDescription>
                    创建新的碳排放相关任务
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-sm font-medium">任务标题</label>
                      <Input
                        placeholder="输入任务标题"
                        value={newTask.title || ''}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">任务描述</label>
                      <Input
                        placeholder="详细描述任务内容"
                        value={newTask.description || ''}
                        onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">位置</label>
                      <Input
                        placeholder="任务地点"
                        value={newTask.location || ''}
                        onChange={(e) => setNewTask({...newTask, location: e.target.value})}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">具体建筑（可选）</label>
                      <Input
                        placeholder="具体楼栋或区域"
                        value={newTask.building || ''}
                        onChange={(e) => setNewTask({...newTask, building: e.target.value})}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">指派给</label>
                      <Input
                        placeholder="负责人姓名"
                        value={newTask.assignee || ''}
                        onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">截止日期</label>
                      <Input
                        type="date"
                        value={newTask.dueDate || ''}
                        onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">优先级</label>
                      <Select
                        value={newTask.priority as string}
                        onValueChange={(value) => setNewTask({...newTask, priority: value as Task['priority']})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">高</SelectItem>
                          <SelectItem value="medium">中</SelectItem>
                          <SelectItem value="low">低</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">关联预警（可选）</label>
                      <Input
                        placeholder="相关预警ID"
                        value={newTask.relatedAlert || ''}
                        onChange={(e) => setNewTask({...newTask, relatedAlert: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingTask(false)}>
                    取消
                  </Button>
                  <Button onClick={handleSaveTask}>
                    保存
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>任务</TableHead>
                <TableHead>位置</TableHead>
                <TableHead>负责人</TableHead>
                <TableHead>截止日期</TableHead>
                <TableHead>优先级</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>关联预警</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    没有找到符合条件的任务
                  </TableCell>
                </TableRow>
              ) : (
                filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{task.title}</span>
                        <span className="text-xs text-gray-500 truncate max-w-[180px]">
                          {task.description}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-gray-500" />
                        <div className="flex flex-col">
                          <span>{task.location}</span>
                          {task.building && <span className="text-xs text-gray-500">{task.building}</span>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-gray-500" />
                        <span>{task.assignee}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-gray-500" />
                        <span>{task.dueDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("font-normal", getPriorityColor(task.priority))}>
                        {getPriorityText(task.priority)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("font-normal", getStatusColor(task.status))}>
                        {getStatusText(task.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {task.relatedAlert ? (
                        <div className="flex items-center gap-1.5">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                          <span>{task.relatedAlert}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">无</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </ChartCard>
    </div>
  );
};

export default TasksList;

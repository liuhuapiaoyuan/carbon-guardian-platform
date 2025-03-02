
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
  Search,
  Calendar,
  FileText,
  CheckCircle2,
  Clock,
  User,
  MessageCircle,
  BarChart3,
  Filter,
  ChevronRight,
  Upload
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface TaskFeedback {
  id: string;
  taskId: string;
  timestamp: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  content: string;
  progress: number;
  author: string;
  attachments?: string[];
}

// Sample data for Huian County, Quanzhou City, Fujian Province
const mockFeedbacks: TaskFeedback[] = [
  {
    id: 'FB-001',
    taskId: 'TASK-001',
    timestamp: '2023-06-16T09:30:00',
    status: 'in-progress',
    content: '已开始检查政府大楼空调系统，发现部分系统运行效率低下，正在进行维修',
    progress: 30,
    author: '张工程师'
  },
  {
    id: 'FB-002',
    taskId: 'TASK-001',
    timestamp: '2023-06-18T14:20:00',
    status: 'in-progress',
    content: '更换了空调系统的部分配件，系统性能有所提升，继续观察',
    progress: 70,
    author: '张工程师'
  },
  {
    id: 'FB-003',
    taskId: 'TASK-001',
    timestamp: '2023-06-19T16:45:00',
    status: 'completed',
    content: '空调系统已全面修复，能耗已恢复正常水平，任务完成',
    progress: 100,
    author: '张工程师'
  },
  {
    id: 'FB-004',
    taskId: 'TASK-002',
    timestamp: '2023-06-19T10:15:00',
    status: 'in-progress',
    content: '已排查到教学楼三楼的主水管有漏水情况，正在准备维修材料',
    progress: 40,
    author: '李维修'
  },
  {
    id: 'FB-005',
    taskId: 'TASK-003',
    timestamp: '2023-06-18T08:30:00',
    status: 'in-progress',
    content: '初步检查医院天然气管道，发现2处可能存在风险的连接点，待进一步确认',
    progress: 25,
    author: '王安全'
  },
  {
    id: 'FB-006',
    taskId: 'TASK-005',
    timestamp: '2023-06-20T11:40:00',
    status: 'in-progress',
    content: '已对指挥中心设备冷却系统进行初步调整，设备温度有所下降，但仍需优化',
    progress: 60,
    author: '刘技术'
  },
  {
    id: 'FB-007',
    taskId: 'TASK-006',
    timestamp: '2023-06-19T09:00:00',
    status: 'in-progress',
    content: '已添加pH调节剂，水质正在逐步改善中',
    progress: 50,
    author: '林水务'
  },
  {
    id: 'FB-008',
    taskId: 'TASK-006',
    timestamp: '2023-06-20T15:30:00',
    status: 'completed',
    content: '游泳池水质pH值已调整至标准范围内，水质检测正常，任务完成',
    progress: 100,
    author: '林水务'
  }
];

// List of task IDs and titles for reference
const taskRefs = [
  { id: 'TASK-001', title: '政府大楼空调系统检查' },
  { id: 'TASK-002', title: '第一中学水管漏水排查' },
  { id: 'TASK-003', title: '医院天然气管道安全检查' },
  { id: 'TASK-004', title: '文化馆照明系统优化' },
  { id: 'TASK-005', title: '公安局设备冷却系统维护' },
  { id: 'TASK-006', title: '体育馆游泳池水质调节' }
];

const TasksTracking = () => {
  const [feedbacks, setFeedbacks] = useState<TaskFeedback[]>(mockFeedbacks);
  const [search, setSearch] = useState('');
  const [taskFilter, setTaskFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddingFeedback, setIsAddingFeedback] = useState(false);
  const [newFeedback, setNewFeedback] = useState<Partial<TaskFeedback>>({
    taskId: '',
    status: 'in-progress',
    content: '',
    progress: 0,
    author: ''
  });
  
  const { toast } = useToast();

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = 
      feedback.content.toLowerCase().includes(search.toLowerCase()) ||
      feedback.author.toLowerCase().includes(search.toLowerCase()) ||
      feedback.taskId.toLowerCase().includes(search.toLowerCase());
    
    const matchesTask = taskFilter === 'all' || feedback.taskId === taskFilter;
    const matchesStatus = statusFilter === 'all' || feedback.status === statusFilter;
    
    return matchesSearch && matchesTask && matchesStatus;
  });

  // Group feedbacks by taskId
  const groupedFeedbacks = filteredFeedbacks.reduce((groups, feedback) => {
    const taskId = feedback.taskId;
    if (!groups[taskId]) {
      groups[taskId] = [];
    }
    groups[taskId].push(feedback);
    return groups;
  }, {} as Record<string, TaskFeedback[]>);

  const handleSaveFeedback = () => {
    if (!newFeedback.taskId || !newFeedback.content || !newFeedback.author) {
      toast({
        title: '输入不完整',
        description: '请填写所有必要的信息',
        variant: 'destructive'
      });
      return;
    }

    const newId = `FB-${String(feedbacks.length + 1).padStart(3, '0')}`;
    const now = new Date().toISOString();
    
    setFeedbacks([...feedbacks, { 
      id: newId, 
      ...newFeedback,
      timestamp: now,
      status: newFeedback.status as TaskFeedback['status'],
      progress: Number(newFeedback.progress) || 0
    } as TaskFeedback]);
    
    toast({
      title: '反馈已添加',
      description: `新的任务反馈已成功添加`,
    });
    
    setIsAddingFeedback(false);
    setNewFeedback({
      taskId: '',
      status: 'in-progress',
      content: '',
      progress: 0,
      author: ''
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: TaskFeedback['status']) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      case 'overdue': return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300';
      default: return '';
    }
  };

  const getStatusText = (status: TaskFeedback['status']) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'in-progress': return '进行中';
      case 'pending': return '待处理';
      case 'overdue': return '已逾期';
      default: return status;
    }
  };

  const getTaskTitle = (taskId: string) => {
    const task = taskRefs.find(t => t.id === taskId);
    return task ? task.title : taskId;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-emerald-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 30) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="space-y-6">
      <ChartCard title="任务执行跟踪" description="跟踪任务执行进度和反馈">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="搜索反馈内容..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={taskFilter} onValueChange={setTaskFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="任务筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有任务</SelectItem>
                {taskRefs.map(task => (
                  <SelectItem key={task.id} value={task.id}>
                    {task.id}: {task.title.length > 10 ? task.title.substring(0, 10) + '...' : task.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
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
            
            <Dialog open={isAddingFeedback} onOpenChange={setIsAddingFeedback}>
              <DialogTrigger asChild>
                <Button>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  添加反馈
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>添加任务反馈</DialogTitle>
                  <DialogDescription>
                    提交任务执行进度和反馈信息
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-sm font-medium">选择任务</label>
                      <Select
                        value={newFeedback.taskId || ''}
                        onValueChange={(value) => setNewFeedback({...newFeedback, taskId: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="选择要更新的任务" />
                        </SelectTrigger>
                        <SelectContent>
                          {taskRefs.map(task => (
                            <SelectItem key={task.id} value={task.id}>
                              {task.id}: {task.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">状态</label>
                      <Select
                        value={newFeedback.status || 'in-progress'}
                        onValueChange={(value) => setNewFeedback({...newFeedback, status: value as TaskFeedback['status']})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">待处理</SelectItem>
                          <SelectItem value="in-progress">进行中</SelectItem>
                          <SelectItem value="completed">已完成</SelectItem>
                          <SelectItem value="overdue">已逾期</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">进度 ({newFeedback.progress || 0}%)</label>
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={newFeedback.progress || 0}
                        onChange={(e) => setNewFeedback({...newFeedback, progress: parseInt(e.target.value)})}
                        className="w-full"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">反馈内容</label>
                      <Textarea
                        placeholder="详细描述任务进展情况"
                        value={newFeedback.content || ''}
                        onChange={(e) => setNewFeedback({...newFeedback, content: e.target.value})}
                        rows={4}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">提交人</label>
                      <Input
                        placeholder="您的姓名"
                        value={newFeedback.author || ''}
                        onChange={(e) => setNewFeedback({...newFeedback, author: e.target.value})}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">上传附件（可选）</label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-4">
                        <div className="text-center">
                          <Upload className="mx-auto h-10 w-10 text-gray-400" />
                          <div className="mt-2 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                            >
                              <span>上传文件</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">或拖放文件</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">PNG, JPG, PDF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingFeedback(false)}>
                    取消
                  </Button>
                  <Button onClick={handleSaveFeedback}>
                    提交
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="space-y-6">
          {Object.keys(groupedFeedbacks).length === 0 ? (
            <div className="rounded-md border p-8 text-center">
              <p className="text-gray-500">没有找到符合条件的任务反馈</p>
            </div>
          ) : (
            Object.keys(groupedFeedbacks).map(taskId => {
              const taskFeedbacks = groupedFeedbacks[taskId].sort((a, b) => 
                new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
              );
              const latestFeedback = taskFeedbacks[0];
              const taskTitle = getTaskTitle(taskId);
              
              return (
                <div key={taskId} className="rounded-md border overflow-hidden">
                  <div className="bg-muted px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{taskId}: {taskTitle}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={cn("font-normal", getStatusColor(latestFeedback.status))}>
                        {getStatusText(latestFeedback.status)}
                      </Badge>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-gray-500">进度:</span>
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full", getProgressColor(latestFeedback.progress))}
                            style={{ width: `${latestFeedback.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{latestFeedback.progress}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 py-2 divide-y">
                    {taskFeedbacks.map(feedback => (
                      <div key={feedback.id} className="py-3">
                        <div className="flex justify-between items-start mb-1">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">{feedback.author}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-gray-500">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{formatDate(feedback.timestamp)}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 mt-1">{feedback.content}</p>
                        {feedback.status === 'completed' && (
                          <div className="flex items-center gap-1.5 mt-2 text-emerald-600">
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="text-sm font-medium">任务已完成</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ChartCard>
    </div>
  );
};

export default TasksTracking;

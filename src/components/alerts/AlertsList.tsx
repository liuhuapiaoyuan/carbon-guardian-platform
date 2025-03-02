
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Bell, Calendar, CheckCircle, Eye, Filter, Loader2, MailIcon, MessageCircle, PhoneCall, Search } from 'lucide-react';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { cn } from '@/lib/utils';

export interface Alert {
  id: string;
  type: 'electricity' | 'water' | 'gas' | 'other';
  level: 'high' | 'medium' | 'low';
  location: string;
  building: string;
  message: string;
  timestamp: string;
  status: 'open' | 'in_progress' | 'resolved' | 'dismissed';
  notificationSent: {
    sms: boolean;
    email: boolean;
    system: boolean;
  };
}

// Sample data for Huian County, Quanzhou City, Fujian Province
const mockAlerts: Alert[] = [
  {
    id: 'ALT-001',
    type: 'electricity',
    level: 'high',
    location: '惠安县政府大楼',
    building: '主楼',
    message: '用电量突增，超过设定阈值40%',
    timestamp: '2023-06-15 08:32',
    status: 'open',
    notificationSent: { sms: true, email: true, system: true }
  },
  {
    id: 'ALT-002',
    type: 'water',
    level: 'medium',
    location: '惠安县第一中学',
    building: '教学楼',
    message: '非上课时间用水异常',
    timestamp: '2023-06-14 22:15',
    status: 'in_progress',
    notificationSent: { sms: true, email: true, system: true }
  },
  {
    id: 'ALT-003',
    type: 'gas',
    level: 'high',
    location: '惠安县人民医院',
    building: '住院部',
    message: '天然气使用量异常波动',
    timestamp: '2023-06-14 16:45',
    status: 'resolved',
    notificationSent: { sms: true, email: false, system: true }
  },
  {
    id: 'ALT-004',
    type: 'electricity',
    level: 'low',
    location: '惠安县文化馆',
    building: '多功能厅',
    message: '闭馆后仍有用电记录',
    timestamp: '2023-06-13 23:10',
    status: 'dismissed',
    notificationSent: { sms: false, email: true, system: true }
  },
  {
    id: 'ALT-005',
    type: 'electricity',
    level: 'high',
    location: '惠安县公安局',
    building: '指挥中心',
    message: '用电负荷超过安全阈值',
    timestamp: '2023-06-13 14:22',
    status: 'open',
    notificationSent: { sms: true, email: true, system: true }
  },
  {
    id: 'ALT-006',
    type: 'water',
    level: 'medium',
    location: '惠安县体育馆',
    building: '游泳馆',
    message: '水循环系统效率下降',
    timestamp: '2023-06-12 09:47',
    status: 'in_progress',
    notificationSent: { sms: false, email: true, system: true }
  },
  {
    id: 'ALT-007',
    type: 'other',
    level: 'low',
    location: '惠安县图书馆',
    building: '阅览室',
    message: '空调能效下降',
    timestamp: '2023-06-11 13:30',
    status: 'resolved',
    notificationSent: { sms: false, email: false, system: true }
  },
  {
    id: 'ALT-008',
    type: 'gas',
    level: 'high',
    location: '惠安县实验小学',
    building: '食堂',
    message: '燃气泄漏传感器告警',
    timestamp: '2023-06-10 11:55',
    status: 'resolved',
    notificationSent: { sms: true, email: true, system: true }
  },
  {
    id: 'ALT-009',
    type: 'electricity',
    level: 'medium',
    location: '惠安县行政服务中心',
    building: '一号大厅',
    message: '用电量突增超过30%',
    timestamp: '2023-06-09 15:20',
    status: 'dismissed',
    notificationSent: { sms: true, email: true, system: true }
  },
  {
    id: 'ALT-010',
    type: 'water',
    level: 'high',
    location: '惠安县第二医院',
    building: '门诊部',
    message: '水管破裂漏水',
    timestamp: '2023-06-08 07:15',
    status: 'resolved',
    notificationSent: { sms: true, email: true, system: true }
  },
];

const AlertsList = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [taskDescription, setTaskDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = 
      alert.message.toLowerCase().includes(search.toLowerCase()) ||
      alert.location.toLowerCase().includes(search.toLowerCase()) ||
      alert.building.toLowerCase().includes(search.toLowerCase()) ||
      alert.id.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    const matchesLevel = levelFilter === 'all' || alert.level === levelFilter;
    const matchesType = typeFilter === 'all' || alert.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesLevel && matchesType;
  });

  const handleStatusChange = (alertId: string, newStatus: Alert['status']) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, status: newStatus } : alert
    ));
    
    toast({
      title: '状态已更新',
      description: `预警 ${alertId} 状态已更改为 ${getStatusText(newStatus)}`,
    });
  };

  const handleCreateTask = () => {
    if (!selectedAlert || !taskDescription.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCreatingTask(false);
      
      // Update alert status to in_progress
      setAlerts(alerts.map(alert => 
        alert.id === selectedAlert.id ? { ...alert, status: 'in_progress' } : alert
      ));
      
      toast({
        title: '任务已创建',
        description: `已为预警 ${selectedAlert.id} 创建巡检任务`,
      });
    }, 1000);
  };

  const getTypeText = (type: Alert['type']) => {
    switch (type) {
      case 'electricity': return '电力';
      case 'water': return '水资源';
      case 'gas': return '天然气';
      case 'other': return '其他';
      default: return type;
    }
  };

  const getTypeIcon = (type: Alert['type']) => {
    switch (type) {
      case 'electricity': return '⚡';
      case 'water': return '💧';
      case 'gas': return '🔥';
      case 'other': return '📊';
      default: return '❓';
    }
  };

  const getLevelText = (level: Alert['level']) => {
    switch (level) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return level;
    }
  };

  const getStatusText = (status: Alert['status']) => {
    switch (status) {
      case 'open': return '未处理';
      case 'in_progress': return '处理中';
      case 'resolved': return '已解决';
      case 'dismissed': return '已忽略';
      default: return status;
    }
  };

  const getLevelColor = (level: Alert['level']) => {
    switch (level) {
      case 'high': return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'low': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      default: return '';
    }
  };

  const getStatusColor = (status: Alert['status']) => {
    switch (status) {
      case 'open': return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300';
      case 'in_progress': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'resolved': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'dismissed': return 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <ChartCard title="预警记录" description="系统监测到的异常情况与处理状态">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="搜索预警..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <Button variant="outline" size="icon" className="shrink-0">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="状态筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有状态</SelectItem>
                <SelectItem value="open">未处理</SelectItem>
                <SelectItem value="in_progress">处理中</SelectItem>
                <SelectItem value="resolved">已解决</SelectItem>
                <SelectItem value="dismissed">已忽略</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="级别筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有级别</SelectItem>
                <SelectItem value="high">高优先级</SelectItem>
                <SelectItem value="medium">中优先级</SelectItem>
                <SelectItem value="low">低优先级</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="类型筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有类型</SelectItem>
                <SelectItem value="electricity">电力</SelectItem>
                <SelectItem value="water">水资源</SelectItem>
                <SelectItem value="gas">天然气</SelectItem>
                <SelectItem value="other">其他</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>预警内容</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>优先级</TableHead>
                <TableHead>位置</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>时间</TableHead>
                <TableHead>通知</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    没有找到符合条件的预警记录
                  </TableCell>
                </TableRow>
              ) : (
                filteredAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-medium">{alert.id}</TableCell>
                    <TableCell>{alert.message}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{getTypeIcon(alert.type)}</span>
                        <span>{getTypeText(alert.type)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("font-normal", getLevelColor(alert.level))}>
                        {getLevelText(alert.level)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{alert.location}</span>
                        <span className="text-xs text-gray-500">{alert.building}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("font-normal", getStatusColor(alert.status))}>
                        {getStatusText(alert.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-gray-500" />
                        <span>{alert.timestamp}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        {alert.notificationSent.sms && (
                          <Badge variant="outline" className="px-1.5 py-0.5 h-6">
                            <PhoneCall className="h-3.5 w-3.5 text-gray-500" />
                          </Badge>
                        )}
                        {alert.notificationSent.email && (
                          <Badge variant="outline" className="px-1.5 py-0.5 h-6">
                            <MailIcon className="h-3.5 w-3.5 text-gray-500" />
                          </Badge>
                        )}
                        {alert.notificationSent.system && (
                          <Badge variant="outline" className="px-1.5 py-0.5 h-6">
                            <MessageCircle className="h-3.5 w-3.5 text-gray-500" />
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog open={isDetailOpen && selectedAlert?.id === alert.id} onOpenChange={(open) => {
                          setIsDetailOpen(open);
                          if (!open) setSelectedAlert(null);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedAlert(alert)}>
                              <Eye className="h-3.5 w-3.5 mr-1.5" />
                              查看
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>预警详情</DialogTitle>
                              <DialogDescription>
                                查看预警详细信息及处理选项
                              </DialogDescription>
                            </DialogHeader>
                            {selectedAlert && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium mb-1">预警ID</p>
                                    <p className="text-sm">{selectedAlert.id}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium mb-1">状态</p>
                                    <Badge className={cn("font-normal", getStatusColor(selectedAlert.status))}>
                                      {getStatusText(selectedAlert.status)}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium mb-1">类型</p>
                                    <p className="text-sm">{getTypeText(selectedAlert.type)}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium mb-1">优先级</p>
                                    <Badge className={cn("font-normal", getLevelColor(selectedAlert.level))}>
                                      {getLevelText(selectedAlert.level)}
                                    </Badge>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="text-sm font-medium mb-1">时间</p>
                                    <p className="text-sm">{selectedAlert.timestamp}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="text-sm font-medium mb-1">位置</p>
                                    <p className="text-sm">{selectedAlert.location} - {selectedAlert.building}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="text-sm font-medium mb-1">内容</p>
                                    <p className="text-sm">{selectedAlert.message}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="text-sm font-medium mb-1">通知方式</p>
                                    <div className="flex space-x-2">
                                      {selectedAlert.notificationSent.sms && (
                                        <Badge variant="outline">
                                          <PhoneCall className="h-3.5 w-3.5 mr-1.5" />
                                          短信
                                        </Badge>
                                      )}
                                      {selectedAlert.notificationSent.email && (
                                        <Badge variant="outline">
                                          <MailIcon className="h-3.5 w-3.5 mr-1.5" />
                                          邮件
                                        </Badge>
                                      )}
                                      {selectedAlert.notificationSent.system && (
                                        <Badge variant="outline">
                                          <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                                          系统消息
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            <DialogFooter className="flex sm:justify-between">
                              <div className="flex gap-2">
                                <Select 
                                  disabled={!selectedAlert || selectedAlert.status === 'resolved' || selectedAlert.status === 'dismissed'}
                                  value={selectedAlert?.status || ''}
                                  onValueChange={(value: Alert['status']) => {
                                    if (selectedAlert) {
                                      handleStatusChange(selectedAlert.id, value);
                                    }
                                  }}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue placeholder="更新状态" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="open">未处理</SelectItem>
                                    <SelectItem value="in_progress">处理中</SelectItem>
                                    <SelectItem value="resolved">已解决</SelectItem>
                                    <SelectItem value="dismissed">已忽略</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Dialog open={isCreatingTask} onOpenChange={setIsCreatingTask}>
                                <DialogTrigger asChild>
                                  <Button 
                                    disabled={!selectedAlert || selectedAlert.status === 'resolved' || selectedAlert.status === 'dismissed'}
                                  >
                                    创建任务
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>创建巡检任务</DialogTitle>
                                    <DialogDescription>
                                      为此预警创建一个巡检任务，指派工作人员前往现场检查
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <p className="text-sm font-medium">预警信息</p>
                                      <div className="rounded-md bg-slate-50 dark:bg-slate-900 p-3 text-sm">
                                        {selectedAlert?.location} - {selectedAlert?.building}：{selectedAlert?.message}
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <label htmlFor="task-description" className="text-sm font-medium">
                                        任务描述
                                      </label>
                                      <textarea
                                        id="task-description"
                                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="详细描述任务内容、巡检要求等..."
                                        value={taskDescription}
                                        onChange={(e) => setTaskDescription(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button 
                                      onClick={handleCreateTask}
                                      disabled={!taskDescription.trim() || isSubmitting}
                                    >
                                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                      确认创建
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
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

export default AlertsList;


import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Search,
  Download,
  Trash,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogEntry {
  id: string;
  timestamp: string;
  source: string;
  requestType: string;
  endpoint: string;
  status: 'success' | 'error' | 'warning';
  statusCode: number;
  responseTime: number;
  message: string;
  details?: string;
}

const sampleLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: '2023-06-22 14:30:05',
    source: '福建省级平台',
    requestType: 'POST',
    endpoint: '/data/sync',
    status: 'success',
    statusCode: 200,
    responseTime: 245,
    message: '数据同步成功',
    details: '成功同步45条记录',
  },
  {
    id: '2',
    timestamp: '2023-06-22 14:25:00',
    source: '福建省级平台',
    requestType: 'GET',
    endpoint: '/heartbeat',
    status: 'success',
    statusCode: 200,
    responseTime: 120,
    message: '心跳检测成功',
  },
  {
    id: '3',
    timestamp: '2023-06-22 13:30:10',
    source: '福州市数据中心',
    requestType: 'POST',
    endpoint: '/data/batch',
    status: 'warning',
    statusCode: 207,
    responseTime: 780,
    message: '部分数据处理失败',
    details: '成功: 18条, 失败: 3条 (格式错误)',
  },
  {
    id: '4',
    timestamp: '2023-06-22 12:15:32',
    source: '福建省级平台',
    requestType: 'POST',
    endpoint: '/data/sync',
    status: 'error',
    statusCode: 500,
    responseTime: 1200,
    message: '服务器内部错误',
    details: '数据库连接超时，请重试',
  },
  {
    id: '5',
    timestamp: '2023-06-22 11:42:18',
    source: '测试环境',
    requestType: 'GET',
    endpoint: '/buildings/list',
    status: 'success',
    statusCode: 200,
    responseTime: 315,
    message: '获取楼栋列表成功',
  },
  {
    id: '6',
    timestamp: '2023-06-22 10:30:45',
    source: '福建省级平台',
    requestType: 'GET',
    endpoint: '/heartbeat',
    status: 'success',
    statusCode: 200,
    responseTime: 118,
    message: '心跳检测成功',
  },
  {
    id: '7',
    timestamp: '2023-06-22 09:15:20',
    source: '福州市数据中心',
    requestType: 'POST',
    endpoint: '/data',
    status: 'error',
    statusCode: 400,
    responseTime: 142,
    message: '参数验证失败',
    details: 'buildingId不存在',
  },
];

const getStatusIcon = (status: LogEntry['status']) => {
  switch (status) {
    case 'success':
      return <CheckCircle className="h-4 w-4 text-carbon-green-500" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    case 'error':
      return <XCircle className="h-4 w-4 text-rose-500" />;
  }
};

const getStatusBadge = (status: LogEntry['status']) => {
  switch (status) {
    case 'success':
      return <Badge className="bg-carbon-green-100 text-carbon-green-800 dark:bg-carbon-green-900/30 dark:text-carbon-green-300">成功</Badge>;
    case 'warning':
      return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">警告</Badge>;
    case 'error':
      return <Badge className="bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300">错误</Badge>;
  }
};

const IntegrationLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [logs, setLogs] = useState<LogEntry[]>(sampleLogs);
  
  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) || 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.details && log.details.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || log.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });
  
  const clearLogs = () => {
    setLogs([]);
  };

  const refreshLogs = () => {
    setLogs(sampleLogs);
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0">
            <div>
              <CardTitle>接口调用日志</CardTitle>
              <CardDescription>
                查看与第三方系统的接口调用日志和异常记录
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={refreshLogs}>
                <RefreshCw className="h-4 w-4 mr-2" />
                刷新
              </Button>
              <Button variant="outline" size="sm" onClick={clearLogs}>
                <Trash className="h-4 w-4 mr-2" />
                清空
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                导出
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-carbon-gray-400" />
                <Input
                  placeholder="搜索端点或消息..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="状态筛选" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="success">成功</SelectItem>
                    <SelectItem value="warning">警告</SelectItem>
                    <SelectItem value="error">错误</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="来源筛选" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部来源</SelectItem>
                    <SelectItem value="福建省级平台">福建省级平台</SelectItem>
                    <SelectItem value="福州市数据中心">福州市数据中心</SelectItem>
                    <SelectItem value="测试环境">测试环境</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {filteredLogs.length === 0 ? (
              <div className="text-center py-10 text-carbon-gray-500 dark:text-carbon-gray-400">
                {logs.length === 0 ? '没有日志记录' : '没有符合条件的日志记录'}
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">时间</TableHead>
                      <TableHead>来源</TableHead>
                      <TableHead>请求</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>耗时</TableHead>
                      <TableHead>消息</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id} className={cn(
                        log.status === 'error' ? 'bg-rose-50/50 dark:bg-rose-950/20' : '',
                        log.status === 'warning' ? 'bg-amber-50/50 dark:bg-amber-950/20' : ''
                      )}>
                        <TableCell className="font-mono text-xs">
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1.5 text-carbon-gray-400" />
                            {log.timestamp}
                          </div>
                        </TableCell>
                        <TableCell>{log.source}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>
                              <Badge variant="outline" className="font-mono mr-1.5">
                                {log.requestType}
                              </Badge>
                              <span className="font-mono text-xs">{log.endpoint}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(log.status)}
                            <span>{log.statusCode}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={cn(
                            "text-sm font-medium",
                            log.responseTime > 1000 ? "text-rose-600 dark:text-rose-400" : "",
                            log.responseTime > 500 && log.responseTime <= 1000 ? "text-amber-600 dark:text-amber-400" : "",
                            log.responseTime <= 500 ? "text-carbon-gray-600 dark:text-carbon-gray-400" : ""
                          )}>
                            {log.responseTime} ms
                          </span>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-sm">{log.message}</div>
                            {log.details && (
                              <div className="text-xs text-carbon-gray-500 dark:text-carbon-gray-400 mt-1">
                                {log.details}
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-carbon-gray-500 dark:text-carbon-gray-400">
                显示 {filteredLogs.length} 条日志，共 {logs.length} 条
              </div>
              <div className="flex space-x-1">
                <Button variant="outline" size="sm" disabled>上一页</Button>
                <Button variant="outline" size="sm" disabled>下一页</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationLogs;

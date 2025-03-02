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
  Save, 
  Trash2, 
  Edit, 
  Plus, 
  AlertTriangle, 
  Bolt, 
  Droplets, 
  Flame,
  Settings,
  Search
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ThresholdRule {
  id: string;
  category: 'electricity' | 'water' | 'gas' | 'other';
  location: string;
  building?: string;
  metric: string;
  condition: '>' | '>=' | '<' | '<=' | '=';
  value: number;
  unit: string;
  level: 'high' | 'medium' | 'low';
  isActive: boolean;
  notifications: {
    sms: boolean;
    email: boolean;
    system: boolean;
  };
}

// Sample data for Huian County, Quanzhou City, Fujian Province
const mockRules: ThresholdRule[] = [
  {
    id: 'TH-001',
    category: 'electricity',
    location: '惠安县政府大楼',
    building: '主楼',
    metric: '用电量',
    condition: '>',
    value: 5000,
    unit: 'kWh/天',
    level: 'high',
    isActive: true,
    notifications: { sms: true, email: true, system: true }
  },
  {
    id: 'TH-002',
    category: 'water',
    location: '惠安县第一中学',
    building: '教学楼',
    metric: '用水量',
    condition: '>',
    value: 2000,
    unit: 'm³/周',
    level: 'medium',
    isActive: true,
    notifications: { sms: false, email: true, system: true }
  },
  {
    id: 'TH-003',
    category: 'gas',
    location: '惠安县人民医院',
    building: '住院部',
    metric: '天然气使用',
    condition: '>',
    value: 500,
    unit: 'm³/天',
    level: 'high',
    isActive: true,
    notifications: { sms: true, email: true, system: true }
  },
  {
    id: 'TH-004',
    category: 'electricity',
    location: '惠安县文化馆',
    metric: '峰值负荷',
    condition: '>',
    value: 80,
    unit: '%',
    level: 'medium',
    isActive: true,
    notifications: { sms: false, email: true, system: true }
  },
  {
    id: 'TH-005',
    category: 'other',
    location: '惠安县公安局',
    building: '指挥中心',
    metric: '设备温度',
    condition: '>',
    value: 40,
    unit: '°C',
    level: 'high',
    isActive: false,
    notifications: { sms: true, email: true, system: true }
  },
  {
    id: 'TH-006',
    category: 'water',
    location: '惠安县体育馆',
    building: '游泳馆',
    metric: '水质pH值',
    condition: '<',
    value: 6.5,
    unit: 'pH',
    level: 'high',
    isActive: true,
    notifications: { sms: true, email: true, system: true }
  },
  {
    id: 'TH-007',
    category: 'electricity',
    location: '惠安县图书馆',
    metric: '照明用电',
    condition: '>',
    value: 1000,
    unit: 'kWh/周',
    level: 'low',
    isActive: true,
    notifications: { sms: false, email: false, system: true }
  },
  {
    id: 'TH-008',
    category: 'gas',
    location: '惠安县实验小学',
    building: '食堂',
    metric: '燃气浓度',
    condition: '>',
    value: 0.5,
    unit: '%LEL',
    level: 'high',
    isActive: true,
    notifications: { sms: true, email: true, system: true }
  },
];

const AlertThresholds = () => {
  const [rules, setRules] = useState<ThresholdRule[]>(mockRules);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [isAddingRule, setIsAddingRule] = useState(false);
  const [isEditingRule, setIsEditingRule] = useState(false);
  const [currentRule, setCurrentRule] = useState<ThresholdRule | null>(null);
  const [newRule, setNewRule] = useState<Partial<ThresholdRule>>({
    category: 'electricity',
    metric: '',
    condition: '>',
    value: 0,
    unit: '',
    level: 'medium',
    isActive: true,
    notifications: { sms: false, email: true, system: true }
  });
  
  const { toast } = useToast();

  const filteredRules = rules.filter(rule => {
    const matchesSearch = 
      rule.location.toLowerCase().includes(search.toLowerCase()) ||
      (rule.building && rule.building.toLowerCase().includes(search.toLowerCase())) ||
      rule.metric.toLowerCase().includes(search.toLowerCase()) ||
      rule.id.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || rule.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || rule.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleToggleActive = (id: string, isActive: boolean) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, isActive } : rule
    ));
    
    toast({
      title: isActive ? '规则已启用' : '规则已禁用',
      description: `阈值规则 ${id} 已${isActive ? '启用' : '禁用'}`,
    });
  };

  const handleEditRule = (rule: ThresholdRule) => {
    setCurrentRule(rule);
    setNewRule({
      category: rule.category,
      location: rule.location,
      building: rule.building,
      metric: rule.metric,
      condition: rule.condition,
      value: rule.value,
      unit: rule.unit,
      level: rule.level,
      isActive: rule.isActive,
      notifications: { ...rule.notifications }
    });
    setIsEditingRule(true);
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
    toast({
      title: '规则已删除',
      description: `阈值规则 ${id} 已成功删除`,
    });
  };

  const handleSaveRule = () => {
    if (!newRule.location || !newRule.metric || !newRule.unit) {
      toast({
        title: '输入不完整',
        description: '请填写所有必要的信息',
        variant: 'destructive'
      });
      return;
    }

    if (isEditingRule && currentRule) {
      setRules(rules.map(rule => 
        rule.id === currentRule.id ? { ...rule, ...newRule } as ThresholdRule : rule
      ));
      toast({
        title: '规则已更新',
        description: `阈值规则 ${currentRule.id} 已成功更新`,
      });
    } else {
      const newId = `TH-${String(rules.length + 1).padStart(3, '0')}`;
      setRules([...rules, { 
        id: newId, 
        ...newRule,
        category: newRule.category as ThresholdRule['category'],
        condition: newRule.condition as ThresholdRule['condition'],
        level: newRule.level as ThresholdRule['level'],
        value: Number(newRule.value),
        isActive: newRule.isActive === undefined ? true : newRule.isActive,
        notifications: {
          sms: newRule.notifications?.sms ?? false,
          email: newRule.notifications?.email ?? true, 
          system: newRule.notifications?.system ?? true
        }
      } as ThresholdRule]);
      toast({
        title: '规则已添加',
        description: `新的阈值规则 ${newId} 已成功添加`,
      });
    }
    
    setIsAddingRule(false);
    setIsEditingRule(false);
    setCurrentRule(null);
    setNewRule({
      category: 'electricity',
      metric: '',
      condition: '>',
      value: 0,
      unit: '',
      level: 'medium',
      isActive: true,
      notifications: { sms: false, email: true, system: true }
    });
  };

  const getCategoryIcon = (category: ThresholdRule['category']) => {
    switch (category) {
      case 'electricity': return <Bolt className="h-4 w-4 text-yellow-500" />;
      case 'water': return <Droplets className="h-4 w-4 text-blue-500" />;
      case 'gas': return <Flame className="h-4 w-4 text-orange-500" />;
      case 'other': return <Settings className="h-4 w-4 text-gray-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getCategoryText = (category: ThresholdRule['category']) => {
    switch (category) {
      case 'electricity': return '电力';
      case 'water': return '水资源';
      case 'gas': return '天然气';
      case 'other': return '其他';
      default: return category;
    }
  };

  const getLevelText = (level: ThresholdRule['level']) => {
    switch (level) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return level;
    }
  };

  const getLevelColor = (level: ThresholdRule['level']) => {
    switch (level) {
      case 'high': return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'low': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      default: return '';
    }
  };

  const getConditionText = (condition: ThresholdRule['condition']) => {
    switch (condition) {
      case '>': return '大于';
      case '>=': return '大于等于';
      case '<': return '小于';
      case '<=': return '小于等于';
      case '=': return '等于';
      default: return condition;
    }
  };

  return (
    <div className="space-y-6">
      <ChartCard title="阈值配置" description="设置预警触发条件和通知方式">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="搜索阈值规则..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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
            
            <Dialog open={isAddingRule} onOpenChange={setIsAddingRule}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  添加规则
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>添加阈值规则</DialogTitle>
                  <DialogDescription>
                    设置新的碳排放监测预警阈值
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-sm font-medium">类型</label>
                      <Select
                        value={newRule.category as string}
                        onValueChange={(value) => setNewRule({...newRule, category: value as ThresholdRule['category']})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electricity">电力</SelectItem>
                          <SelectItem value="water">水资源</SelectItem>
                          <SelectItem value="gas">天然气</SelectItem>
                          <SelectItem value="other">其他</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">位置</label>
                      <Input
                        placeholder="例：惠安县政府大楼"
                        value={newRule.location || ''}
                        onChange={(e) => setNewRule({...newRule, location: e.target.value})}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">具体建筑（可选）</label>
                      <Input
                        placeholder="例：主楼"
                        value={newRule.building || ''}
                        onChange={(e) => setNewRule({...newRule, building: e.target.value})}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">监测指标</label>
                      <Input
                        placeholder="例：用电量、温度、浓度"
                        value={newRule.metric || ''}
                        onChange={(e) => setNewRule({...newRule, metric: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">条件</label>
                      <Select
                        value={newRule.condition as string}
                        onValueChange={(value) => setNewRule({...newRule, condition: value as ThresholdRule['condition']})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value=">">大于</SelectItem>
                          <SelectItem value=">=">大于等于</SelectItem>
                          <SelectItem value="<">小于</SelectItem>
                          <SelectItem value="<=">小于等于</SelectItem>
                          <SelectItem value="=">等于</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">阈值</label>
                      <Input
                        type="number"
                        value={newRule.value}
                        onChange={(e) => setNewRule({...newRule, value: parseFloat(e.target.value) || 0})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">单位</label>
                      <Input
                        placeholder="例：kWh/天, %, °C"
                        value={newRule.unit || ''}
                        onChange={(e) => setNewRule({...newRule, unit: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">优先级</label>
                      <Select
                        value={newRule.level as string}
                        onValueChange={(value) => setNewRule({...newRule, level: value as ThresholdRule['level']})}
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
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">状态</label>
                        <Switch
                          checked={newRule.isActive}
                          onCheckedChange={(checked) => setNewRule({...newRule, isActive: checked})}
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">通知方式</label>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="sms-notification"
                            checked={newRule.notifications?.sms || false}
                            onCheckedChange={(checked) => setNewRule({
                              ...newRule, 
                              notifications: {
                                sms: checked,
                                email: newRule.notifications?.email ?? true,
                                system: newRule.notifications?.system ?? true
                              }
                            })}
                          />
                          <label htmlFor="sms-notification" className="text-sm">短信通知</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="email-notification"
                            checked={newRule.notifications?.email || false}
                            onCheckedChange={(checked) => setNewRule({
                              ...newRule, 
                              notifications: {
                                sms: newRule.notifications?.sms ?? false,
                                email: checked,
                                system: newRule.notifications?.system ?? true
                              }
                            })}
                          />
                          <label htmlFor="email-notification" className="text-sm">邮件通知</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="system-notification"
                            checked={newRule.notifications?.system || false}
                            onCheckedChange={(checked) => setNewRule({
                              ...newRule, 
                              notifications: {
                                sms: newRule.notifications?.sms ?? false,
                                email: newRule.notifications?.email ?? true,
                                system: checked
                              }
                            })}
                          />
                          <label htmlFor="system-notification" className="text-sm">系统消息</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingRule(false)}>
                    取消
                  </Button>
                  <Button onClick={handleSaveRule}>
                    保存
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog open={isEditingRule} onOpenChange={setIsEditingRule}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>编辑阈值规则</DialogTitle>
                  <DialogDescription>
                    修改现有的碳排放监测预警阈值
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-sm font-medium">类型</label>
                      <Select
                        value={newRule.category as string}
                        onValueChange={(value) => setNewRule({...newRule, category: value as ThresholdRule['category']})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electricity">电力</SelectItem>
                          <SelectItem value="water">水资源</SelectItem>
                          <SelectItem value="gas">天然气</SelectItem>
                          <SelectItem value="other">其他</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">位置</label>
                      <Input
                        placeholder="例：惠安县政府大楼"
                        value={newRule.location || ''}
                        onChange={(e) => setNewRule({...newRule, location: e.target.value})}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">具体建筑（可选）</label>
                      <Input
                        placeholder="例：主楼"
                        value={newRule.building || ''}
                        onChange={(e) => setNewRule({...newRule, building: e.target.value})}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">监测指标</label>
                      <Input
                        placeholder="例：用电量、温度、浓度"
                        value={newRule.metric || ''}
                        onChange={(e) => setNewRule({...newRule, metric: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">条件</label>
                      <Select
                        value={newRule.condition as string}
                        onValueChange={(value) => setNewRule({...newRule, condition: value as ThresholdRule['condition']})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value=">">大于</SelectItem>
                          <SelectItem value=">=">大于等于</SelectItem>
                          <SelectItem value="<">小于</SelectItem>
                          <SelectItem value="<=">小于等于</SelectItem>
                          <SelectItem value="=">等于</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">阈值</label>
                      <Input
                        type="number"
                        value={newRule.value}
                        onChange={(e) => setNewRule({...newRule, value: parseFloat(e.target.value) || 0})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">单位</label>
                      <Input
                        placeholder="例：kWh/天, %, °C"
                        value={newRule.unit || ''}
                        onChange={(e) => setNewRule({...newRule, unit: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">优先级</label>
                      <Select
                        value={newRule.level as string}
                        onValueChange={(value) => setNewRule({...newRule, level: value as ThresholdRule['level']})}
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
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">状态</label>
                        <Switch
                          checked={newRule.isActive}
                          onCheckedChange={(checked) => setNewRule({...newRule, isActive: checked})}
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">通知方式</label>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="edit-sms-notification"
                            checked={newRule.notifications?.sms || false}
                            onCheckedChange={(checked) => setNewRule({
                              ...newRule, 
                              notifications: {
                                sms: checked,
                                email: newRule.notifications?.email ?? true,
                                system: newRule.notifications?.system ?? true
                              }
                            })}
                          />
                          <label htmlFor="edit-sms-notification" className="text-sm">短信通知</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="edit-email-notification"
                            checked={newRule.notifications?.email || false}
                            onCheckedChange={(checked) => setNewRule({
                              ...newRule, 
                              notifications: {
                                sms: newRule.notifications?.sms ?? false,
                                email: checked,
                                system: newRule.notifications?.system ?? true
                              }
                            })}
                          />
                          <label htmlFor="edit-email-notification" className="text-sm">邮件通知</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="edit-system-notification"
                            checked={newRule.notifications?.system || false}
                            onCheckedChange={(checked) => setNewRule({
                              ...newRule, 
                              notifications: {
                                sms: newRule.notifications?.sms ?? false,
                                email: newRule.notifications?.email ?? true,
                                system: checked
                              }
                            })}
                          />
                          <label htmlFor="edit-system-notification" className="text-sm">系统消息</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditingRule(false)}>
                    取消
                  </Button>
                  <Button onClick={handleSaveRule}>
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
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>位置</TableHead>
                <TableHead>指标</TableHead>
                <TableHead>条件</TableHead>
                <TableHead>优先级</TableHead>
                <TableHead>通知方式</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRules.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    没有找到符合条件的阈值规则
                  </TableCell>
                </TableRow>
              ) : (
                filteredRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {getCategoryIcon(rule.category)}
                        <span>{getCategoryText(rule.category)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{rule.location}</span>
                        {rule.building && <span className="text-xs text-gray-500">{rule.building}</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{rule.metric}</span>
                        <span className="text-xs text-gray-500">{rule.unit}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getConditionText(rule.condition)} {rule.value}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("font-normal", getLevelColor(rule.level))}>
                        {getLevelText(rule.level)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {rule.notifications.sms && <Badge variant="outline" className="px-1.5">短信</Badge>}
                        {rule.notifications.email && <Badge variant="outline" className="px-1.5">邮件</Badge>}
                        {rule.notifications.system && <Badge variant="outline" className="px-1.5">系统</Badge>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={rule.isActive}
                        onCheckedChange={(checked) => handleToggleActive(rule.id, checked)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditRule(rule)}>
                          <Edit className="h-3.5 w-3.5 mr-1.5" />
                          编辑
                        </Button>
                        <Button variant="outline" size="sm" className="text-rose-500 border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-950/50" onClick={() => handleDeleteRule(rule.id)}>
                          <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                          删除
                        </Button>
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

export default AlertThresholds;


import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Code2, 
  Copy, 
  Key, 
  RefreshCw, 
  Settings, 
  PlusCircle, 
  CheckCircle2, 
  XCircle,
  Clock,
  AlertTriangle,
  WifiIcon,
  Globe,
  Lock,
  Server
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApiKeyItem {
  id: string;
  name: string;
  key: string;
  status: 'active' | 'inactive';
  created: string;
  lastUsed: string | null;
  permissions: ('read' | 'write' | 'delete')[];
}

const sampleApiKeys: ApiKeyItem[] = [
  {
    id: '1',
    name: '福建省级平台同步',
    key: 'fj_carbon_bbbf7ac8d0e6cb4',
    status: 'active',
    created: '2023-05-10',
    lastUsed: '2023-06-21 14:30',
    permissions: ['read', 'write'],
  },
  {
    id: '2',
    name: '福州市数据中心',
    key: 'fz_center_e91c5fb49d78aa2',
    status: 'active',
    created: '2023-04-22',
    lastUsed: '2023-06-15 09:45',
    permissions: ['read'],
  },
  {
    id: '3',
    name: '测试环境',
    key: 'test_env_57a9132c6d8fb04',
    status: 'inactive',
    created: '2023-03-18',
    lastUsed: null,
    permissions: ['read', 'write', 'delete'],
  },
];

const endpointExampleCode = `// 使用 JavaScript 发送请求示例
const apiKey = 'YOUR_API_KEY';
const url = 'https://api.carbon-guardian.com/v1/data';

const data = {
  buildingId: 'FJ-XZ-01',
  dataType: 'electricity',
  value: 1250.5,
  unit: 'kWh',
  timestamp: '2023-06-20T14:30:00Z'
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${apiKey}\`
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));`;

const CodeBlock = ({ code }: { code: string }) => {
  const { toast } = useToast();
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "代码已复制",
      description: "示例代码已复制到剪贴板",
    });
  };
  
  return (
    <div className="relative">
      <pre className="p-4 rounded-md bg-carbon-gray-900 text-carbon-gray-100 text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-2 right-2 bg-carbon-gray-800 hover:bg-carbon-gray-700 text-carbon-gray-300"
        onClick={copyToClipboard}
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
};

const ApiIntegration = () => {
  const { toast } = useToast();
  const [keys, setKeys] = useState<ApiKeyItem[]>(sampleApiKeys);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPermissions, setNewKeyPermissions] = useState<('read' | 'write' | 'delete')[]>(['read']);
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [generatedKey, setGeneratedKey] = useState<{ name: string, key: string } | null>(null);
  const [heartbeatEnabled, setHeartbeatEnabled] = useState(true);
  const [heartbeatInterval, setHeartbeatInterval] = useState('300');
  const [dataBufferSize, setDataBufferSize] = useState('50');
  const [syncErrorThreshold, setSyncErrorThreshold] = useState('3');

  const generateApiKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "名称不能为空",
        description: "请输入有效的API密钥名称",
        variant: "destructive",
      });
      return;
    }

    // Generate a random key
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 16; i++) {
      key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    const formattedKey = `${newKeyName.toLowerCase().replace(/\s+/g, '_')}_${key}`;
    
    // Add to state
    const newKeyItem: ApiKeyItem = {
      id: Date.now().toString(),
      name: newKeyName,
      key: formattedKey,
      status: 'active',
      created: new Date().toISOString().split('T')[0],
      lastUsed: null,
      permissions: newKeyPermissions,
    };
    
    setKeys([newKeyItem, ...keys]);
    setGeneratedKey({ name: newKeyName, key: formattedKey });
    setNewKeyName('');
    setNewKeyPermissions(['read']);
    setShowNewKeyForm(false);
    
    toast({
      title: "API密钥已生成",
      description: "请妥善保存您的密钥，它只会显示一次",
    });
  };

  const toggleKeyStatus = (id: string) => {
    setKeys(keys.map(key => {
      if (key.id === id) {
        return {
          ...key,
          status: key.status === 'active' ? 'inactive' : 'active'
        };
      }
      return key;
    }));
    
    toast({
      title: "状态已更新",
      description: `API密钥状态已${keys.find(k => k.id === id)?.status === 'active' ? '禁用' : '启用'}`,
    });
  };

  const deleteKey = (id: string) => {
    setKeys(keys.filter(key => key.id !== id));
    
    toast({
      title: "API密钥已删除",
      description: "密钥已从系统中永久删除",
    });
  };

  const saveHeartbeatSettings = () => {
    toast({
      title: "心跳设置已保存",
      description: "与福建省级平台的同步配置已更新",
    });
  };

  const togglePermission = (permission: 'read' | 'write' | 'delete') => {
    if (newKeyPermissions.includes(permission)) {
      setNewKeyPermissions(newKeyPermissions.filter(p => p !== permission));
    } else {
      setNewKeyPermissions([...newKeyPermissions, permission]);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <Tabs defaultValue="api-keys" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="api-keys" className="flex items-center">
            <Key className="h-4 w-4 mr-2" />
            API密钥管理
          </TabsTrigger>
          <TabsTrigger value="sync" className="flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" />
            省平台同步
          </TabsTrigger>
          <TabsTrigger value="documentation" className="flex items-center">
            <Code2 className="h-4 w-4 mr-2" />
            接口文档
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="api-keys">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>API密钥管理</CardTitle>
                  <CardDescription>
                    创建和管理用于第三方系统接入的API密钥
                  </CardDescription>
                </div>
                <Button onClick={() => setShowNewKeyForm(true)} disabled={showNewKeyForm}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  创建密钥
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showNewKeyForm && (
                <div className="border rounded-md p-4 mb-6 bg-carbon-gray-50 dark:bg-carbon-gray-900/30">
                  <h3 className="font-medium mb-4">创建新API密钥</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="key-name">密钥名称</Label>
                      <Input 
                        id="key-name" 
                        placeholder="例如：福建省级平台同步" 
                        className="mt-1"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">权限设置</Label>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="perm-read" 
                            checked={newKeyPermissions.includes('read')}
                            onChange={() => togglePermission('read')}
                            className="rounded border-carbon-gray-300"
                          />
                          <Label htmlFor="perm-read" className="text-sm cursor-pointer">
                            读取 (Read)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="perm-write" 
                            checked={newKeyPermissions.includes('write')}
                            onChange={() => togglePermission('write')}
                            className="rounded border-carbon-gray-300"
                          />
                          <Label htmlFor="perm-write" className="text-sm cursor-pointer">
                            写入 (Write)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="perm-delete" 
                            checked={newKeyPermissions.includes('delete')}
                            onChange={() => togglePermission('delete')}
                            className="rounded border-carbon-gray-300"
                          />
                          <Label htmlFor="perm-delete" className="text-sm cursor-pointer">
                            删除 (Delete)
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-2">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setShowNewKeyForm(false);
                          setNewKeyName('');
                        }}
                      >
                        取消
                      </Button>
                      <Button onClick={generateApiKey}>
                        生成密钥
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {generatedKey && (
                <div className="border border-carbon-green-200 rounded-md p-4 mb-6 bg-carbon-green-50 dark:bg-carbon-green-900/10 dark:border-carbon-green-900/30">
                  <div className="flex items-center mb-2">
                    <CheckCircle2 className="h-5 w-5 text-carbon-green-500 mr-2" />
                    <h3 className="font-medium text-carbon-green-700 dark:text-carbon-green-400">密钥已生成</h3>
                  </div>
                  <p className="text-sm text-carbon-gray-600 dark:text-carbon-gray-400 mb-3">
                    请保存下面的API密钥。出于安全考虑，此密钥只会显示一次。
                  </p>
                  <div className="bg-carbon-gray-100 dark:bg-carbon-gray-800 p-3 rounded flex justify-between items-center">
                    <code className="text-sm font-mono">{generatedKey.key}</code>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedKey.key);
                        toast({
                          title: "已复制",
                          description: "API密钥已复制到剪贴板",
                        });
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-3 text-right">
                    <Button 
                      variant="link" 
                      size="sm"
                      onClick={() => setGeneratedKey(null)}
                    >
                      我已保存，关闭此消息
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>名称</TableHead>
                      <TableHead>创建日期</TableHead>
                      <TableHead>最近使用</TableHead>
                      <TableHead>权限</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {keys.map((key) => (
                      <TableRow key={key.id}>
                        <TableCell className="font-medium">
                          {key.name}
                        </TableCell>
                        <TableCell>{key.created}</TableCell>
                        <TableCell>{key.lastUsed || '从未使用'}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {key.permissions.includes('read') && (
                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                                读取
                              </Badge>
                            )}
                            {key.permissions.includes('write') && (
                              <Badge variant="outline" className="text-xs bg-carbon-green-50 text-carbon-green-700 dark:bg-carbon-green-900/20 dark:text-carbon-green-400 border-carbon-green-200 dark:border-carbon-green-800">
                                写入
                              </Badge>
                            )}
                            {key.permissions.includes('delete') && (
                              <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                                删除
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={cn(
                            "font-normal",
                            key.status === 'active' 
                              ? "bg-carbon-green-100 text-carbon-green-800 dark:bg-carbon-green-900/30 dark:text-carbon-green-300" 
                              : "bg-carbon-gray-100 text-carbon-gray-800 dark:bg-carbon-gray-800 dark:text-carbon-gray-300"
                          )}>
                            {key.status === 'active' ? '启用' : '禁用'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toggleKeyStatus(key.id)}
                            >
                              {key.status === 'active' ? '禁用' : '启用'}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:text-rose-500 dark:hover:bg-rose-950/20"
                              onClick={() => deleteKey(key.id)}
                            >
                              删除
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sync">
          <Card>
            <CardHeader>
              <CardTitle>省级平台同步配置</CardTitle>
              <CardDescription>
                配置与福建省级碳排放监测平台的数据同步参数
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">心跳包</Label>
                      <p className="text-sm text-carbon-gray-500 dark:text-carbon-gray-400">
                        启用定期向省级平台发送心跳包
                      </p>
                    </div>
                    <Switch 
                      checked={heartbeatEnabled} 
                      onCheckedChange={setHeartbeatEnabled} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="heartbeat-interval">心跳频率 (秒)</Label>
                    <Input 
                      id="heartbeat-interval" 
                      type="number" 
                      value={heartbeatInterval}
                      onChange={(e) => setHeartbeatInterval(e.target.value)}
                      disabled={!heartbeatEnabled}
                    />
                    <p className="text-xs text-carbon-gray-500 dark:text-carbon-gray-400">
                      建议值: 300秒（5分钟）
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="data-buffer">数据缓存大小</Label>
                    <Input 
                      id="data-buffer" 
                      type="number" 
                      value={dataBufferSize}
                      onChange={(e) => setDataBufferSize(e.target.value)}
                    />
                    <p className="text-xs text-carbon-gray-500 dark:text-carbon-gray-400">
                      每次同步的最大数据条数
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="error-threshold">错误阈值</Label>
                    <Input 
                      id="error-threshold" 
                      type="number" 
                      value={syncErrorThreshold}
                      onChange={(e) => setSyncErrorThreshold(e.target.value)}
                    />
                    <p className="text-xs text-carbon-gray-500 dark:text-carbon-gray-400">
                      连续失败次数达到阈值时发送警报
                    </p>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-carbon-gray-50 dark:bg-carbon-gray-900/30 space-y-4">
                  <h3 className="font-medium">省级平台连接状态</h3>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-carbon-green-500 mr-2"></div>
                      <span className="text-sm font-medium">连接正常</span>
                    </div>
                    <div className="text-sm text-carbon-gray-600 dark:text-carbon-gray-400 space-y-2">
                      <div className="flex justify-between">
                        <span>上次心跳:</span>
                        <span>2023-06-22 14:35:12</span>
                      </div>
                      <div className="flex justify-between">
                        <span>上次同步:</span>
                        <span>2023-06-22 14:30:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>同步状态:</span>
                        <span className="text-carbon-green-600 dark:text-carbon-green-400">成功</span>
                      </div>
                      <div className="flex justify-between">
                        <span>今日同步次数:</span>
                        <span>126</span>
                      </div>
                      <div className="flex justify-between">
                        <span>今日同步数据量:</span>
                        <span>1,254 条</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-carbon-gray-100 dark:bg-carbon-gray-800 p-3 rounded text-sm">
                    <div className="font-medium mb-1">连接详情</div>
                    <div className="text-carbon-gray-600 dark:text-carbon-gray-400 space-y-1">
                      <div className="flex items-start">
                        <Globe className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>接口地址: https://api.fjhb.gov.cn/carbon/v1</span>
                      </div>
                      <div className="flex items-start">
                        <Server className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>协议版本: WebService 2.1</span>
                      </div>
                      <div className="flex items-start">
                        <Lock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>认证方式: Token + HMAC</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full" onClick={saveHeartbeatSettings}>
                    <Settings className="h-4 w-4 mr-2" />
                    保存配置
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documentation">
          <Card>
            <CardHeader>
              <CardTitle>API接口文档</CardTitle>
              <CardDescription>
                用于第三方系统对接的WebService标准接口文档
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <WifiIcon className="h-4 w-4 mr-2 text-carbon-green-500" />
                        接口概述与认证方式
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">接口基础信息</h3>
                        <p className="text-sm text-carbon-gray-600 dark:text-carbon-gray-400">
                          碳排放监测系统提供标准的REST API，用于第三方系统集成。所有API均通过HTTPS协议访问，确保数据传输安全。
                        </p>
                        <p className="text-sm text-carbon-gray-600 dark:text-carbon-gray-400">
                          接口基础路径: <code className="bg-carbon-gray-100 dark:bg-carbon-gray-800 p-1 rounded">https://api.carbon-guardian.com/v1</code>
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">认证方式</h3>
                        <p className="text-sm text-carbon-gray-600 dark:text-carbon-gray-400">
                          所有API请求必须包含有效的API密钥进行认证。API密钥应通过HTTP请求头的Authorization字段传递。
                        </p>
                        <p className="text-sm text-carbon-gray-600 dark:text-carbon-gray-400">
                          示例: <code className="bg-carbon-gray-100 dark:bg-carbon-gray-800 p-1 rounded">Authorization: Bearer YOUR_API_KEY</code>
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">请求速率限制</h3>
                        <p className="text-sm text-carbon-gray-600 dark:text-carbon-gray-400">
                          为确保系统稳定，针对不同的API密钥有不同的请求速率限制。基础账户限制为每分钟60个请求，超出限制将返回429状态码。
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <Server className="h-4 w-4 mr-2 text-blue-500" />
                        数据上传接口
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">提交能耗数据</h3>
                        <p className="text-sm text-carbon-gray-600 dark:text-carbon-gray-400">
                          用于提交单条碳排放相关能耗数据。
                        </p>
                        <div className="bg-carbon-gray-100 dark:bg-carbon-gray-800 p-3 rounded">
                          <p className="text-sm font-medium">POST /data</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">请求参数</h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>参数名</TableHead>
                              <TableHead>类型</TableHead>
                              <TableHead>必填</TableHead>
                              <TableHead>说明</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>buildingId</TableCell>
                              <TableCell>string</TableCell>
                              <TableCell>是</TableCell>
                              <TableCell>楼栋编码</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>dataType</TableCell>
                              <TableCell>string</TableCell>
                              <TableCell>是</TableCell>
                              <TableCell>数据类型 (electricity/natural_gas/lpg/chemical/diesel)</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>value</TableCell>
                              <TableCell>number</TableCell>
                              <TableCell>是</TableCell>
                              <TableCell>数据值</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>unit</TableCell>
                              <TableCell>string</TableCell>
                              <TableCell>是</TableCell>
                              <TableCell>单位 (kWh/m³/kg/L等)</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>timestamp</TableCell>
                              <TableCell>string</TableCell>
                              <TableCell>是</TableCell>
                              <TableCell>数据时间戳 (ISO 8601格式)</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>notes</TableCell>
                              <TableCell>string</TableCell>
                              <TableCell>否</TableCell>
                              <TableCell>备注信息</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">示例代码</h3>
                        <CodeBlock code={endpointExampleCode} />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">响应示例</h3>
                        <CodeBlock code={`{
  "success": true,
  "data": {
    "id": "data_6c8f7a2d5e",
    "buildingId": "FJ-XZ-01",
    "dataType": "electricity",
    "value": 1250.5,
    "unit": "kWh",
    "timestamp": "2023-06-20T14:30:00Z",
    "created": "2023-06-20T14:31:05Z"
  }
}`} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <RefreshCw className="h-4 w-4 mr-2 text-amber-500" />
                        批量数据处理
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">批量提交数据</h3>
                        <p className="text-sm text-carbon-gray-600 dark:text-carbon-gray-400">
                          用于一次性提交多条碳排放数据。
                        </p>
                        <div className="bg-carbon-gray-100 dark:bg-carbon-gray-800 p-3 rounded">
                          <p className="text-sm font-medium">POST /data/batch</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">请求示例</h3>
                        <CodeBlock code={`{
  "items": [
    {
      "buildingId": "FJ-XZ-01",
      "dataType": "electricity",
      "value": 1250.5,
      "unit": "kWh",
      "timestamp": "2023-06-20T14:30:00Z"
    },
    {
      "buildingId": "FJ-XZ-02",
      "dataType": "natural_gas",
      "value": 45.2,
      "unit": "m³",
      "timestamp": "2023-06-20T14:30:00Z"
    }
  ]
}`} />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">注意事项</h3>
                        <p className="text-sm text-carbon-gray-600 dark:text-carbon-gray-400">
                          批量上传限制为一次最多500条记录，超出限制将返回400错误。所有数据将作为一个事务处理，要么全部成功，要么全部失败。
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-purple-500" />
                        福建省级平台协议
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">省级平台兼容性</h3>
                        <p className="text-sm text-carbon-gray-600 dark:text-carbon-gray-400">
                          本系统完全兼容福建省级碳排放监测平台的数据交换协议，支持定期心跳包和数据同步功能。
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">心跳接口</h3>
                        <p className="text-sm text-carbon-gray-600 dark:text-carbon-gray-400">
                          用于发送系统在线状态信号。
                        </p>
                        <div className="bg-carbon-gray-100 dark:bg-carbon-gray-800 p-3 rounded">
                          <p className="text-sm font-medium">GET /provincial/heartbeat</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">数据同步接口</h3>
                        <p className="text-sm text-carbon-gray-600 dark:text-carbon-gray-400">
                          符合省级平台规范的数据推送接口。
                        </p>
                        <div className="bg-carbon-gray-100 dark:bg-carbon-gray-800 p-3 rounded">
                          <p className="text-sm font-medium">POST /provincial/sync</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">认证特殊要求</h3>
                        <p className="text-sm text-carbon-gray-600 dark:text-carbon-gray-400">
                          与省级平台对接时，除标准API密钥外，还需提供省级平台分配的身份认证令牌，通过X-Provincial-Token请求头传递。
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                下载完整API文档
              </Button>
              <Button>
                <Code2 className="h-4 w-4 mr-2" />
                查看测试控制台
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiIntegration;

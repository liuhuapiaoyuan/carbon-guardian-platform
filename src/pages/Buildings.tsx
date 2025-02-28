
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Building2, 
  Search, 
  Plus, 
  Map,
  Edit, 
  Trash, 
  FileText,
  MapPin,
  SquareGantt,
  BarChart3,
  Settings,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BuildingData {
  id: string;
  name: string;
  code: string;
  type: string;
  area: number;
  location: string;
  organization: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'inactive' | 'maintenance';
  lastUpdate: string;
}

const sampleBuildingTypes = [
  { id: '1', name: '办公楼', count: 42 },
  { id: '2', name: '住宅楼', count: 28 },
  { id: '3', name: '商业建筑', count: 15 },
  { id: '4', name: '工业厂房', count: 9 },
  { id: '5', name: '医疗机构', count: 6 },
  { id: '6', name: '教育建筑', count: 12 },
  { id: '7', name: '文化建筑', count: 8 },
  { id: '8', name: '交通建筑', count: 4 },
  { id: '9', name: '其他', count: 4 },
];

const sampleBuildingData: BuildingData[] = [
  {
    id: '1',
    name: '福建省行政中心主楼',
    code: 'FJ-XZ-01',
    type: '办公楼',
    area: 12500,
    location: '福建省福州市鼓楼区东水路76号',
    organization: '福建省政府办公厅',
    latitude: 26.0745,
    longitude: 119.3059,
    status: 'active',
    lastUpdate: '2023-05-15',
  },
  {
    id: '2',
    name: '环保大厦',
    code: 'FJ-HB-01',
    type: '办公楼',
    area: 8200,
    location: '福建省福州市鼓楼区八一七北路',
    organization: '福建省环保厅',
    latitude: 26.0812,
    longitude: 119.2943,
    status: 'active',
    lastUpdate: '2023-06-21',
  },
  {
    id: '3',
    name: '福州市民服务中心',
    code: 'FZ-FW-01',
    type: '办公楼',
    area: 5600,
    location: '福建省福州市鼓楼区五四路',
    organization: '福州市政务服务中心',
    latitude: 26.0891,
    longitude: 119.3023,
    status: 'maintenance',
    lastUpdate: '2023-04-30',
  },
  {
    id: '4',
    name: '海峡国际会展中心',
    code: 'FZ-HZ-01',
    type: '商业建筑',
    area: 22000,
    location: '福建省福州市仓山区城门镇',
    organization: '福州市文旅局',
    latitude: 26.0216,
    longitude: 119.3181,
    status: 'active',
    lastUpdate: '2023-06-05',
  },
  {
    id: '5',
    name: '福建师范大学旗山校区图书馆',
    code: 'FZ-JY-01',
    type: '教育建筑',
    area: 15800,
    location: '福建省福州市闽侯县上街镇',
    organization: '福建师范大学',
    latitude: 26.0789,
    longitude: 119.1922,
    status: 'active',
    lastUpdate: '2023-05-28',
  },
];

const Buildings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingData | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [newBuildingData, setNewBuildingData] = useState({
    name: '',
    code: '',
    type: '办公楼',
    area: '',
    location: '',
    organization: '',
    latitude: '',
    longitude: '',
    status: 'active',
  });
  
  const filteredBuildings = sampleBuildingData.filter(building => {
    const matchesSearch = searchTerm === '' || 
      building.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      building.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === null || building.type === selectedType;
    
    return matchesSearch && matchesType;
  });
  
  const getStatusColor = (status: BuildingData['status']) => {
    switch (status) {
      case 'active':
        return 'bg-carbon-green-100 text-carbon-green-800 dark:bg-carbon-green-900/30 dark:text-carbon-green-300';
      case 'inactive':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300';
      case 'maintenance':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default:
        return '';
    }
  };
  
  const getStatusText = (status: BuildingData['status']) => {
    switch (status) {
      case 'active':
        return '使用中';
      case 'inactive':
        return '未使用';
      case 'maintenance':
        return '维护中';
      default:
        return status;
    }
  };

  const handleViewDetails = (building: BuildingData) => {
    setSelectedBuilding(building);
    setDetailsDialogOpen(true);
  };

  return (
    <MainLayout>
      <PageHeader 
        title="楼栋管理" 
        subtitle="管理各类型楼栋基础信息与碳排放参数"
      >
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <SquareGantt className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('table')}
          >
            <FileText className="h-4 w-4" />
          </Button>
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            <span>添加楼栋</span>
          </Button>
        </div>
      </PageHeader>
      
      <div className="mb-6">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <TabsList className="h-9">
              <TabsTrigger value="all" className="text-xs">全部楼栋</TabsTrigger>
              <TabsTrigger value="office" className="text-xs">办公建筑</TabsTrigger>
              <TabsTrigger value="residence" className="text-xs">住宅建筑</TabsTrigger>
              <TabsTrigger value="commercial" className="text-xs">商业建筑</TabsTrigger>
              <TabsTrigger value="other" className="text-xs">其他类型</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-carbon-gray-400" />
              <Input
                placeholder="搜索楼栋名称、编码或位置..."
                className="pl-9 w-full sm:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="all" className="m-0">
            {viewMode === 'grid' ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {sampleBuildingTypes.map((type) => (
                    <Card 
                      key={type.id} 
                      className={cn(
                        "cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md",
                        selectedType === type.name ? "border-carbon-green-500 dark:border-carbon-green-600" : ""
                      )}
                      onClick={() => setSelectedType(selectedType === type.name ? null : type.name)}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium flex items-center justify-between">
                          <span>{type.name}</span>
                          <Badge className="font-normal">{type.count}</Badge>
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBuildings.map((building) => (
                    <Card 
                      key={building.id} 
                      className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md"
                    >
                      <CardHeader className="pb-2 relative">
                        <div className="absolute top-2 right-2">
                          <Badge className={cn("font-normal", getStatusColor(building.status))}>
                            {getStatusText(building.status)}
                          </Badge>
                        </div>
                        <CardTitle className="text-base font-medium flex items-center">
                          <Building2 className="h-4 w-4 mr-2 text-carbon-green-500" />
                          <span>{building.name}</span>
                        </CardTitle>
                        <CardDescription>
                          <div className="flex items-center text-xs text-carbon-gray-500">
                            <span className="mr-2">{building.code}</span>
                            <span>•</span>
                            <span className="ml-2">{building.type}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-0">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-carbon-gray-400 flex-shrink-0" />
                            <span className="text-carbon-gray-600 dark:text-carbon-gray-400 line-clamp-2">
                              {building.location}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <SquareGantt className="h-4 w-4 mr-2 text-carbon-gray-400" />
                            <span className="text-carbon-gray-600 dark:text-carbon-gray-400">
                              {building.area.toLocaleString()} m²
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-4 pb-4 flex justify-between">
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(building)}>
                          查看详情
                        </Button>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <BarChart3 className="h-4 w-4 text-carbon-gray-500" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4 text-carbon-gray-500" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>名称</TableHead>
                      <TableHead>编码</TableHead>
                      <TableHead>类型</TableHead>
                      <TableHead>面积</TableHead>
                      <TableHead>所属单位</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>更新时间</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBuildings.map((building) => (
                      <TableRow key={building.id} className="cursor-pointer hover:bg-carbon-gray-50 dark:hover:bg-carbon-gray-800/20" onClick={() => handleViewDetails(building)}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <Building2 className="h-4 w-4 mr-2 text-carbon-green-500 flex-shrink-0" />
                            <span>{building.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{building.code}</TableCell>
                        <TableCell>{building.type}</TableCell>
                        <TableCell>{building.area.toLocaleString()} m²</TableCell>
                        <TableCell className="max-w-[200px] truncate">{building.organization}</TableCell>
                        <TableCell>
                          <Badge className={cn("font-normal", getStatusColor(building.status))}>
                            {getStatusText(building.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>{building.lastUpdate}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetails(building);
                            }}>
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="office" className="m-0">
            <div className="flex items-center justify-center h-40 text-carbon-gray-500">
              按办公建筑筛选的内容
            </div>
          </TabsContent>
          
          <TabsContent value="residence" className="m-0">
            <div className="flex items-center justify-center h-40 text-carbon-gray-500">
              按住宅建筑筛选的内容
            </div>
          </TabsContent>
          
          <TabsContent value="commercial" className="m-0">
            <div className="flex items-center justify-center h-40 text-carbon-gray-500">
              按商业建筑筛选的内容
            </div>
          </TabsContent>
          
          <TabsContent value="other" className="m-0">
            <div className="flex items-center justify-center h-40 text-carbon-gray-500">
              按其他类型筛选的内容
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Add Building Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>添加新楼栋</DialogTitle>
            <DialogDescription>
              填写楼栋基本信息，创建后可以进一步配置碳排放参数
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">楼栋名称</Label>
                <Input
                  id="name"
                  placeholder="请输入楼栋名称"
                  value={newBuildingData.name}
                  onChange={(e) => setNewBuildingData({...newBuildingData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">楼栋编码</Label>
                <Input
                  id="code"
                  placeholder="请输入楼栋编码"
                  value={newBuildingData.code}
                  onChange={(e) => setNewBuildingData({...newBuildingData, code: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">楼栋类型</Label>
                <Select 
                  value={newBuildingData.type} 
                  onValueChange={(value) => setNewBuildingData({...newBuildingData, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="请选择楼栋类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="办公楼">办公楼</SelectItem>
                    <SelectItem value="住宅楼">住宅楼</SelectItem>
                    <SelectItem value="商业建筑">商业建筑</SelectItem>
                    <SelectItem value="工业厂房">工业厂房</SelectItem>
                    <SelectItem value="医疗机构">医疗机构</SelectItem>
                    <SelectItem value="教育建筑">教育建筑</SelectItem>
                    <SelectItem value="文化建筑">文化建筑</SelectItem>
                    <SelectItem value="交通建筑">交通建筑</SelectItem>
                    <SelectItem value="其他">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">建筑面积 (m²)</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="建筑面积"
                  value={newBuildingData.area}
                  onChange={(e) => setNewBuildingData({...newBuildingData, area: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">地理位置</Label>
              <Input
                id="location"
                placeholder="详细地址"
                value={newBuildingData.location}
                onChange={(e) => setNewBuildingData({...newBuildingData, location: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">纬度</Label>
                <Input
                  id="latitude"
                  placeholder="纬度"
                  value={newBuildingData.latitude}
                  onChange={(e) => setNewBuildingData({...newBuildingData, latitude: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">经度</Label>
                <Input
                  id="longitude"
                  placeholder="经度"
                  value={newBuildingData.longitude}
                  onChange={(e) => setNewBuildingData({...newBuildingData, longitude: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="organization">所属单位</Label>
                <Input
                  id="organization"
                  placeholder="所属单位名称"
                  value={newBuildingData.organization}
                  onChange={(e) => setNewBuildingData({...newBuildingData, organization: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">状态</Label>
                <Select 
                  value={newBuildingData.status} 
                  onValueChange={(value) => setNewBuildingData({...newBuildingData, status: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="请选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">使用中</SelectItem>
                    <SelectItem value="inactive">未使用</SelectItem>
                    <SelectItem value="maintenance">维护中</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setAddDialogOpen(false)}>
              取消
            </Button>
            <Button type="submit" onClick={() => {
              // Handle save logic here
              setAddDialogOpen(false);
            }}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Building Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedBuilding && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle className="flex items-center">
                      <Building2 className="h-5 w-5 mr-2 text-carbon-green-500" />
                      {selectedBuilding.name}
                    </DialogTitle>
                    <DialogDescription className="mt-1.5">
                      <div className="flex items-center">
                        <Badge className={cn("font-normal mr-2", getStatusColor(selectedBuilding.status))}>
                          {getStatusText(selectedBuilding.status)}
                        </Badge>
                        <span>{selectedBuilding.code} • {selectedBuilding.type}</span>
                      </div>
                    </DialogDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      <span>编辑</span>
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash className="h-4 w-4 mr-2" />
                      <span>删除</span>
                    </Button>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div>
                  <h4 className="text-sm font-medium text-carbon-gray-500 mb-2">基本信息</h4>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">所属单位</TableCell>
                        <TableCell>{selectedBuilding.organization}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">建筑面积</TableCell>
                        <TableCell>{selectedBuilding.area.toLocaleString()} m²</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">地理位置</TableCell>
                        <TableCell className="break-words">{selectedBuilding.location}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">经纬度</TableCell>
                        <TableCell>{selectedBuilding.latitude}, {selectedBuilding.longitude}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">最近更新</TableCell>
                        <TableCell>{selectedBuilding.lastUpdate}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-carbon-gray-500 mb-2">碳排放参数</h4>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">电力消耗因子</TableCell>
                        <TableCell>0.6101 kg CO₂/kWh</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">天然气因子</TableCell>
                        <TableCell>2.1622 kg CO₂/m³</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">上月碳排放</TableCell>
                        <TableCell>2,453 kg CO₂</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">年度累计</TableCell>
                        <TableCell>14,782 kg CO₂</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">基准比对</TableCell>
                        <TableCell className="text-amber-500">
                          较同类型建筑高 12%
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="space-y-2 mt-2">
                <h4 className="text-sm font-medium text-carbon-gray-500">快速访问</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    <span>排放数据</span>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Map className="h-4 w-4 mr-2" />
                    <span>地图位置</span>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    <span>参数配置</span>
                  </Button>
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={() => setDetailsDialogOpen(false)}>
                  关闭
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Buildings;

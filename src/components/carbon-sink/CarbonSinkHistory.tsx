
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  FileDown, 
  Search, 
  Filter, 
  Calendar, 
  TreePine, 
  Leaf, 
  ArrowDownUp, 
  Info, 
  Edit, 
  Trash2, 
  LineChart, 
  Eye,
  FileSpreadsheet
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarbonSinkHistoryItem {
  id: string;
  year: string;
  type: 'forest' | 'green';
  region: string;
  area: number;
  unit: string;
  growthRate: number;
  carbonSink: number;
  lastUpdated: string;
}

// Sample data
const sampleHistoryData: CarbonSinkHistoryItem[] = [
  {
    id: '1',
    year: '2023',
    type: 'forest',
    region: '福州市',
    area: 16742.5,
    unit: 'km²',
    growthRate: 1.0,
    carbonSink: 4200,
    lastUpdated: '2023-11-15'
  },
  {
    id: '2',
    year: '2023',
    type: 'green',
    region: '福州市',
    area: 2850.8,
    unit: '公顷',
    growthRate: 4.0,
    carbonSink: 1200,
    lastUpdated: '2023-11-15'
  },
  {
    id: '3',
    year: '2023',
    type: 'forest',
    region: '厦门市',
    area: 10480.3,
    unit: 'km²',
    growthRate: 0.8,
    carbonSink: 2800,
    lastUpdated: '2023-11-10'
  },
  {
    id: '4',
    year: '2023',
    type: 'green',
    region: '厦门市',
    area: 3250.5,
    unit: '公顷',
    growthRate: 5.2,
    carbonSink: 1400,
    lastUpdated: '2023-11-10'
  },
  {
    id: '5',
    year: '2022',
    type: 'forest',
    region: '福州市',
    area: 16570.2,
    unit: 'km²',
    growthRate: 1.2,
    carbonSink: 4050,
    lastUpdated: '2022-12-05'
  },
  {
    id: '6',
    year: '2022',
    type: 'green',
    region: '福州市',
    area: 2740.6,
    unit: '公顷',
    growthRate: 4.2,
    carbonSink: 1150,
    lastUpdated: '2022-12-05'
  },
  {
    id: '7',
    year: '2022',
    type: 'forest',
    region: '厦门市',
    area: 10400.1,
    unit: 'km²',
    growthRate: 0.7,
    carbonSink: 2700,
    lastUpdated: '2022-12-01'
  },
  {
    id: '8',
    year: '2021',
    type: 'forest',
    region: '福州市',
    area: 16379.8,
    unit: 'km²',
    growthRate: 1.4,
    carbonSink: 3900,
    lastUpdated: '2021-12-12'
  },
  {
    id: '9',
    year: '2021',
    type: 'green',
    region: '福州市',
    area: 2630.9,
    unit: '公顷',
    growthRate: 4.6,
    carbonSink: 1050,
    lastUpdated: '2021-12-12'
  },
  {
    id: '10',
    year: '2021',
    type: 'forest',
    region: '泉州市',
    area: 14250.5,
    unit: 'km²',
    growthRate: 1.3,
    carbonSink: 3800,
    lastUpdated: '2021-12-10'
  },
];

// Extract unique years and regions for filter options
const uniqueYears = Array.from(new Set(sampleHistoryData.map(item => item.year))).sort((a, b) => b.localeCompare(a));
const uniqueRegions = Array.from(new Set(sampleHistoryData.map(item => item.region)));

const CarbonSinkHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof CarbonSinkHistoryItem; direction: 'asc' | 'desc' } | null>(null);
  const [selectedItem, setSelectedItem] = useState<CarbonSinkHistoryItem | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  // Filter and sort data
  const filteredData = React.useMemo(() => {
    let filteredItems = [...sampleHistoryData];

    // Apply search filter
    if (searchTerm) {
      filteredItems = filteredItems.filter(item => 
        item.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply year filter
    if (yearFilter !== 'all') {
      filteredItems = filteredItems.filter(item => item.year === yearFilter);
    }

    // Apply region filter
    if (regionFilter !== 'all') {
      filteredItems = filteredItems.filter(item => item.region === regionFilter);
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      filteredItems = filteredItems.filter(item => item.type === typeFilter);
    }

    // Apply sorting
    if (sortConfig) {
      filteredItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredItems;
  }, [searchTerm, yearFilter, regionFilter, typeFilter, sortConfig]);

  const handleSort = (key: keyof CarbonSinkHistoryItem) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleViewDetails = (item: CarbonSinkHistoryItem) => {
    setSelectedItem(item);
    setShowDetailsDialog(true);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            <div>
              <CardTitle>碳汇历史数据</CardTitle>
              <CardDescription>历年森林覆盖率和绿化面积数据记录</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <FileDown className="h-4 w-4 mr-2" />
                导出数据
              </Button>
              <Button variant="default">
                <LineChart className="h-4 w-4 mr-2" />
                生成趋势图
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索地区..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-[100px]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="年份" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部年份</SelectItem>
                  {uniqueYears.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-[120px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="地区" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部地区</SelectItem>
                  {uniqueRegions.map((region) => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="碳汇类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="forest">森林碳汇</SelectItem>
                  <SelectItem value="green">绿化碳汇</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">年份</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>地区</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('area')}>
                    <div className="flex items-center">
                      面积
                      <ArrowDownUp className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('growthRate')}>
                    <div className="flex items-center">
                      增长率
                      <ArrowDownUp className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('carbonSink')}>
                    <div className="flex items-center">
                      碳汇量
                      <ArrowDownUp className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>更新日期</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-gray-500">
                      没有找到匹配的数据记录
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.year}</TableCell>
                      <TableCell>
                        {item.type === 'forest' ? (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            <TreePine className="h-3.5 w-3.5 mr-1" />
                            森林
                          </Badge>
                        ) : (
                          <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                            <Leaf className="h-3.5 w-3.5 mr-1" />
                            绿化
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{item.region}</TableCell>
                      <TableCell>{item.area.toLocaleString()} {item.unit}</TableCell>
                      <TableCell>
                        <span className={cn(
                          "font-medium",
                          item.growthRate > 0 ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
                        )}>
                          {item.growthRate > 0 ? '+' : ''}{item.growthRate}%
                        </span>
                      </TableCell>
                      <TableCell>{item.carbonSink.toLocaleString()} 吨CO₂</TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleViewDetails(item)}
                          >
                            <Eye className="h-4 w-4 text-gray-500" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4 text-gray-500" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-gray-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <div className="text-sm text-gray-500">
            共 {filteredData.length} 条记录
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>上一页</Button>
            <Button variant="outline" size="sm" disabled>下一页</Button>
          </div>
        </CardFooter>
      </Card>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>碳汇数据详情</DialogTitle>
            <DialogDescription>
              查看详细的碳汇数据信息及计算方法
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">数据类型</p>
                  <p className="font-medium">
                    {selectedItem.type === 'forest' ? '森林碳汇' : '绿化碳汇'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">年份</p>
                  <p className="font-medium">{selectedItem.year}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">地区</p>
                  <p className="font-medium">{selectedItem.region}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">最后更新</p>
                  <p className="font-medium">{selectedItem.lastUpdated}</p>
                </div>
              </div>

              <div className="border-t border-b py-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">面积</p>
                    <p className="text-xl font-bold">
                      {selectedItem.area.toLocaleString()} {selectedItem.unit}
                    </p>
                    <p className="text-sm text-gray-500">
                      同比增长 
                      <span className={selectedItem.growthRate > 0 ? "text-green-600" : "text-red-600"}>
                        {selectedItem.growthRate > 0 ? '+' : ''}{selectedItem.growthRate}%
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">碳汇量</p>
                    <p className="text-xl font-bold">
                      {selectedItem.carbonSink.toLocaleString()} 吨CO₂
                    </p>
                    <p className="text-sm text-gray-500">
                      占区域总碳汇约 
                      {selectedItem.type === 'forest' ? '70%' : '30%'}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/30 p-3 rounded-md">
                  <p className="text-sm font-medium mb-1">碳汇计算方法</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedItem.type === 'forest' ? 
                      '森林碳汇 = 森林面积 × 单位面积碳储量(约50吨/公顷) × 年固碳系数(约0.5)' : 
                      '绿化碳汇 = 绿化面积 × 单位面积碳储量(约15吨/公顷) × 年固碳系数(约0.3)'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Info className="h-4 w-4" />
                <span>数据基于《全国碳汇计量标准 2022版》计算</span>
              </div>
            </div>
          )}

          <DialogFooter className="flex space-x-2">
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              关闭
            </Button>
            <Button>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              导出详情
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CarbonSinkHistory;

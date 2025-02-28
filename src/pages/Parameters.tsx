
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Activity,
  AlertCircle,
  ArrowDownUp,
  Check,
  ChevronDown,
  Copy,
  Edit,
  FileDown,
  FileUp,
  Filter,
  PlusCircle,
  Search,
  Sliders,
  Trash2,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the parameter interface
interface Parameter {
  id: number;
  category: string;
  subcategory?: string;
  name: string;
  unit: string;
  uploadRequirement: '实时监测' | '数据上报';
  emissionFormula?: string;
  description?: string;
}

// Define the form schema for adding/editing parameters
const parameterFormSchema = z.object({
  category: z.string().min(1, { message: '请选择分类' }),
  subcategory: z.string().optional(),
  name: z.string().min(1, { message: '请输入监测参数名称' }),
  unit: z.string().min(1, { message: '请输入计量单位' }),
  uploadRequirement: z.enum(['实时监测', '数据上报']),
  emissionFormula: z.string().optional(),
  description: z.string().optional(),
});

// Sample parameter data from your provided JSON
const sampleParameters: Parameter[] = [
  {
    id: 1,
    category: '建筑运行',
    subcategory: '批发、零售业和住宿、餐饮业',
    name: '电力',
    unit: '万kWh',
    uploadRequirement: '实时监测',
    emissionFormula: 'E = 活动量 × 排放因子',
    description: '电力消耗产生的间接碳排放',
  },
  {
    id: 2,
    category: '建筑运行',
    subcategory: '批发、零售业和住宿、餐饮业',
    name: '液化石油气',
    unit: 't',
    uploadRequirement: '数据上报',
    emissionFormula: 'E = 活动量 × 排放因子 × 低位发热值',
    description: '液化石油气燃烧产生的直接碳排放',
  },
  {
    id: 3,
    category: '建筑运行',
    subcategory: '批发、零售业和住宿、餐饮业',
    name: '天然气',
    unit: 'm³',
    uploadRequirement: '实时监测',
    emissionFormula: 'E = 活动量 × 排放因子 × 低位发热值',
    description: '天然气燃烧产生的直接碳排放',
  },
  {
    id: 4,
    category: '建筑运行',
    subcategory: '批发、零售业和住宿、餐饮业',
    name: '其他能源',
    unit: '/',
    uploadRequirement: '数据上报',
  },
  {
    id: 5,
    category: '建筑运行',
    subcategory: '其他行业',
    name: '电力',
    unit: '万kWh',
    uploadRequirement: '实时监测',
  },
  {
    id: 6,
    category: '建筑运行',
    subcategory: '其他行业',
    name: '液化石油气',
    unit: 't',
    uploadRequirement: '数据上报',
  },
  {
    id: 7,
    category: '建筑运行',
    subcategory: '其他行业',
    name: '天然气',
    unit: 'm³',
    uploadRequirement: '实时监测',
  },
  {
    id: 8,
    category: '建筑运行',
    subcategory: '其他行业',
    name: '其他能源',
    unit: '/',
    uploadRequirement: '数据上报',
  },
  {
    id: 9,
    category: '建筑运行',
    subcategory: '居民生活消费',
    name: '电力',
    unit: '万kWh',
    uploadRequirement: '实时监测',
  },
  {
    id: 10,
    category: '建筑运行',
    subcategory: '居民生活消费',
    name: '天然气',
    unit: 'm³',
    uploadRequirement: '实时监测',
  },
  {
    id: 11,
    category: '建筑运行',
    subcategory: '居民生活消费',
    name: '液化石油气',
    unit: 't',
    uploadRequirement: '数据上报',
  },
  {
    id: 12,
    category: '建筑运行',
    subcategory: '居民生活消费',
    name: '其他能源',
    unit: '/',
    uploadRequirement: '数据上报',
  },
  {
    id: 13,
    category: '建筑业',
    name: '电力',
    unit: '万kWh',
    uploadRequirement: '实时监测',
  },
  {
    id: 14,
    category: '建筑业',
    name: '液化石油气',
    unit: 't',
    uploadRequirement: '数据上报',
  },
  {
    id: 15,
    category: '建筑业',
    name: '汽油',
    unit: 't',
    uploadRequirement: '数据上报',
  },
  {
    id: 16,
    category: '建筑业',
    name: '柴油',
    unit: 't',
    uploadRequirement: '数据上报',
  },
  {
    id: 17,
    category: '建筑业',
    name: '天然气',
    unit: 'm³',
    uploadRequirement: '实时监测',
  },
  {
    id: 18,
    category: '建筑业',
    name: '其他能源',
    unit: '/',
    uploadRequirement: '数据上报',
  },
  {
    id: 19,
    category: '基础设施',
    subcategory: '污水厂',
    name: '进口BOD',
    unit: 'mg/L',
    uploadRequirement: '实时监测',
  },
  {
    id: 20,
    category: '基础设施',
    subcategory: '污水厂',
    name: '出口BOD',
    unit: 'mg/L',
    uploadRequirement: '实时监测',
  },
  {
    id: 21,
    category: '基础设施',
    subcategory: '污水厂',
    name: '进水TN浓度',
    unit: 'mg/L',
    uploadRequirement: '实时监测',
  },
  {
    id: 22,
    category: '基础设施',
    subcategory: '污水厂',
    name: '出水TN浓度',
    unit: 'mg/L',
    uploadRequirement: '实时监测',
  },
  {
    id: 23,
    category: '基础设施',
    subcategory: '污水厂',
    name: '电力',
    unit: '万kWh',
    uploadRequirement: '实时监测',
  },
  {
    id: 24,
    category: '基础设施',
    subcategory: '污水厂',
    name: '柴油',
    unit: 't',
    uploadRequirement: '数据上报',
  },
  {
    id: 25,
    category: '基础设施',
    subcategory: '污水厂',
    name: '药剂1',
    unit: 'kg',
    uploadRequirement: '数据上报',
  },
  {
    id: 26,
    category: '基础设施',
    subcategory: '污水厂',
    name: '药剂2',
    unit: 'kg',
    uploadRequirement: '数据上报',
  },
  {
    id: 27,
    category: '基础设施',
    subcategory: '污水厂',
    name: '...',
    unit: '',
    uploadRequirement: '数据上报',
  },
  {
    id: 28,
    category: '基础设施',
    subcategory: '污水厂',
    name: '药剂n',
    unit: 'kg',
    uploadRequirement: '数据上报',
  },
  {
    id: 29,
    category: '基础设施',
    subcategory: '自来水厂',
    name: '电力',
    unit: '万kWh',
    uploadRequirement: '实时监测',
  },
  {
    id: 30,
    category: '基础设施',
    subcategory: '自来水厂',
    name: '柴油',
    unit: 't',
    uploadRequirement: '数据上报',
  },
  {
    id: 31,
    category: '基础设施',
    subcategory: '自来水厂',
    name: '药剂1',
    unit: 'kg',
    uploadRequirement: '数据上报',
  },
  {
    id: 32,
    category: '基础设施',
    subcategory: '自来水厂',
    name: '药剂2',
    unit: 'kg',
    uploadRequirement: '数据上报',
  },
  {
    id: 33,
    category: '基础设施',
    subcategory: '自来水厂',
    name: '...',
    unit: '',
    uploadRequirement: '数据上报',
  },
  {
    id: 34,
    category: '基础设施',
    subcategory: '自来水厂',
    name: '药剂n',
    unit: 'kg',
    uploadRequirement: '数据上报',
  },
  {
    id: 35,
    category: '基础设施',
    subcategory: '路灯',
    name: '电力',
    unit: '万kWh',
    uploadRequirement: '实时监测',
  },
  {
    id: 36,
    category: '基础设施',
    subcategory: '景观灯',
    name: '电力',
    unit: '万kWh',
    uploadRequirement: '实时监测',
  },
  {
    id: 37,
    category: '可再生能源',
    subcategory: '分布式光伏项目',
    name: '发电量',
    unit: '万kWh',
    uploadRequirement: '实时监测',
  },
  {
    id: 38,
    category: '建筑和国土信息',
    subcategory: '居住建筑',
    name: '城镇居住建筑面积',
    unit: 'm³',
    uploadRequirement: '数据上报',
  },
  {
    id: 39,
    category: '建筑和国土信息',
    subcategory: '居住建筑',
    name: '农村居住建筑面积',
    unit: 'm³',
    uploadRequirement: '数据上报',
  },
  {
    id: 40,
    category: '建筑和国土信息',
    subcategory: '公共建筑',
    name: '教育建筑面积',
    unit: 'm³',
    uploadRequirement: '数据上报',
  },
  {
    id: 41,
    category: '建筑和国土信息',
    subcategory: '公共建筑',
    name: '医院建筑面积',
    unit: 'm³',
    uploadRequirement: '数据上报',
  },
  {
    id: 42,
    category: '建筑和国土信息',
    subcategory: '公共建筑',
    name: '行政办公建筑面积',
    unit: 'm³',
    uploadRequirement: '数据上报',
  },
  {
    id: 43,
    category: '建筑和国土信息',
    subcategory: '公共建筑',
    name: '商业建筑面积',
    unit: 'm³',
    uploadRequirement: '数据上报',
  },
  {
    id: 44,
    category: '建筑和国土信息',
    subcategory: '公共建筑',
    name: '宾馆建筑面积',
    unit: 'm³',
    uploadRequirement: '数据上报',
  }
];

// Extract unique categories and subcategories for filter options
const uniqueCategories = Array.from(new Set(sampleParameters.map(p => p.category)));
const getCategorySubcategories = (category: string) => {
  const subcategories = sampleParameters
    .filter(p => p.category === category && p.subcategory)
    .map(p => p.subcategory as string);
  return Array.from(new Set(subcategories));
};

const Parameters = () => {
  const { toast } = useToast();
  const [parameters, setParameters] = useState<Parameter[]>(sampleParameters);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [subcategoryFilter, setSubcategoryFilter] = useState('all');
  const [uploadRequirementFilter, setUploadRequirementFilter] = useState('all');
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [editingParameter, setEditingParameter] = useState<Parameter | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Parameter; direction: 'asc' | 'desc' } | null>(null);

  // Setup form
  const form = useForm<z.infer<typeof parameterFormSchema>>({
    resolver: zodResolver(parameterFormSchema),
    defaultValues: {
      category: '',
      subcategory: '',
      name: '',
      unit: '',
      uploadRequirement: '数据上报',
      emissionFormula: '',
      description: '',
    },
  });

  // Filter parameters
  const filteredParameters = parameters.filter(param => {
    const matchesSearch = searchTerm === '' || 
      param.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      param.unit.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || param.category === categoryFilter;
    const matchesSubcategory = subcategoryFilter === 'all' || param.subcategory === subcategoryFilter;
    const matchesUploadRequirement = uploadRequirementFilter === 'all' || param.uploadRequirement === uploadRequirementFilter;
    
    return matchesSearch && matchesCategory && matchesSubcategory && matchesUploadRequirement;
  });

  // Sort parameters
  const sortedParameters = React.useMemo(() => {
    let sortableParameters = [...filteredParameters];
    if (sortConfig !== null) {
      sortableParameters.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableParameters;
  }, [filteredParameters, sortConfig]);

  const requestSort = (key: keyof Parameter) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleAdd = () => {
    setDialogMode('add');
    form.reset({
      category: '',
      subcategory: '',
      name: '',
      unit: '',
      uploadRequirement: '数据上报',
      emissionFormula: '',
      description: '',
    });
    setShowDialog(true);
  };

  const handleEdit = (parameter: Parameter) => {
    setDialogMode('edit');
    setEditingParameter(parameter);
    form.reset({
      category: parameter.category,
      subcategory: parameter.subcategory || '',
      name: parameter.name,
      unit: parameter.unit,
      uploadRequirement: parameter.uploadRequirement,
      emissionFormula: parameter.emissionFormula || '',
      description: parameter.description || '',
    });
    setShowDialog(true);
  };

  const handleDelete = (id: number) => {
    setParameters(parameters.filter(param => param.id !== id));
    toast({
      title: '删除成功',
      description: '参数已成功删除',
    });
  };

  const onSubmit = (values: z.infer<typeof parameterFormSchema>) => {
    if (dialogMode === 'add') {
      // Fix: Ensuring all required fields are provided
      const newParameter: Parameter = {
        id: parameters.length > 0 ? Math.max(...parameters.map(p => p.id)) + 1 : 1,
        category: values.category,       // Required field
        name: values.name,               // Required field
        unit: values.unit,               // Required field
        uploadRequirement: values.uploadRequirement, // Required field
        subcategory: values.subcategory, // Optional field
        emissionFormula: values.emissionFormula, // Optional field
        description: values.description  // Optional field
      };
      
      setParameters([...parameters, newParameter]);
      toast({
        title: '添加成功',
        description: '新参数已成功添加',
      });
    } else if (dialogMode === 'edit' && editingParameter) {
      setParameters(parameters.map(param => 
        param.id === editingParameter.id ? { 
          ...param, 
          category: values.category,
          name: values.name,
          unit: values.unit,
          uploadRequirement: values.uploadRequirement,
          subcategory: values.subcategory,
          emissionFormula: values.emissionFormula,
          description: values.description
        } : param
      ));
      toast({
        title: '更新成功',
        description: '参数已成功更新',
      });
    }
    setShowDialog(false);
  };

  const handleImport = () => {
    toast({
      title: '导入功能',
      description: '参数导入功能即将推出',
    });
  };

  const handleExport = () => {
    toast({
      title: '导出功能',
      description: '参数数据已准备导出',
    });
  };

  return (
    <MainLayout>
      <PageHeader 
        title="检测参数管理" 
        subtitle="管理碳排放各项监测参数、计量单位与排放公式"
      >
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleImport}>
            <FileUp className="h-4 w-4 mr-2" />
            导入
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <FileDown className="h-4 w-4 mr-2" />
            导出
          </Button>
          <Button onClick={handleAdd}>
            <PlusCircle className="h-4 w-4 mr-2" />
            添加参数
          </Button>
        </div>
      </PageHeader>

      <div className="space-y-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-carbon-gray-400" />
            <Input
              placeholder="搜索参数名称或单位..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部分类</SelectItem>
                {uniqueCategories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={subcategoryFilter} 
              onValueChange={setSubcategoryFilter}
              disabled={categoryFilter === 'all'}
            >
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="子分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部子分类</SelectItem>
                {categoryFilter !== 'all' && getCategorySubcategories(categoryFilter).map((subcategory) => (
                  <SelectItem key={subcategory} value={subcategory}>{subcategory}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={uploadRequirementFilter} onValueChange={setUploadRequirementFilter}>
              <SelectTrigger className="w-[180px]">
                <Sliders className="h-4 w-4 mr-2" />
                <SelectValue placeholder="上传要求" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部要求</SelectItem>
                <SelectItem value="实时监测">实时监测</SelectItem>
                <SelectItem value="数据上报">数据上报</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">序号</TableHead>
              <TableHead onClick={() => requestSort('category')} className="cursor-pointer">
                <div className="flex items-center">
                  分类
                  <ArrowDownUp className="ml-1 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>子分类</TableHead>
              <TableHead onClick={() => requestSort('name')} className="cursor-pointer">
                <div className="flex items-center">
                  监测参数
                  <ArrowDownUp className="ml-1 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>单位</TableHead>
              <TableHead>上传要求</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedParameters.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-carbon-gray-500 dark:text-carbon-gray-400">
                  <div className="flex flex-col items-center">
                    <AlertCircle className="h-10 w-10 mb-2 text-carbon-gray-400" />
                    <p>没有找到匹配的参数</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              sortedParameters.map((parameter) => (
                <TableRow key={parameter.id}>
                  <TableCell>{parameter.id}</TableCell>
                  <TableCell>{parameter.category}</TableCell>
                  <TableCell>{parameter.subcategory || '-'}</TableCell>
                  <TableCell className="font-medium">{parameter.name}</TableCell>
                  <TableCell>{parameter.unit}</TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "font-normal",
                      parameter.uploadRequirement === '实时监测' 
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        : "bg-carbon-gray-100 text-carbon-gray-800 dark:bg-carbon-gray-800 dark:text-carbon-gray-300"
                    )}>
                      {parameter.uploadRequirement}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEdit(parameter)}
                      >
                        <Edit className="h-4 w-4 text-carbon-gray-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(parameter.id)}
                      >
                        <Trash2 className="h-4 w-4 text-carbon-gray-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{dialogMode === 'add' ? '添加监测参数' : '编辑监测参数'}</DialogTitle>
            <DialogDescription>
              {dialogMode === 'add' ? '添加新的碳排放监测参数及相关信息' : '修改当前监测参数信息'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>分类</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择分类" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {uniqueCategories.map((category) => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subcategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>子分类 (可选)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="输入子分类" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>监测参数名称</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="输入参数名称" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>计量单位</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="输入计量单位" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="uploadRequirement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>上传要求</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="选择上传要求" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="实时监测">实时监测</SelectItem>
                        <SelectItem value="数据上报">数据上报</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="emissionFormula"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>碳排放计算公式 (可选)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="例：E = 活动量 × 排放因子" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      输入计算此参数对应碳排放量的计算公式
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>描述 (可选)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="输入参数描述信息" 
                        {...field} 
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                  取消
                </Button>
                <Button type="submit">
                  {dialogMode === 'add' ? '添加' : '保存'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Parameters;


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
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Zap, 
  Droplets, 
  Flame, 
  TestTube, 
  Fuel,
  CalendarIcon, 
  Building, 
  Save,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the form schema
const formSchema = z.object({
  dataType: z.enum(['electricity', 'natural_gas', 'lpg', 'chemical', 'diesel']),
  buildingId: z.string().min(1, { message: '请选择楼栋' }),
  reportDate: z.string().min(1, { message: '请选择上报日期' }),
  value: z.string().min(1, { message: '请输入数值' }),
  unit: z.string().min(1, { message: '请选择单位' }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const dataTypeConfig = {
  electricity: {
    icon: <Zap className="h-5 w-5" />,
    title: '电力消耗',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    darkBgColor: 'dark:bg-blue-900/20',
    defaultUnit: 'kWh',
    units: [
      { value: 'kWh', label: '千瓦时 (kWh)' },
      { value: 'MWh', label: '兆瓦时 (MWh)' },
    ],
  },
  natural_gas: {
    icon: <Flame className="h-5 w-5" />,
    title: '天然气',
    color: 'text-orange-500',
    bgColor: 'bg-orange-100',
    darkBgColor: 'dark:bg-orange-900/20',
    defaultUnit: 'm³',
    units: [
      { value: 'm³', label: '立方米 (m³)' },
      { value: 'ft³', label: '立方英尺 (ft³)' },
    ],
  },
  lpg: {
    icon: <Droplets className="h-5 w-5" />,
    title: '液化石油气',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-100',
    darkBgColor: 'dark:bg-indigo-900/20',
    defaultUnit: 'kg',
    units: [
      { value: 'kg', label: '千克 (kg)' },
      { value: 't', label: '吨 (t)' },
    ],
  },
  chemical: {
    icon: <TestTube className="h-5 w-5" />,
    title: '药剂用量',
    color: 'text-purple-500',
    bgColor: 'bg-purple-100',
    darkBgColor: 'dark:bg-purple-900/20',
    defaultUnit: 'kg',
    units: [
      { value: 'kg', label: '千克 (kg)' },
      { value: 'L', label: '升 (L)' },
    ],
  },
  diesel: {
    icon: <Fuel className="h-5 w-5" />,
    title: '柴油',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100',
    darkBgColor: 'dark:bg-yellow-900/20',
    defaultUnit: 'L',
    units: [
      { value: 'L', label: '升 (L)' },
      { value: 'gal', label: '加仑 (gal)' },
    ],
  },
};

// Sample building data
const sampleBuildings = [
  { id: '1', name: '福建省行政中心主楼' },
  { id: '2', name: '环保大厦' },
  { id: '3', name: '福州市民服务中心' },
  { id: '4', name: '海峡国际会展中心' },
  { id: '5', name: '福建师范大学旗山校区图书馆' },
];

const DataTypeCard = ({ 
  type, 
  icon, 
  title, 
  active, 
  onClick, 
  className = '',
  color,
  bgColor,
  darkBgColor
}: { 
  type: string;
  icon: React.ReactNode;
  title: string;
  active: boolean;
  onClick: () => void;
  className?: string;
  color: string;
  bgColor: string;
  darkBgColor: string;
}) => {
  return (
    <div 
      className={cn(
        'flex flex-col items-center justify-center p-4 rounded-md cursor-pointer transition-all',
        active 
          ? `border-2 border-carbon-green-500 ${bgColor} ${darkBgColor}` 
          : 'border border-carbon-gray-200 dark:border-carbon-gray-800 hover:border-carbon-green-500 hover:bg-carbon-green-50 dark:hover:bg-carbon-green-900/10',
        className
      )}
      onClick={onClick}
    >
      <div className={cn('mb-2', color)}>
        {icon}
      </div>
      <span className="text-sm font-medium">{title}</span>
    </div>
  );
};

const ManualDataForm = () => {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<keyof typeof dataTypeConfig>('electricity');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dataType: selectedType,
      buildingId: '',
      reportDate: new Date().toISOString().split('T')[0],
      value: '',
      unit: dataTypeConfig[selectedType].defaultUnit,
      notes: '',
    },
  });

  const handleTypeChange = (type: keyof typeof dataTypeConfig) => {
    setSelectedType(type);
    form.setValue('dataType', type);
    form.setValue('unit', dataTypeConfig[type].defaultUnit);
  };

  const onSubmit = async (values: FormValues) => {
    console.log('Form Values:', values);
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast({
        title: "数据提交成功",
        description: `${dataTypeConfig[values.dataType].title}数据已成功上报`,
      });
      
      // Reset success state after a delay
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>数据手动上报</CardTitle>
          <CardDescription>
            选择数据类型并填写相关信息进行碳排放数据上报
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">选择数据类型</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(dataTypeConfig).map(([key, config]) => (
                <DataTypeCard
                  key={key}
                  type={key}
                  icon={config.icon}
                  title={config.title}
                  active={selectedType === key}
                  onClick={() => handleTypeChange(key as keyof typeof dataTypeConfig)}
                  color={config.color}
                  bgColor={config.bgColor}
                  darkBgColor={config.darkBgColor}
                />
              ))}
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="buildingId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>楼栋</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择楼栋" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sampleBuildings.map((building) => (
                            <SelectItem key={building.id} value={building.id}>
                              {building.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        选择需要上报数据的楼栋
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="reportDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>上报日期</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-carbon-gray-500" />
                          <Input
                            {...field}
                            type="date"
                            className="pl-9"
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        选择数据对应的日期
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>数据值</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          placeholder="输入数值"
                        />
                      </FormControl>
                      <FormDescription>
                        输入{dataTypeConfig[selectedType].title}数值
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>单位</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择单位" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {dataTypeConfig[selectedType].units.map((unit) => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        选择计量单位
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>备注</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="输入备注信息（可选）"
                        rows={3}
                      />
                    </FormControl>
                    <FormDescription>
                      添加关于此次数据上报的补充说明
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="min-w-[120px]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      处理中...
                    </span>
                  ) : isSuccess ? (
                    <span className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      提交成功
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Save className="h-4 w-4 mr-2" />
                      提交数据
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManualDataForm;

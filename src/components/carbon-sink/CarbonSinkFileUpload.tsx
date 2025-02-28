
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
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  FileSpreadsheet, 
  Upload, 
  Download, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  FileQuestion, 
  TreePine,
  Leaf
} from 'lucide-react';
import { cn } from '@/lib/utils';

const CarbonSinkFileUpload = () => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is Excel
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      setSelectedFile(file);
      
      toast({
        title: "文件已选择",
        description: `${file.name} (${formatFileSize(file.size)})`,
      });
    } else {
      toast({
        title: "不支持的文件格式",
        description: "请上传 Excel (.xlsx, .xls) 文件",
        variant: "destructive",
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval);
      setUploading(false);
      setUploadProgress(100);
      
      toast({
        title: "文件上传成功",
        description: `${selectedFile.name} 已成功上传并处理`,
      });
      
      setSelectedFile(null);
    }, 3000);
  };

  const downloadTemplate = (type: string) => {
    toast({
      title: "模板下载",
      description: `${type}模板下载已开始`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>碳汇数据上传</CardTitle>
            <CardDescription>
              通过上传Excel文件批量导入森林覆盖率、绿化面积等碳汇数据
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className={cn(
                "border-2 border-dashed rounded-md p-8 transition-all text-center",
                dragActive 
                  ? "border-green-500 bg-green-50 dark:bg-green-900/10" 
                  : "border-gray-300 dark:border-gray-700 hover:border-green-500 hover:bg-gray-50 dark:hover:bg-gray-900/10"
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/20">
                  <FileSpreadsheet className="h-8 w-8 text-green-600 dark:text-green-500" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-lg font-medium">拖拽文件到此处或点击上传</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    支持 Excel (.xlsx, .xls) 文件格式
                  </p>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => document.getElementById('carbon-sink-file-upload')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  选择文件
                </Button>
                <input
                  id="carbon-sink-file-upload"
                  type="file"
                  className="hidden"
                  accept=".xlsx,.xls"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            
            {selectedFile && (
              <div className="border rounded-md p-4 mt-6 bg-gray-50 dark:bg-gray-900/30">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <FileSpreadsheet className="h-6 w-6 text-gray-500" />
                    <div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="default" 
                    onClick={handleUpload}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        上传中...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        开始上传
                      </>
                    )}
                  </Button>
                </div>
                
                {uploading && (
                  <div className="mt-4">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-xs text-right mt-1 text-gray-500">
                      {uploadProgress}%
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Info className="h-4 w-4 mr-2" />
              请确保上传文件符合模板要求
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => downloadTemplate('森林覆盖数据')}
              >
                <Download className="h-4 w-4 mr-2" />
                <TreePine className="h-4 w-4 mr-2" />
                下载森林数据模板
              </Button>
              <Button 
                variant="outline" 
                onClick={() => downloadTemplate('绿化面积数据')}
              >
                <Download className="h-4 w-4 mr-2" />
                <Leaf className="h-4 w-4 mr-2" />
                下载绿化数据模板
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>上传说明</CardTitle>
            <CardDescription>碳汇数据上传格式要求与说明</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>文件格式要求</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    上传的Excel文件必须包含以下列：<br />
                    - 数据年份（必填）<br />
                    - 数据类型（森林覆盖/绿化面积）<br />
                    - 地区/区域<br />
                    - 面积（公顷）<br />
                    - 增长率（%，可选）<br />
                    - 备注（可选）<br />
                    <br />
                    请下载模板文件以获取正确的格式示例。
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>碳汇计算方法</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    系统基于以下参数计算碳汇能力：<br />
                    - 森林碳汇：按每公顷年均固碳量约5-10吨计算<br />
                    - 绿化碳汇：按每公顷年均固碳量约2-4吨计算<br />
                    <br />
                    具体计算公式：<br />
                    碳汇量 = 面积 × 单位面积固碳能力 × 生长系数
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>常见问题</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    <strong>Q: 文件上传失败，提示格式错误</strong><br />
                    A: 请确保按照模板格式填写，并检查必填字段是否完整。<br /><br />
                    
                    <strong>Q: 如何更新历史数据？</strong><br />
                    A: 上传新的数据文件时，系统会自动检测并提示是否覆盖同年份同区域的历史数据。<br /><br />
                    
                    <strong>Q: 碳汇计算结果不准确</strong><br />
                    A: 请检查输入的面积单位是否为公顷，如是其他单位（如平方公里）请先转换。
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter className="justify-center border-t p-6">
            <Button variant="outline" className="w-full">
              <FileQuestion className="h-4 w-4 mr-2" />
              查看完整数据指南
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CarbonSinkFileUpload;

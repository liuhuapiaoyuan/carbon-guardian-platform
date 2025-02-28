
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileSpreadsheet, 
  Upload, 
  Download, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FileHistoryItem {
  id: string;
  filename: string;
  fileType: 'excel' | 'csv';
  uploadDate: string;
  status: 'success' | 'partial' | 'failed';
  size: string;
  recordCount: number;
  successCount: number;
  failedCount: number;
}

const sampleHistory: FileHistoryItem[] = [
  {
    id: '1',
    filename: '福州市行政中心用电量.xlsx',
    fileType: 'excel',
    uploadDate: '2023-06-15 14:30',
    status: 'success',
    size: '256KB',
    recordCount: 120,
    successCount: 120,
    failedCount: 0
  },
  {
    id: '2',
    filename: '厦门市政务大厦能耗数据.csv',
    fileType: 'csv',
    uploadDate: '2023-06-10 09:15',
    status: 'partial',
    size: '128KB',
    recordCount: 95,
    successCount: 87,
    failedCount: 8
  },
  {
    id: '3',
    filename: '福建省医院系统能耗.xlsx',
    fileType: 'excel',
    uploadDate: '2023-06-05 16:45',
    status: 'failed',
    size: '512KB',
    recordCount: 210,
    successCount: 0,
    failedCount: 210
  },
];

const getStatusBadge = (status: FileHistoryItem['status']) => {
  switch (status) {
    case 'success':
      return <Badge className="bg-carbon-green-100 text-carbon-green-800 dark:bg-carbon-green-900/30 dark:text-carbon-green-300">
        <CheckCircle className="h-3.5 w-3.5 mr-1" />
        导入成功
      </Badge>;
    case 'partial':
      return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
        <AlertCircle className="h-3.5 w-3.5 mr-1" />
        部分成功
      </Badge>;
    case 'failed':
      return <Badge className="bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300">
        <XCircle className="h-3.5 w-3.5 mr-1" />
        导入失败
      </Badge>;
    default:
      return null;
  }
};

const FileImport = () => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<'excel' | 'csv'>('excel');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [history, setHistory] = useState<FileHistoryItem[]>(sampleHistory);

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
    // Check if file is Excel or CSV
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (fileExtension === 'xlsx' || fileExtension === 'xls' || fileExtension === 'csv') {
      setSelectedFile(file);
      setFileType(fileExtension === 'csv' ? 'csv' : 'excel');
      
      toast({
        title: "文件已选择",
        description: `${file.name} (${formatFileSize(file.size)})`,
      });
    } else {
      toast({
        title: "不支持的文件格式",
        description: "请上传 Excel (.xlsx, .xls) 或 CSV 文件",
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
        return prev + 10;
      });
    }, 300);

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval);
      setUploading(false);
      setUploadProgress(100);
      
      // Add to history
      const newHistoryItem: FileHistoryItem = {
        id: Date.now().toString(),
        filename: selectedFile.name,
        fileType: fileType,
        uploadDate: new Date().toLocaleString(),
        status: 'success',
        size: formatFileSize(selectedFile.size),
        recordCount: Math.floor(Math.random() * 100) + 50,
        successCount: Math.floor(Math.random() * 100) + 50,
        failedCount: 0,
      };
      
      setHistory([newHistoryItem, ...history]);
      
      toast({
        title: "文件上传成功",
        description: `${selectedFile.name} 已成功上传并处理`,
      });
      
      setSelectedFile(null);
    }, 3000);
  };

  const handleDownloadTemplate = (type: 'excel' | 'csv') => {
    toast({
      title: `${type === 'excel' ? 'Excel' : 'CSV'} 模板下载`,
      description: "模板文件下载已开始",
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>文件批量导入</CardTitle>
          <CardDescription>
            通过上传 Excel 或 CSV 文件批量导入碳排放数据
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="upload">文件上传</TabsTrigger>
              <TabsTrigger value="history">上传历史</TabsTrigger>
              <TabsTrigger value="help">帮助指南</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload">
              <div className="space-y-6">
                <div 
                  className={cn(
                    "border-2 border-dashed rounded-md p-8 transition-all text-center",
                    dragActive 
                      ? "border-carbon-green-500 bg-carbon-green-50 dark:bg-carbon-green-900/10" 
                      : "border-carbon-gray-300 dark:border-carbon-gray-700 hover:border-carbon-green-500 hover:bg-carbon-gray-50 dark:hover:bg-carbon-gray-900/10"
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="rounded-full p-3 bg-carbon-green-100 dark:bg-carbon-green-900/20">
                      <FileSpreadsheet className="h-8 w-8 text-carbon-green-600 dark:text-carbon-green-500" />
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-lg font-medium">拖拽文件到此处或点击上传</p>
                      <p className="text-sm text-carbon-gray-500 dark:text-carbon-gray-400">
                        支持 Excel (.xlsx, .xls) 或 CSV 文件格式
                      </p>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      选择文件
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".xlsx,.xls,.csv"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                
                {selectedFile && (
                  <div className="border rounded-md p-4 bg-carbon-gray-50 dark:bg-carbon-gray-900/30">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <FileSpreadsheet className="h-6 w-6 text-carbon-gray-500" />
                        <div>
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-carbon-gray-500 dark:text-carbon-gray-400">
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
                        <p className="text-xs text-right mt-1 text-carbon-gray-500">
                          {uploadProgress}%
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 justify-end">
                  <Button 
                    variant="outline" 
                    onClick={() => handleDownloadTemplate('excel')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    下载 Excel 模板
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDownloadTemplate('csv')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    下载 CSV 模板
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="状态筛选" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部状态</SelectItem>
                      <SelectItem value="success">导入成功</SelectItem>
                      <SelectItem value="partial">部分成功</SelectItem>
                      <SelectItem value="failed">导入失败</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>文件名</TableHead>
                        <TableHead>上传时间</TableHead>
                        <TableHead>大小</TableHead>
                        <TableHead>记录数</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {history.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <FileSpreadsheet className="h-4 w-4 mr-2 text-carbon-gray-500" />
                              <span>{item.filename}</span>
                            </div>
                          </TableCell>
                          <TableCell>{item.uploadDate}</TableCell>
                          <TableCell>{item.size}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <span className="font-medium">{item.recordCount}</span>
                              {item.status !== 'success' && (
                                <span className="text-xs text-carbon-gray-500">
                                  ({item.successCount} 成功, {item.failedCount} 失败)
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              查看详情
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="help">
              <div className="space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Excel/CSV 文件格式要求</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-carbon-gray-600 dark:text-carbon-gray-400 leading-relaxed">
                        上传的 Excel 或 CSV 文件必须按照系统模板格式，包含以下列：<br />
                        - 数据类型（电力/天然气/液化石油气/药剂/柴油）<br />
                        - 楼栋编码<br />
                        - 上报日期<br />
                        - 数据值<br />
                        - 单位<br />
                        - 备注（可选）<br />
                        <br />
                        请下载模板文件以获取正确的格式示例。
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>常见问题与解决方案</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-carbon-gray-600 dark:text-carbon-gray-400 leading-relaxed">
                        <strong>Q: 文件上传失败，显示格式错误</strong><br />
                        A: 请确保您的文件是 .xlsx, .xls 或 .csv 格式，且内容符合模板要求。<br /><br />
                        
                        <strong>Q: 部分数据导入失败</strong><br />
                        A: 查看详情页面的错误记录，常见原因包括：楼栋编码不存在、数据值格式不正确、必填项缺失等。<br /><br />
                        
                        <strong>Q: 上传大文件时遇到超时</strong><br />
                        A: 建议将大文件分成多个小文件（每个不超过 5MB），分批上传。
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>数据验证规则</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-carbon-gray-600 dark:text-carbon-gray-400 leading-relaxed">
                        系统对导入的数据进行以下验证：<br />
                        - 楼栋编码必须存在于系统中<br />
                        - 数据值必须为有效数字<br />
                        - 上报日期格式必须为 YYYY-MM-DD<br />
                        - 单位必须与数据类型匹配<br />
                        - 同一楼栋、同一日期、同一数据类型不允许重复上报<br />
                        <br />
                        不符合上述规则的数据将标记为导入失败。
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileImport;

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash } from 'lucide-react';
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { OrganizationTree, OrganizationNode, getTypeIcon, organizationData } from '@/components/organization/OrganizationTree';

const Organization = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNode, setSelectedNode] = useState<OrganizationNode | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newOrgData, setNewOrgData] = useState({
    name: '',
    code: '',
    type: 'organization',
    responsible: '',
    location: ''
  });

  const handleSelectNode = (node: OrganizationNode) => {
    setSelectedNode(node);
  };

  const getTypeText = (type: OrganizationNode['type']) => {
    const typeMap: Record<string, string> = {
      'province': '省级',
      'city': '市级',
      'county': '县区级',
      'organization': '单位',
      'building': '楼栋'
    };
    return typeMap[type] || type;
  };

  return (
    <MainLayout>
      <PageHeader 
        title="组织架构管理" 
        subtitle="管理多层级组织架构，配置基础信息和位置"
      >
        <Button onClick={() => setAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          <span>添加组织</span>
        </Button>
      </PageHeader>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="carbon-card">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-medium">组织结构树</h3>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-carbon-gray-400" />
              <Input
                placeholder="搜索组织..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="border rounded-md bg-carbon-gray-50 dark:bg-carbon-gray-900/30 overflow-y-auto h-[calc(100vh-320px)]">
              <OrganizationTree
                onSelectNode={handleSelectNode}
                selectedNodeId={selectedNode?.id || null}
              />
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <div className="carbon-card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">
                {selectedNode ? selectedNode.name : '组织详情'}
              </h3>
              {selectedNode && (
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
              )}
            </div>
            
            {selectedNode ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-medium text-carbon-gray-500 mb-2">基本信息</h4>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium w-1/3">组织名称</TableCell>
                          <TableCell>{selectedNode.name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">组织编码</TableCell>
                          <TableCell>{selectedNode.code}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">组织类型</TableCell>
                          <TableCell>{getTypeText(selectedNode.type)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">负责人</TableCell>
                          <TableCell>{selectedNode.responsible}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">地理位置</TableCell>
                          <TableCell>{selectedNode.location}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-carbon-gray-500 mb-2">下级组织概况</h4>
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>类型</TableHead>
                            <TableHead>数量</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>市级单位</TableCell>
                            <TableCell>{selectedNode.type === 'province' ? selectedNode.children?.length || 0 : 0}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>县区级单位</TableCell>
                            <TableCell>
                              {
                                selectedNode.type === 'province' 
                                  ? selectedNode.children?.reduce((acc, city) => acc + (city.children?.length || 0), 0)
                                  : selectedNode.type === 'city' ? selectedNode.children?.length || 0 : 0
                              }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>直属单位</TableCell>
                            <TableCell>
                              {
                                selectedNode.type === 'county' 
                                  ? selectedNode.children?.length || 0 
                                  : 0
                              }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>楼栋数量</TableCell>
                            <TableCell>
                              {
                                selectedNode.type === 'organization' 
                                  ? selectedNode.children?.length || 0 
                                  : 0
                              }
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                
                {selectedNode.children && selectedNode.children.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-carbon-gray-500 mb-4">下级组织列表</h4>
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>名称</TableHead>
                            <TableHead>编码</TableHead>
                            <TableHead>类型</TableHead>
                            <TableHead>负责人</TableHead>
                            <TableHead>位置</TableHead>
                            <TableHead className="text-right">操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedNode.children.map((child) => (
                            <TableRow key={child.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center">
                                  {getTypeIcon(child.type)}
                                  <span className="ml-2">{child.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>{child.code}</TableCell>
                              <TableCell>{getTypeText(child.type)}</TableCell>
                              <TableCell>{child.responsible}</TableCell>
                              <TableCell className="max-w-[200px] truncate">{child.location}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[200px] text-carbon-gray-500">
                请从左侧选择一个组织查看详情
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>添加新组织</DialogTitle>
            <DialogDescription>
              在当前选中的层级下添加新的组织结构
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                名称
              </Label>
              <Input
                id="name"
                placeholder="组织名称"
                className="col-span-3"
                value={newOrgData.name}
                onChange={(e) => setNewOrgData({...newOrgData, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                编码
              </Label>
              <Input
                id="code"
                placeholder="组织编码"
                className="col-span-3"
                value={newOrgData.code}
                onChange={(e) => setNewOrgData({...newOrgData, code: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                类型
              </Label>
              <Select 
                value={newOrgData.type} 
                onValueChange={(value) => setNewOrgData({...newOrgData, type: value as any})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="选择类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="province">省级</SelectItem>
                  <SelectItem value="city">市级</SelectItem>
                  <SelectItem value="county">县区级</SelectItem>
                  <SelectItem value="organization">单位</SelectItem>
                  <SelectItem value="building">楼栋</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="responsible" className="text-right">
                负责人
              </Label>
              <Input
                id="responsible"
                placeholder="负责人姓名"
                className="col-span-3"
                value={newOrgData.responsible}
                onChange={(e) => setNewOrgData({...newOrgData, responsible: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                位置
              </Label>
              <Input
                id="location"
                placeholder="地理位置"
                className="col-span-3"
                value={newOrgData.location}
                onChange={(e) => setNewOrgData({...newOrgData, location: e.target.value})}
              />
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
    </MainLayout>
  );
};

export default Organization;

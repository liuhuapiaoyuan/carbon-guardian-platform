
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, Filter, Home, MapPin, PieChart } from 'lucide-react';
import { EmissionMap } from './EmissionMap';
import { RegionalRanking } from './RegionalRanking';
import { EmissionsBreakdown } from './EmissionsBreakdown';
import { DrillDownPanel } from './DrillDownPanel';

const filterOptions = [
  { value: 'region', label: '行政区域' },
  { value: 'building', label: '建筑类型' },
  { value: 'energy', label: '能源类型' },
];

const CarbonDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState('region');
  const [drilldownRegion, setDrilldownRegion] = useState<string | null>(null);
  
  const handleRegionClick = (region: string) => {
    setDrilldownRegion(region);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">惠安县碳排放一张图</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground mr-2">分析维度:</span>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="选择分析维度" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="sm">
            <PieChart className="h-4 w-4 mr-2" />
            <span>切换视图</span>
          </Button>
        </div>
      </div>
      
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[500px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">碳排放地理分布</CardTitle>
              <CardDescription>惠安县各区域碳排放热力图</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <EmissionMap onRegionClick={handleRegionClick} />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-[500px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">排放量排名</CardTitle>
              <CardDescription>按排放量由高到低排序</CardDescription>
            </CardHeader>
            <CardContent>
              <RegionalRanking selectedFilter={selectedFilter} onRegionClick={handleRegionClick} />
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Drill Down Section */}
      {drilldownRegion && (
        <div className="mt-8">
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <Home className="h-4 w-4 mr-1" />
              <span>惠安县</span>
              <ArrowRight className="h-4 w-4 mx-2" />
              <Building2 className="h-4 w-4 mr-1" />
              <span className="font-medium">{drilldownRegion}</span>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setDrilldownRegion(null)}>
              返回总览
            </Button>
          </div>
          
          <DrillDownPanel region={drilldownRegion} filterType={selectedFilter} />
        </div>
      )}
      
      {/* Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">排放量按建筑类型分布</CardTitle>
            <CardDescription>各类型建筑物碳排放占比</CardDescription>
          </CardHeader>
          <CardContent>
            <EmissionsBreakdown breakdownType="building" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">排放量按能源类型分布</CardTitle>
            <CardDescription>各能源使用碳排放占比</CardDescription>
          </CardHeader>
          <CardContent>
            <EmissionsBreakdown breakdownType="energy" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CarbonDashboard;

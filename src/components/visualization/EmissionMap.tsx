
import React from 'react';
import { Card } from "@/components/ui/card";

interface EmissionMapProps {
  onRegionClick: (region: string) => void;
}

export const EmissionMap = ({ onRegionClick }: EmissionMapProps) => {
  // Placeholder for a real map component
  // In a real app, this would use a mapping library like MapBox or Leaflet
  return (
    <div className="relative h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="absolute inset-0 p-4">
        <svg viewBox="0 0 800 600" className="w-full h-full">
          {/* 惠安县地图简化版 - 实际应用中应使用真实的GeoJSON数据 */}
          {/* 这里用简单的多边形模拟惠安县的几个区域 */}
          
          {/* 崇武镇 */}
          <path 
            d="M500,100 L600,120 L620,200 L540,230 L480,180 Z" 
            fill="#22c55e" 
            fillOpacity="0.7" 
            stroke="#047857" 
            strokeWidth="2"
            onClick={() => onRegionClick('崇武镇')}
            className="cursor-pointer hover:fill-green-400 transition-colors"
          />
          
          {/* 惠安城区 */}
          <path 
            d="M350,250 L450,220 L500,300 L420,380 L330,320 Z" 
            fill="#22c55e" 
            fillOpacity="0.9" 
            stroke="#047857" 
            strokeWidth="2"
            onClick={() => onRegionClick('惠安城区')}
            className="cursor-pointer hover:fill-green-400 transition-colors"
          />
          
          {/* 黄塘镇 */}
          <path 
            d="M200,300 L300,270 L330,380 L250,400 L190,350 Z" 
            fill="#22c55e" 
            fillOpacity="0.6" 
            stroke="#047857" 
            strokeWidth="2"
            onClick={() => onRegionClick('黄塘镇')}
            className="cursor-pointer hover:fill-green-400 transition-colors"
          />
          
          {/* 东桥镇 */}
          <path 
            d="M400,400 L500,380 L530,450 L450,500 L380,460 Z" 
            fill="#22c55e" 
            fillOpacity="0.8" 
            stroke="#047857" 
            strokeWidth="2"
            onClick={() => onRegionClick('东桥镇')}
            className="cursor-pointer hover:fill-green-400 transition-colors"
          />
          
          {/* 文标 */}
          <text x="560" y="160" fill="#000" fontSize="12" fontWeight="bold">崇武镇</text>
          <text x="400" y="300" fill="#000" fontSize="12" fontWeight="bold">惠安城区</text>
          <text x="250" y="340" fill="#000" fontSize="12" fontWeight="bold">黄塘镇</text>
          <text x="450" y="450" fill="#000" fontSize="12" fontWeight="bold">东桥镇</text>
          
          {/* 热点标记 */}
          <circle cx="550" cy="150" r="20" fill="red" fillOpacity="0.3" />
          <circle cx="400" cy="300" r="30" fill="red" fillOpacity="0.5" />
          <circle cx="250" cy="350" r="15" fill="red" fillOpacity="0.2" />
          <circle cx="450" cy="450" r="25" fill="red" fillOpacity="0.4" />
        </svg>
      </div>
      
      <div className="absolute bottom-4 right-4 p-2 bg-white dark:bg-gray-900 shadow-md rounded-md">
        <div className="text-xs font-medium mb-1">碳排放强度</div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-green-200 mr-1"></div>
          <span className="text-xs">低</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-1"></div>
          <span className="text-xs">中</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-green-800 mr-1"></div>
          <span className="text-xs">高</span>
        </div>
      </div>
      
      <div className="absolute top-4 left-4 p-2 bg-white dark:bg-gray-900 shadow-md rounded-md text-xs">
        点击区域查看详情
      </div>
    </div>
  );
};

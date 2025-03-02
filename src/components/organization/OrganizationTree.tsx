
import React, { useState } from 'react';
import { Building2, Users, MapPin, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the OrganizationNode type that will be used across organization-related components
export interface OrganizationNode {
  id: string;
  name: string;
  code: string;
  type: 'province' | 'city' | 'county' | 'organization' | 'building';
  responsible: string;
  location: string;
  children?: OrganizationNode[];
}

// Sample data for Huian County, Quanzhou City, Fujian Province
export const organizationData: OrganizationNode = {
  id: "FJ",
  name: "福建省",
  code: "FJ-350000",
  type: "province",
  responsible: "省长",
  location: "福建省福州市",
  children: [
    {
      id: "QZ",
      name: "泉州市",
      code: "QZ-350500",
      type: "city",
      responsible: "市长",
      location: "福建省泉州市",
      children: [
        {
          id: "HA",
          name: "惠安县",
          code: "HA-350521",
          type: "county",
          responsible: "县长",
          location: "福建省泉州市惠安县",
          children: [
            {
              id: "HA-GOV",
              name: "惠安县政府",
              code: "HA-GOV-001",
              type: "organization",
              responsible: "县委书记",
              location: "惠安县城关镇政府大道1号",
              children: [
                {
                  id: "HA-GOV-MB",
                  name: "主楼",
                  code: "HA-GOV-MB-001",
                  type: "building",
                  responsible: "行政办公室主任",
                  location: "惠安县城关镇政府大道1号"
                },
                {
                  id: "HA-GOV-AB",
                  name: "附楼",
                  code: "HA-GOV-AB-002",
                  type: "building",
                  responsible: "后勤部门主管",
                  location: "惠安县城关镇政府大道1号"
                }
              ]
            },
            {
              id: "HA-PS",
              name: "惠安县公安局",
              code: "HA-PS-002",
              type: "organization",
              responsible: "局长",
              location: "惠安县城关镇安全路88号",
              children: [
                {
                  id: "HA-PS-MB",
                  name: "指挥中心",
                  code: "HA-PS-MB-001",
                  type: "building",
                  responsible: "指挥中心主任",
                  location: "惠安县城关镇安全路88号"
                }
              ]
            },
            {
              id: "HA-EDU",
              name: "惠安县教育局",
              code: "HA-EDU-003",
              type: "organization",
              responsible: "局长",
              location: "惠安县城关镇育才路25号",
              children: [
                {
                  id: "HA-EDU-MB",
                  name: "办公楼",
                  code: "HA-EDU-MB-001",
                  type: "building",
                  responsible: "办公室主任",
                  location: "惠安县城关镇育才路25号"
                }
              ]
            },
            {
              id: "HA-HS",
              name: "惠安县第一中学",
              code: "HA-HS-004",
              type: "organization",
              responsible: "校长",
              location: "惠安县城关镇学府路56号",
              children: [
                {
                  id: "HA-HS-TB",
                  name: "教学楼",
                  code: "HA-HS-TB-001",
                  type: "building",
                  responsible: "教务主任",
                  location: "惠安县城关镇学府路56号"
                },
                {
                  id: "HA-HS-DB",
                  name: "宿舍楼",
                  code: "HA-HS-DB-002",
                  type: "building",
                  responsible: "学生处主任",
                  location: "惠安县城关镇学府路56号"
                },
                {
                  id: "HA-HS-CB",
                  name: "食堂",
                  code: "HA-HS-CB-003",
                  type: "building",
                  responsible: "后勤主任",
                  location: "惠安县城关镇学府路56号"
                }
              ]
            },
            {
              id: "HA-HOSP",
              name: "惠安县人民医院",
              code: "HA-HOSP-005",
              type: "organization",
              responsible: "院长",
              location: "惠安县城关镇健康路120号",
              children: [
                {
                  id: "HA-HOSP-MB",
                  name: "门诊部",
                  code: "HA-HOSP-MB-001",
                  type: "building",
                  responsible: "门诊部主任",
                  location: "惠安县城关镇健康路120号"
                },
                {
                  id: "HA-HOSP-IB",
                  name: "住院部",
                  code: "HA-HOSP-IB-002",
                  type: "building",
                  responsible: "住院部主任",
                  location: "惠安县城关镇健康路120号"
                }
              ]
            },
            {
              id: "HA-CULT",
              name: "惠安县文化馆",
              code: "HA-CULT-006",
              type: "organization",
              responsible: "馆长",
              location: "惠安县城关镇文化路15号",
              children: [
                {
                  id: "HA-CULT-MB",
                  name: "主馆",
                  code: "HA-CULT-MB-001",
                  type: "building",
                  responsible: "主管",
                  location: "惠安县城关镇文化路15号"
                },
                {
                  id: "HA-CULT-HB",
                  name: "多功能厅",
                  code: "HA-CULT-HB-002",
                  type: "building",
                  responsible: "活动主管",
                  location: "惠安县城关镇文化路15号"
                }
              ]
            },
            {
              id: "HA-LIB",
              name: "惠安县图书馆",
              code: "HA-LIB-007",
              type: "organization",
              responsible: "馆长",
              location: "惠安县城关镇阅读路33号",
              children: [
                {
                  id: "HA-LIB-MB",
                  name: "阅览室",
                  code: "HA-LIB-MB-001",
                  type: "building",
                  responsible: "阅览室主管",
                  location: "惠安县城关镇阅读路33号"
                }
              ]
            },
            {
              id: "HA-SPORT",
              name: "惠安县体育馆",
              code: "HA-SPORT-008",
              type: "organization",
              responsible: "馆长",
              location: "惠安县城关镇体育路77号",
              children: [
                {
                  id: "HA-SPORT-MB",
                  name: "主馆",
                  code: "HA-SPORT-MB-001",
                  type: "building",
                  responsible: "场馆主管",
                  location: "惠安县城关镇体育路77号"
                },
                {
                  id: "HA-SPORT-SB",
                  name: "游泳馆",
                  code: "HA-SPORT-SB-002",
                  type: "building",
                  responsible: "游泳馆主管",
                  location: "惠安县城关镇体育路77号"
                }
              ]
            },
            {
              id: "HA-ADMIN",
              name: "惠安县行政服务中心",
              code: "HA-ADMIN-009",
              type: "organization",
              responsible: "主任",
              location: "惠安县城关镇服务路10号",
              children: [
                {
                  id: "HA-ADMIN-MB",
                  name: "一号大厅",
                  code: "HA-ADMIN-MB-001",
                  type: "building",
                  responsible: "大厅主管",
                  location: "惠安县城关镇服务路10号"
                }
              ]
            },
            {
              id: "HA-HOSP2",
              name: "惠安县第二医院",
              code: "HA-HOSP2-010",
              type: "organization",
              responsible: "院长",
              location: "惠安县东桥镇医院路5号",
              children: [
                {
                  id: "HA-HOSP2-MB",
                  name: "门诊部",
                  code: "HA-HOSP2-MB-001",
                  type: "building",
                  responsible: "门诊部主任",
                  location: "惠安县东桥镇医院路5号"
                }
              ]
            },
            {
              id: "HA-PS",
              name: "惠安县实验小学",
              code: "HA-PS-011",
              type: "organization",
              responsible: "校长",
              location: "惠安县城关镇实验路20号",
              children: [
                {
                  id: "HA-PS-TB",
                  name: "教学楼",
                  code: "HA-PS-TB-001",
                  type: "building",
                  responsible: "教导主任",
                  location: "惠安县城关镇实验路20号"
                },
                {
                  id: "HA-PS-CB",
                  name: "食堂",
                  code: "HA-PS-CB-002",
                  type: "building",
                  responsible: "食堂主任",
                  location: "惠安县城关镇实验路20号"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// Helper function to get the appropriate icon based on organization type
export const getTypeIcon = (type: OrganizationNode['type']) => {
  switch (type) {
    case 'building':
      return <Building2 className="h-4 w-4 text-carbon-green-500" />;
    case 'organization':
      return <Users className="h-4 w-4 text-blue-500" />;
    default:
      return <MapPin className="h-4 w-4 text-amber-500" />;
  }
};

interface OrganizationTreeNodeProps {
  node: OrganizationNode;
  level?: number;
  onSelectNode: (node: OrganizationNode) => void;
  selectedNodeId: string | null;
}

export const OrganizationTreeNode = ({ 
  node, 
  level = 0,
  onSelectNode,
  selectedNodeId
}: OrganizationTreeNodeProps) => {
  const [expanded, setExpanded] = useState(level < 1);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div 
        className={cn(
          "flex items-center py-2 px-3 rounded-md cursor-pointer group",
          selectedNodeId === node.id ? "bg-carbon-green-100 dark:bg-carbon-green-900/30" : "hover:bg-carbon-gray-100 dark:hover:bg-carbon-gray-800/30"
        )}
        onClick={() => onSelectNode(node)}
      >
        <div 
          className="mr-1.5 cursor-pointer" 
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
        >
          {hasChildren && (
            expanded ? 
              <ChevronDown className="h-3.5 w-3.5 text-carbon-gray-500" /> : 
              <ChevronRight className="h-3.5 w-3.5 text-carbon-gray-500" />
          )}
        </div>
        <div className="mr-2">{getTypeIcon(node.type)}</div>
        <div className="flex-1 truncate text-sm">
          {node.name}
        </div>
      </div>
      {expanded && hasChildren && (
        <div className="pl-6 border-l border-dashed border-carbon-gray-200 dark:border-carbon-gray-800 ml-4">
          {node.children?.map((child) => (
            <OrganizationTreeNode 
              key={child.id} 
              node={child} 
              level={level + 1}
              onSelectNode={onSelectNode}
              selectedNodeId={selectedNodeId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface OrganizationTreeProps {
  onSelectNode?: (node: OrganizationNode) => void;
  selectedNodeId?: string | null;
}

export const OrganizationTree = ({ 
  onSelectNode = () => {}, 
  selectedNodeId = null 
}: OrganizationTreeProps) => {
  return (
    <div className="h-full overflow-y-auto">
      <OrganizationTreeNode 
        node={organizationData} 
        onSelectNode={onSelectNode} 
        selectedNodeId={selectedNodeId}
      />
    </div>
  );
};

export default OrganizationTree;

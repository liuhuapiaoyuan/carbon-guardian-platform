
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

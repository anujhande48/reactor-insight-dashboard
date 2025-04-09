
import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { ArrowDown, ArrowUp } from 'lucide-react';
import type { Batch } from '@/hooks/useReactorData';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BatchTableProps {
  batches: Batch[];
}

type SortField = 'name' | 'status' | 'startTime' | 'progress' | 'reactorId' | 'batchSize';
type SortDirection = 'asc' | 'desc';

const BatchTable: React.FC<BatchTableProps> = ({ batches }) => {
  const [sortField, setSortField] = useState<SortField>('startTime');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const isMobile = useIsMobile();

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedBatches = useMemo(() => {
    return [...batches].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'startTime':
          comparison = a.startTime.getTime() - b.startTime.getTime();
          break;
        case 'progress':
          comparison = a.progress - b.progress;
          break;
        case 'reactorId':
          comparison = a.reactorId.localeCompare(b.reactorId);
          break;
        case 'batchSize':
          comparison = (a.batchSize || 0) - (b.batchSize || 0);
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [batches, sortField, sortDirection]);

  const getStatusBadgeClass = (status: Batch['status']) => {
    switch (status) {
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'delayed':
        return 'bg-amber-100 text-amber-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function for sorting indicators
  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' 
      ? <ArrowUp className="ml-1 h-4 w-4 inline" /> 
      : <ArrowDown className="ml-1 h-4 w-4 inline" />;
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('name')}
            >
              BatchNo
              <SortIndicator field="name" />
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('reactorId')}
            >
              MainUnit
              <SortIndicator field="reactorId" />
            </TableHead>
            {!isMobile && (
              <TableHead>
                Product
              </TableHead>
            )}
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('batchSize')}
            >
              BatchSize
              <SortIndicator field="batchSize" />
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('status')}
            >
              BatchStatus
              <SortIndicator field="status" />
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('startTime')}
            >
              BatchDate
              <SortIndicator field="startTime" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedBatches.map((batch) => (
            <TableRow key={batch.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">
                {batch.name}
              </TableCell>
              <TableCell>
                {batch.reactorId}
              </TableCell>
              {!isMobile && (
                <TableCell>
                  {batch.product || "Standard Product"}
                </TableCell>
              )}
              <TableCell>
                {batch.batchSize || Math.floor(Math.random() * 1000) + 500}kg
              </TableCell>
              <TableCell>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(batch.status)}`}>
                  {batch.status}
                </span>
              </TableCell>
              <TableCell>
                {format(batch.startTime, 'MMM d, yyyy')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BatchTable;

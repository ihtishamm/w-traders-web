'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import type { ProductReturn } from '@/types/product-return';
import { IconCheck, IconDotsVertical } from '@tabler/icons-react';

interface CellActionProps {
  data: ProductReturn;
  onCompleteRepair: (productReturn: ProductReturn) => void;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
  onCompleteRepair
}) => {
  const canCompleteRepair =
    data.return_type === 'repair' && !data.repaired_return_date;

  if (!canCompleteRepair) {
    return null;
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <IconDotsVertical className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onCompleteRepair(data)}>
          <IconCheck className='mr-2 h-4 w-4' /> Mark Repair Completed
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

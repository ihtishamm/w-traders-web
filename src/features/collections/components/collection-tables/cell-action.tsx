'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import type { Collection } from '@/types/collection';
import {
  IconArrowBackUp,
  IconCoins,
  IconDotsVertical,
  IconEye
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface CellActionProps {
  data: Collection;
  onAllocateSurplus: (collection: Collection) => void;
  onReverse: (collection: Collection) => void;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
  onAllocateSurplus,
  onReverse
}) => {
  const router = useRouter();

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
        <DropdownMenuItem
          onClick={() => router.push(`/dashboard/collections/${data.id}`)}
        >
          <IconEye className='mr-2 h-4 w-4' /> View
        </DropdownMenuItem>
        {data.unallocated_surplus_rupees > 0 && (
          <DropdownMenuItem onClick={() => onAllocateSurplus(data)}>
            <IconCoins className='mr-2 h-4 w-4' /> Allocate Surplus
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => onReverse(data)}>
          <IconArrowBackUp className='mr-2 h-4 w-4' /> Reverse
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

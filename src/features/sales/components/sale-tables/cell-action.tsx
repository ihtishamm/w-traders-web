'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import type { Sale } from '@/types/sale';
import { IconBan, IconDotsVertical, IconEye } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface CellActionProps {
  data: Sale;
  onCancel: (sale: Sale) => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, onCancel }) => {
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
          onClick={() => router.push(`/dashboard/sales/${data.id}`)}
        >
          <IconEye className='mr-2 h-4 w-4' /> View
        </DropdownMenuItem>
        {data.status === 'active' && (
          <DropdownMenuItem onClick={() => onCancel(data)}>
            <IconBan className='mr-2 h-4 w-4' /> Cancel
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

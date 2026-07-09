'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import type { Customer } from '@/types/customer';
import { IconDotsVertical, IconEye, IconPencil } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface CellActionProps {
  data: Customer;
  onEdit: (customer: Customer) => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, onEdit }) => {
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
          onClick={() => router.push(`/dashboard/customers/${data.id}`)}
        >
          <IconEye className='mr-2 h-4 w-4' /> View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(data)}>
          <IconPencil className='mr-2 h-4 w-4' /> Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

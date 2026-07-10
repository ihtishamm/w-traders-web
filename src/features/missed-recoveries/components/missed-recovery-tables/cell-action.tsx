'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import type { MissedRecovery } from '@/types/missed-recovery';
import { IconCalendarEvent, IconDotsVertical } from '@tabler/icons-react';

interface CellActionProps {
  data: MissedRecovery;
  onUpdatePromisedDate: (missedRecovery: MissedRecovery) => void;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
  onUpdatePromisedDate
}) => {
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
        <DropdownMenuItem onClick={() => onUpdatePromisedDate(data)}>
          <IconCalendarEvent className='mr-2 h-4 w-4' /> Update Promised Date
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

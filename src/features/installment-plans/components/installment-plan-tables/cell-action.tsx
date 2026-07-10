'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  InstallmentType,
  type InstallmentPlan
} from '@/types/installment-plan';
import {
  IconCalendar,
  IconDotsVertical,
  IconExchange
} from '@tabler/icons-react';

interface CellActionProps {
  data: InstallmentPlan;
  onReassign: (plan: InstallmentPlan) => void;
  onChangeDay: (plan: InstallmentPlan) => void;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
  onReassign,
  onChangeDay
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
        <DropdownMenuItem onClick={() => onReassign(data)}>
          <IconExchange className='mr-2 h-4 w-4' /> Reassign Recovery Man
        </DropdownMenuItem>
        {data.installment_type === InstallmentType.WEEKLY && (
          <DropdownMenuItem onClick={() => onChangeDay(data)}>
            <IconCalendar className='mr-2 h-4 w-4' /> Change Recovery Day
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

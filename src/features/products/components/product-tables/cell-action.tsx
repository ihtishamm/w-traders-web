'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useDeactivateProduct } from '@/features/products/api/use-deactivate-product';
import type { Product } from '@/types/product';
import { IconBan, IconDotsVertical, IconPencil } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CellActionProps {
  data: Product;
  onEdit: (product: Product) => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, onEdit }) => {
  const [open, setOpen] = useState(false);
  const deactivateMutation = useDeactivateProduct();

  const onConfirm = () => {
    deactivateMutation.mutate(data.id, {
      onSuccess: () => {
        toast.success('Product deactivated.');
        setOpen(false);
      }
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={deactivateMutation.isPending}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <IconDotsVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onEdit(data)}>
            <IconPencil className='mr-2 h-4 w-4' /> Edit
          </DropdownMenuItem>
          {data.status === 'active' && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <IconBan className='mr-2 h-4 w-4' /> Deactivate
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { useCreateProduct } from '@/features/products/api/use-create-product';
import { useProductCategories } from '@/features/products/api/use-product-categories';
import { useUpdateProduct } from '@/features/products/api/use-update-product';
import { emptyToUndefined } from '@/lib/utils';
import type { Product } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  code: z.string().optional(),
  category: z.string().min(1, { message: 'Category is required' }),
  purchase_price_rupees: z.coerce.number().int().positive({
    message: 'Purchase price must be a positive number'
  }),
  selling_price_rupees: z.coerce.number().int().positive({
    message: 'Selling price must be a positive number'
  }),
  default_weekly_installment_rupees: z.coerce.number().int().positive({
    message: 'Weekly installment must be a positive number'
  })
});

type FormValue = z.infer<typeof formSchema>;

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
}

export function ProductFormDialog({
  open,
  onOpenChange,
  product
}: ProductFormDialogProps) {
  const isEdit = Boolean(product);
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const { data: categories } = useProductCategories();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      code: '',
      category: '',
      purchase_price_rupees: 0,
      selling_price_rupees: 0,
      default_weekly_installment_rupees: 0
    }
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: product?.name ?? '',
        code: product?.code ?? '',
        category: product?.category ?? '',
        purchase_price_rupees: product?.purchase_price_rupees ?? 0,
        selling_price_rupees: product?.selling_price_rupees ?? 0,
        default_weekly_installment_rupees:
          product?.default_weekly_installment_rupees ?? 0
      });
    }
  }, [open, product, form]);

  const onSubmit = (values: FormValue) => {
    const cleaned = emptyToUndefined(values);

    if (isEdit && product) {
      updateMutation.mutate(
        { id: product.id, payload: cleaned },
        {
          onSuccess: () => {
            toast.success('Product updated.');
            onOpenChange(false);
          }
        }
      );
      return;
    }

    createMutation.mutate(
      { ...cleaned, name: cleaned.name, category: cleaned.category },
      {
        onSuccess: () => {
          toast.success('Product created.');
          onOpenChange(false);
        }
      }
    );
  };

  return (
    <Modal
      title={isEdit ? 'Edit Product' : 'New Product'}
      description={
        isEdit ? 'Update this product’s details.' : 'Add a new product.'
      }
      isOpen={open}
      onClose={() => onOpenChange(false)}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='code'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    list='product-categories'
                    {...field}
                  />
                </FormControl>
                <datalist id='product-categories'>
                  {categories?.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='purchase_price_rupees'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Price (Rs.)</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min={0}
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='selling_price_rupees'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selling Price (Rs.)</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min={0}
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='default_weekly_installment_rupees'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default Weekly Installment (Rs.)</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    min={0}
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end gap-2 pt-2'>
            <Button
              type='button'
              variant='outline'
              disabled={isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Saving...' : isEdit ? 'Save Changes' : 'Create'}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}

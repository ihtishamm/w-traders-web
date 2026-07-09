'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { User } from '@/constants/mock-api';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, Text, XCircle } from 'lucide-react';
import { CellAction } from './cell-action';
import { ROLE_OPTIONS } from './options';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'avatar_url',
    header: 'AVATAR',
    cell: ({ row }) => {
      const name = row.getValue<User['name']>('name');
      return (
        <Avatar className='h-9 w-9'>
          <AvatarImage src={row.getValue('avatar_url')} alt={name} />
          <AvatarFallback className='rounded-lg'>
            {name?.slice(0, 2)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      );
    }
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<User, unknown> }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<User['name']>()}</div>,
    meta: {
      label: 'Name',
      placeholder: 'Search users...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'email',
    header: 'EMAIL'
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: ({ column }: { column: Column<User, unknown> }) => (
      <DataTableColumnHeader column={column} title='Role' />
    ),
    cell: ({ cell }) => (
      <Badge variant='outline' className='capitalize'>
        {cell.getValue<User['role']>()}
      </Badge>
    ),
    enableColumnFilter: true,
    meta: {
      label: 'roles',
      variant: 'multiSelect',
      options: ROLE_OPTIONS
    }
  },
  {
    accessorKey: 'status',
    header: 'STATUS',
    cell: ({ cell }) => {
      const status = cell.getValue<User['status']>();
      const Icon = status === 'active' ? CheckCircle2 : XCircle;

      return (
        <Badge variant='outline' className='capitalize'>
          <Icon />
          {status}
        </Badge>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];

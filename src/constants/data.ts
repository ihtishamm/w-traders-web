import { NavItem } from '@/types';

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Reports',
    url: '/dashboard/reports',
    icon: 'check',
    shortcut: ['r', 'p'],
    isActive: false,
    items: []
  },
  {
    title: 'Customers',
    url: '/dashboard/customers',
    icon: 'userPen',
    shortcut: ['c', 'c'],
    isActive: false,
    items: []
  },
  {
    title: 'Daily Recovery List',
    url: '/dashboard/customers/daily-list',
    icon: 'post',
    shortcut: ['d', 'l'],
    isActive: false,
    items: []
  },
  {
    title: 'Salespersons',
    url: '/dashboard/salespersons',
    icon: 'employee',
    shortcut: ['s', 'p'],
    isActive: false,
    items: []
  },
  {
    title: 'Recovery Men',
    url: '/dashboard/recovery-men',
    icon: 'user',
    shortcut: ['r', 'm'],
    isActive: false,
    items: []
  },
  {
    title: 'Products',
    url: '/dashboard/products',
    icon: 'product',
    shortcut: ['p', 'r'],
    isActive: false,
    items: []
  },
  {
    title: 'Sales',
    url: '/dashboard/sales',
    icon: 'billing',
    shortcut: ['s', 'l'],
    isActive: false,
    items: []
  },
  {
    title: 'Installment Plans',
    url: '/dashboard/installment-plans',
    icon: 'media',
    shortcut: ['i', 'p'],
    isActive: false,
    items: []
  },
  {
    title: 'Collections',
    url: '/dashboard/collections',
    icon: 'page',
    shortcut: ['c', 'o'],
    isActive: false,
    items: []
  },
  {
    title: 'Missed Recoveries',
    url: '/dashboard/missed-recoveries',
    icon: 'warning',
    shortcut: ['m', 'r'],
    isActive: false,
    items: []
  },
  {
    title: 'Reconciliation',
    url: '/dashboard/reconciliation',
    icon: 'settings',
    shortcut: ['r', 'c'],
    isActive: false,
    items: []
  },
  {
    title: 'Returns',
    url: '/dashboard/returns',
    icon: 'trash',
    shortcut: ['r', 't'],
    isActive: false,
    items: []
  },
  {
    title: 'Account Closing',
    url: '/dashboard/account-closing',
    icon: 'close',
    shortcut: ['a', 'x'],
    isActive: false,
    items: []
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'Login',
        shortcut: ['l', 'l'],
        url: '/',
        icon: 'login'
      }
    ]
  }
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];

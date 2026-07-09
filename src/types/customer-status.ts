// Mirrors w-traders-backend src/constants/customer-status.ts
export const CustomerStatus = {
  ACTIVE: 'active',
  CLOSED: 'closed'
} as const;

export type CustomerStatus =
  (typeof CustomerStatus)[keyof typeof CustomerStatus];

export const CUSTOMER_STATUS_OPTIONS = [
  { value: CustomerStatus.ACTIVE, label: 'Active' },
  { value: CustomerStatus.CLOSED, label: 'Closed' }
];

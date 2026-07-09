// Mirrors w-traders-backend src/constants/active-status.ts
export const ActiveStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
} as const;

export type ActiveStatus = (typeof ActiveStatus)[keyof typeof ActiveStatus];

export const ACTIVE_STATUS_OPTIONS = [
  { value: ActiveStatus.ACTIVE, label: 'Active' },
  { value: ActiveStatus.INACTIVE, label: 'Inactive' }
];

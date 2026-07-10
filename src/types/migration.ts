// Mirrors w-traders-backend src/modules/migration/dtos/*.ts
export interface MigrationError {
  sheet: 'Customers' | 'InstallmentPlans';
  row: number;
  field: string;
  value: string | null;
  message: string;
}

export interface MigrationValidationResult {
  valid: boolean;
  customer_rows_found: number;
  plan_rows_found: number;
  errors: MigrationError[];
}

export interface MigrationImportResult {
  customers_created: number;
  guarantors_created: number;
  installment_plans_created: number;
  skipped_rows: unknown[];
  import_sale_id: string;
}

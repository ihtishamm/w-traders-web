// Mirrors w-traders-backend src/modules/dashboard/dtos/dashboard-stats.dto.ts
export interface DashboardStats {
  customers: {
    total: number;
    active: number;
    closed: number;
  };
  products: {
    total: number;
    available_units: number;
  };
  installment_plans: {
    total_sold_units: number;
    returned_unused: number;
    returned_used: number;
    under_repair: number;
    repossessed: number;
  };
  recovery_men: {
    total_active: number;
  };
  financials: {
    total_sales_rupees: number;
    total_outstanding_rupees: number;
    total_recovered_rupees: number;
  };
}

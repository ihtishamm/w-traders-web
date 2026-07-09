// Used by the dashboard overview widgets (src/app/dashboard/overview/@*/page.tsx)
// which still render placeholder data pending real integration.
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

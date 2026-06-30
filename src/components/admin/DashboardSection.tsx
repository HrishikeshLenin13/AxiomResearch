import { AdminPlaceholderSection, AdminSectionPanel } from "./AdminSectionPanel";

export function DashboardSection() {
  return (
    <AdminSectionPanel
      id="dashboard"
      title="Dashboard"
      description="Overview metrics and activity summary."
    >
      <AdminPlaceholderSection message="Dashboard overview will appear here." />
    </AdminSectionPanel>
  );
}

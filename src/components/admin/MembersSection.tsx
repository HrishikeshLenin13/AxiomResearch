import { AdminPlaceholderSection, AdminSectionPanel } from "./AdminSectionPanel";

export function MembersSection() {
  return (
    <AdminSectionPanel
      id="members"
      title="Members"
      description="Member records and assignments."
    >
      <AdminPlaceholderSection message="Member management UI will appear here." />
    </AdminSectionPanel>
  );
}

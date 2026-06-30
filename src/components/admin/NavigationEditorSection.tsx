import { AdminPlaceholderSection, AdminSectionPanel } from "./AdminSectionPanel";

export function NavigationEditorSection() {
  return (
    <AdminSectionPanel
      id="navigation-editor"
      title="Navigation Editor"
      description="Manage navbar links and page visibility."
    >
      <AdminPlaceholderSection message="Navigation editor tools will appear here." />
    </AdminSectionPanel>
  );
}

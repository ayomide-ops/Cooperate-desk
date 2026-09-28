export const sections: Record<string, { title: string; columns: string[]; rows: string[][] }> = {
  customers: { title: "Customers", columns: ["Name", "Plan", "Status"],
    rows: [["Acme Ltd", "Business", "Active"], ["Northwind", "Starter", "Active"], ["Globex", "Business", "Paused"]] },
  projects: { title: "Projects", columns: ["Project", "Owner", "Status"],
    rows: [["Website redesign", "Ada", "In progress"], ["Mobile app", "Tunde", "Planning"], ["Data migration", "Ngozi", "Done"]] },
  teams: { title: "Teams", columns: ["Team", "Members", "Lead"],
    rows: [["Design", "5", "Ada"], ["Engineering", "9", "Tunde"], ["Support", "4", "Ngozi"]] },
  invoices: { title: "Invoices", columns: ["Invoice", "Customer", "Amount"],
    rows: [["INV-1042", "Acme Ltd", "$4,200.00"], ["INV-1043", "Globex", "$1,150.00"], ["INV-1044", "Northwind", "$860.00"]] },
  workflows: { title: "Workflows", columns: ["Workflow", "Trigger", "Status"],
    rows: [["Send invoice reminder", "Due in 3 days", "On"], ["Welcome email", "New customer", "On"], ["Archive project", "Marked done", "Off"]] },
  reports: { title: "Reports", columns: ["Report", "Period", "Updated"],
    rows: [["Revenue summary", "Monthly", "Today"], ["Project health", "Weekly", "Yesterday"], ["Customer growth", "Quarterly", "3 days ago"]] },
};

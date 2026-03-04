import type { ReactNode } from "react";

interface DataTableProps {
  headers: string[];
  children: ReactNode;
}

export function DataTable({ headers, children }: DataTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface">
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-background">
          {children}
        </tbody>
      </table>
    </div>
  );
}

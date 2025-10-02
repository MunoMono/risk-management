import React from "react";
import riskData from "../assets/risk_register.json"; // ensure JSON lives in src/assets
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@carbon/react";

// Full header set matching JSON keys
const headers = [
  { key: "Risk ID", header: "Risk ID" },
  { key: "Category", header: "Category" },
  { key: "Description", header: "Description" },
  { key: "Likelihood", header: "Likelihood" },
  { key: "Impact", header: "Impact" },
  { key: "Heat Map Cell", header: "Heat Map Cell" },
  { key: "Response Strategy", header: "Response Strategy" },
  { key: "Recommended Action", header: "Recommended Action" },
  { key: "Owner", header: "Owner" },
  { key: "Early Warning Triggers", header: "Early Warning Triggers" },
  { key: "Monitoring Frequency", header: "Monitoring Frequency" },
  { key: "Stakeholders", header: "Stakeholders" },
];

export default function Risks() {
  // Map JSON into rows with unique IDs
  const rows = riskData.map((risk, i) => ({
    id: `${risk["Risk ID"]}-${i}`,
    ...risk,
  }));

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Risk Register</h2>
      <DataTable rows={rows} headers={headers}>
        {({ rows, headers, getHeaderProps }) => (
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader key={header.key} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DataTable>
    </div>
  );
}

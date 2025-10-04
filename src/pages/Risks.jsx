// src/pages/Risks.jsx
import React, { useState } from "react";
import riskData from "../assets/risk_register.json";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  MultiSelect,
  Button,
} from "@carbon/react";
import { DocumentPdf, DocumentExport } from "@carbon/icons-react"; // ✅ fixed import
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ---------- Table headers ----------
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

// ---------- Utility: filters ----------
const getUniqueValues = (field) =>
  Array.from(new Set(riskData.map((r) => r[field])));

// ---------- Utility: highlight ----------
const highlightText = (text, keyword) => {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  return text
    .toString()
    .split(regex)
    .map((part, i) =>
      regex.test(part) ? (
        <mark
          key={i}
          style={{
            backgroundColor: "#fff176",
            padding: "0 2px",
            borderRadius: "2px",
          }}
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
};

// ---------- Main ----------
export default function Risks() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    Category: [],
    Likelihood: [],
    Impact: [],
    "Response Strategy": [],
  });

  // Apply search + filters
  const filteredRows = riskData
    .filter((risk) =>
      search
        ? Object.values(risk)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
        : true
    )
    .filter((risk) =>
      Object.entries(filters).every(([field, values]) =>
        values.length === 0 ? true : values.includes(risk[field])
      )
    )
    .map((risk, i) => ({ id: `${risk["Risk ID"]}-${i}`, ...risk }));

  // ---------- Export to PDF ----------
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Risk Register", 14, 16);
    autoTable(doc, {
      head: [headers.map((h) => h.header)],
      body: filteredRows.map((row) => headers.map((h) => row[h.key] || "")),
      startY: 20,
      styles: { fontSize: 8 },
    });
    doc.save("risk_register.pdf");
  };

  // ---------- Export to CSV ----------
  const exportToCSV = () => {
    const csvHeaders = headers.map((h) => `"${h.header}"`).join(",");
    const csvRows = filteredRows.map((row) =>
      headers
        .map((h) => `"${(row[h.key] || "").toString().replace(/"/g, '""')}"`)
        .join(",")
    );
    const csvContent = [csvHeaders, ...csvRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "risk_register.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: "2rem", marginTop: "2rem" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>Risk Register</h2>

      <DataTable rows={filteredRows} headers={headers}>
        {({ rows, headers, getHeaderProps }) => (
          <>
            <TableToolbar>
              <TableToolbarContent>
                <TableToolbarSearch
                  persistent
                  placeholder="Search risks..."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </TableToolbarContent>
            </TableToolbar>

            {/* Filter controls */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                margin: "1rem 0 2rem",
              }}
            >
              {["Category", "Likelihood", "Impact", "Response Strategy"].map(
                (field) => (
                  <MultiSelect
                    key={field}
                    id={`multiselect-${field}`}
                    titleText={field}
                    items={getUniqueValues(field)}
                    label={`Filter by ${field}`}
                    selectionFeedback="top"
                    onChange={({ selectedItems }) =>
                      setFilters((prev) => ({
                        ...prev,
                        [field]: selectedItems,
                      }))
                    }
                    style={{ minWidth: "200px" }}
                  />
                )
              )}
            </div>

            {/* Main table */}
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader
                      key={header.key}
                      {...getHeaderProps({ header })}
                    >
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>
                        {highlightText(cell.value, search)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Download buttons */}
            <div
              style={{
                marginTop: "2rem",
                textAlign: "right",
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
              }}
            >
              <Button
                kind="tertiary"
                renderIcon={DocumentExport}
                onClick={exportToCSV}
              >
                Download CSV
              </Button>
              <Button
                kind="tertiary"
                renderIcon={DocumentPdf}
                onClick={exportToPDF}
              >
                Download PDF
              </Button>
            </div>
          </>
        )}
      </DataTable>
    </div>
  );
}

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileSpreadsheet, CheckCircle2, X, AlertCircle, Download } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface ParsedRow {
  name: string;
  phone: string;
  email?: string;
  business?: string;
  last_purchase_date?: string;
  total_spend?: string;
}

const REQUIRED_COLS = ["name", "phone"];
const ALL_COLS = ["name", "phone", "email", "business", "last_purchase_date", "total_spend"];

function parseCSV(text: string): ParsedRow[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/\s+/g, "_"));
  return lines.slice(1).filter(l => l.trim()).map(line => {
    const vals = line.split(",").map(v => v.trim().replace(/^"|"$/g, ""));
    const row: Record<string, string> = {};
    headers.forEach((h, i) => { row[h] = vals[i] ?? ""; });
    return row as ParsedRow;
  });
}

const SAMPLE_CSV = `name,phone,email,business,last_purchase_date,total_spend
Adaeze Okonkwo,08012345678,adaeze@email.com,Tech Solutions,2025-04-01,250000
Emeka Chukwu,08023456789,,Chukwu Ventures,2025-03-15,180000`;

export const ImportData = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [imported, setImported] = useState(false);

  const processFile = (f: File) => {
    setError(null);
    setImported(false);
    if (!f.name.endsWith(".csv")) {
      setError("Only .csv files are supported right now.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseCSV(text);
      const missingCol = REQUIRED_COLS.find(
        col => !text.split(/\r?\n/)[0].toLowerCase().includes(col)
      );
      if (missingCol) {
        setError(`Missing required column: "${missingCol}". Check your CSV headers.`);
        setRows([]);
        return;
      }
      if (parsed.length === 0) {
        setError("No data rows found in the file.");
        return;
      }
      setFile(f);
      setRows(parsed);
    };
    reader.readAsText(f);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) processFile(f);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) processFile(f);
  };

  const handleImport = () => {
    toast.success(`${rows.length} customers imported successfully!`);
    setImported(true);
  };

  const handleReset = () => {
    setFile(null);
    setRows([]);
    setError(null);
    setImported(false);
  };

  const downloadSample = () => {
    const blob = new Blob([SAMPLE_CSV], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "doxaiq-sample.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl space-y-5">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black">Import Data</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Upload a CSV file to bulk-import customers and purchase history.
        </p>
      </motion.div>

      {/* Drop zone — hidden when preview is showing */}
      <AnimatePresence mode="wait">
        {!file && (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ delay: 0.1 }}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "rounded-xl border-2 border-dashed bg-card p-12 text-center transition-colors cursor-pointer select-none",
              dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
            )}
          >
            <motion.div animate={{ scale: dragging ? 1.1 : 1 }} transition={{ duration: 0.15 }}>
              <Upload size={32} className={cn("mx-auto mb-3", dragging ? "text-primary" : "text-muted-foreground")} />
            </motion.div>
            <p className="font-semibold text-sm mb-1">
              {dragging ? "Drop it here!" : "Drop your CSV file here"}
            </p>
            <p className="text-xs text-muted-foreground mb-4">or click anywhere in this box to browse</p>
            <button
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Browse Files
            </button>
          </motion.div>
        )}

        {/* Preview table */}
        {file && !imported && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet size={16} className="text-primary" />
                <span className="text-sm font-semibold">{file.name}</span>
                <span className="text-xs text-muted-foreground">— {rows.length} rows</span>
              </div>
              <button onClick={handleReset} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    {ALL_COLS.map(col => (
                      <th key={col} className="px-4 py-2.5 text-left font-semibold text-muted-foreground capitalize">
                        {col.replace(/_/g, " ")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 8).map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      {ALL_COLS.map(col => (
                        <td key={col} className="px-4 py-2.5 text-foreground/80">
                          {(row as Record<string, string>)[col] || <span className="text-muted-foreground/40">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {rows.length > 8 && (
                <p className="text-xs text-center text-muted-foreground py-2.5">
                  +{rows.length - 8} more rows not shown
                </p>
              )}
            </div>
            <div className="flex items-center justify-end gap-3 px-5 py-3.5 border-t border-border">
              <button onClick={handleReset} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cancel
              </button>
              <button
                onClick={handleImport}
                className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Import {rows.length} Customers
              </button>
            </div>
          </motion.div>
        )}

        {/* Success state */}
        {imported && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-10 text-center"
          >
            <CheckCircle2 size={36} className="text-emerald-500 mx-auto mb-3" />
            <p className="font-semibold text-sm mb-1">{rows.length} customers imported</p>
            <p className="text-xs text-muted-foreground mb-4">They will appear in your customer list shortly.</p>
            <button onClick={handleReset} className="text-xs text-primary font-semibold hover:underline">
              Import another file
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3.5">
            <AlertCircle size={16} className="text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Format guide + sample download */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <FileSpreadsheet size={18} className="text-primary" />
            <h2 className="text-sm font-semibold">CSV Format</h2>
          </div>
          <button onClick={downloadSample}
            className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline">
            <Download size={13} />
            Download sample
          </button>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { col: "name", note: "required" },
            { col: "phone", note: "required" },
            { col: "email", note: "optional" },
            { col: "business", note: "optional" },
            { col: "last_purchase_date", note: "YYYY-MM-DD" },
            { col: "total_spend", note: "number, no commas" },
          ].map(({ col, note }) => (
            <div key={col} className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 size={12} className={note === "required" ? "text-primary shrink-0" : "text-muted-foreground/40 shrink-0"} />
              <span className="font-mono">{col}</span>
              <span className="text-muted-foreground/50">— {note}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <input ref={inputRef} type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
    </div>
  );
};

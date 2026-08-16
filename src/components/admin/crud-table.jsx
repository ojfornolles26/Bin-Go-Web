"use client";

import { useState } from "react";
import { ArrowUpDown, Edit3, Trash2, Eye, CheckCircle2, Clock, Loader } from "lucide-react";

const SortHeader = ({ field, label, onSort }) => (
  <th
    className="px-6 py-3.5 cursor-pointer hover:bg-slate-100 transition-colors select-none"
    onClick={() => onSort(field)}
  >
    <div className="flex items-center gap-1.5 font-bold text-slate-700">
      <span>{label}</span>
      <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
    </div>
  </th>
);

export default function CrudTable({ records, onEdit, onDelete }) {
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [viewRecord, setViewRecord] = useState(null);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedRecords = [...records].sort((a, b) => {
    const valA = a[sortField] || "";
    const valB = b[sortField] || "";
    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <>
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <SortHeader field="id" label="Record ID" onSort={handleSort} />
                <SortHeader field="location" label="Location & Barangay" onSort={handleSort} />
                <SortHeader field="reporter" label="Reporter" onSort={handleSort} />
                <SortHeader field="urgency" label="Urgency" onSort={handleSort} />
                <SortHeader field="status" label="Status" onSort={handleSort} />
                <th className="px-6 py-3.5 text-right font-bold text-slate-700">
                  CRUD Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedRecords.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-400 italic"
                  >
                    No records found. Click &quot;+ Create New Record&quot; to add your
                    first entry!
                  </td>
                </tr>
              ) : (
                sortedRecords.map((record, index) => (
                  <tr
                    key={record.id}
                    className={`transition-colors ${index % 2 === 0 ? "bg-white" : "bg-slate-50/60"} hover:bg-slate-100/50`}
                  >
                    <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">
                      {record.id}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">
                        {record.location}
                      </div>
                      <div className="text-xs text-slate-500 font-normal">
                        {record.barangay}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-700">
                      {record.reporter}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold ${
                          record.urgency === "Critical"
                            ? "bg-red-600 text-white"
                            : record.urgency === "High"
                              ? "bg-orange-500 text-white"
                              : record.urgency === "Medium"
                                ? "bg-amber-500 text-white"
                                : "bg-emerald-500 text-white"
                        }`}
                      >
                        {record.urgency}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {record.status === "Resolved" ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        ) : record.status === "Pending" ? (
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                        ) : (
                          <Loader className="w-3.5 h-3.5 text-blue-500" />
                        )}
                        <span className="text-sm font-medium text-slate-700">
                          {record.status}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* READ Detail Action */}
                        <button
                          onClick={() => setViewRecord(record)}
                          title="View Record Details (Read)"
                          className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        >
                          <Eye className="w-4 h-4 stroke-[2]" />
                        </button>

                        {/* UPDATE Action */}
                        <button
                          onClick={() => onEdit(record)}
                          title="Edit Record (Update)"
                          className="p-1.5 rounded-xl text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                        >
                          <Edit3 className="w-4 h-4 stroke-[2]" />
                        </button>

                        {/* DELETE Action */}
                        <button
                          onClick={() => onDelete(record)}
                          title="Delete Record (Delete)"
                          className="p-1.5 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 stroke-[2]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record View Modal (READ Operation) */}
      {viewRecord && (
        <div
          className="fixed inset-0 bg-slate-950/30 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          onClick={() => setViewRecord(null)}
        >
          <div
            className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-600 uppercase">
                  Record Detail
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {viewRecord.id}
                </h3>
              </div>
              <button
                onClick={() => setViewRecord(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  Location
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {viewRecord.location}, {viewRecord.barangay}
                </span>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  Reporter
                </span>
                <span className="text-slate-800 font-medium">
                  {viewRecord.reporter}
                </span>
              </div>

              <div className="flex gap-6">
                <div>
                  <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Urgency
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold ${
                      viewRecord.urgency === "Critical"
                        ? "bg-red-600 text-white"
                        : viewRecord.urgency === "High"
                          ? "bg-orange-500 text-white"
                          : viewRecord.urgency === "Medium"
                            ? "bg-amber-500 text-white"
                            : "bg-emerald-500 text-white"
                    }`}
                  >
                    {viewRecord.urgency}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    Status
                  </span>
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    {viewRecord.status === "Resolved" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : viewRecord.status === "Pending" ? (
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                    ) : (
                      <Loader className="w-3.5 h-3.5 text-blue-500" />
                    )}
                    <span>{viewRecord.status}</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  Description
                </span>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {viewRecord.description || "No description provided."}
                </p>
              </div>
            </div>

            <button
              onClick={() => setViewRecord(null)}
              className="mt-2 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs transition-colors"
            >
              Close Record View
            </button>
          </div>
        </div>
      )}
    </>
  );
}

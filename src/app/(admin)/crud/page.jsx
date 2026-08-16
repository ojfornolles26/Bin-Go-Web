"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Loader } from "lucide-react";
import CrudDeleteModal from "@/components/admin/crud-delete-modal";

// 4 Initial test records (Meets the "at least 3 records" rule)
const sampleRecords = [
  {
    id: "TKT-101",
    location: "Osmeña Blvd",
    barangay: "Capitol Site",
    reporter: "Juan Cruz",
    urgency: "High",
    status: "Pending",
    description: "Overflowing garbage bin near intersection.",
  },
  {
    id: "TKT-102",
    location: "IT Park",
    barangay: "Apas",
    reporter: "Maria Santos",
    urgency: "Low",
    status: "Resolved",
    description: "Litter scattered near park benches.",
  },
  {
    id: "TKT-103",
    location: "Colon St",
    barangay: "Parian",
    reporter: "Pedro Reyes",
    urgency: "Critical",
    status: "In Progress",
    description: "Illegal dumping site blocking sidewalk.",
  },
];

export default function SimpleCrudActivityPage() {
  const [records, setRecords] = useState(sampleRecords);
  const [supabaseUrl] = useState(
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
      "https://yzluyeoqifikpaogpdob.supabase.co",
  );
  const [supabaseKey] = useState(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "sb_publishable_WQpxXZ69Dpp0d1S0R8uFYw_t_lxdyxR",
  );

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [form, setForm] = useState({
    id: "",
    location: "",
    barangay: "",
    reporter: "",
    urgency: "Medium",
    status: "Pending",
    description: "",
  });

  // Supabase Client
  const getClient = () => {
    if (!supabaseUrl || !supabaseKey) return null;
    try {
      return createClient(supabaseUrl, supabaseKey);
    } catch {
      return null;
    }
  };

  // Fetch records from Supabase
  const fetchSupabaseRecords = async () => {
    const supabase = getClient();
    if (!supabase) return;
    try {
      const { data, error } = await supabase.from("crud_tickets").select("*");
      if (!error && data && data.length > 0) {
        setRecords(data);
      }
    } catch {
      // Ignore error for now
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSupabaseRecords();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabaseUrl, supabaseKey]);

  // CREATE / UPDATE
  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.location || !form.barangay || !form.reporter) {
      alert("Please fill in location, barangay, and reporter!");
      return;
    }

    const newRecord = {
      ...form,
      // eslint-disable-next-line react-hooks/purity
      id: form.id || `TKT-${Math.floor(100 + Math.random() * 900)}`,
    };

    const supabase = getClient();
    if (supabase) {
      if (editingId) {
        await supabase
          .from("crud_tickets")
          .update(newRecord)
          .eq("id", editingId);
      } else {
        await supabase.from("crud_tickets").insert([newRecord]);
      }
      fetchSupabaseRecords();
    }

    // Update local state
    if (editingId) {
      setRecords((prev) =>
        prev.map((r) => (r.id === editingId ? newRecord : r)),
      );
    } else {
      setRecords((prev) => [newRecord, ...prev]);
    }

    resetForm();
  };

  // EDIT
  const handleEdit = (record) => {
    setEditingId(record.id);
    setForm(record);
  };

  // DELETE
  const handleDeleteConfirm = async () => {
    if (!recordToDelete) return;
    const id = recordToDelete.id;

    const supabase = getClient();
    if (supabase) {
      await supabase.from("crud_tickets").delete().eq("id", id);
    }
    setRecords((prev) => prev.filter((r) => r.id !== id));
    setRecordToDelete(null);
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      id: "",
      location: "",
      barangay: "",
      reporter: "",
      urgency: "Medium",
      status: "Pending",
      description: "",
    });
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 p-4">
      {/* CRUD Form (Create & Update) */}
      <form
        onSubmit={handleSave}
        className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col gap-4"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900">
            {editingId ? `Edit Record (${editingId})` : "Add New Record"}
          </h2>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Location
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Osmeña Blvd"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Barangay
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Capitol Site"
              value={form.barangay}
              onChange={(e) => setForm({ ...form, barangay: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Reporter
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Juan Cruz"
              value={form.reporter}
              onChange={(e) => setForm({ ...form, reporter: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Urgency
            </label>
            <select
              value={form.urgency}
              onChange={(e) => setForm({ ...form, urgency: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Description
            </label>
            <input
              type="text"
              placeholder="Details..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            variant="primary"
            size="md"
            type="submit"
            className="rounded-xl font-bold px-6"
          >
            <span>{editingId ? "Update Record" : "Save Record"}</span>
          </Button>
        </div>
      </form>

      {/* Records Table (Read & Delete) */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Records List ({records.length} items)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Barangay</th>
                <th className="px-6 py-3">Reporter</th>
                <th className="px-6 py-3">Urgency</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((r, index) => (
                <tr
                  key={r.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                    {r.id}
                  </td>
                  <td className="px-6 py-4 font-normal text-slate-700">
                    {r.location}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{r.barangay}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-700">
                    {r.reporter}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold ${
                        r.urgency === "Critical"
                          ? "bg-red-600 text-white"
                          : r.urgency === "High"
                            ? "bg-orange-500 text-white"
                            : r.urgency === "Medium"
                              ? "bg-amber-500 text-white"
                              : "bg-emerald-500 text-white"
                      }`}
                    >
                      {r.urgency}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      {r.status === "Resolved" ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      ) : r.status === "Pending" ? (
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                      ) : (
                        <Loader className="w-3.5 h-3.5 text-blue-500" />
                      )}
                      <span className="text-sm font-medium text-slate-700">
                        {r.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleEdit(r)}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl mr-2 text-xs transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setRecordToDelete(r)}
                      className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CrudDeleteModal
        isOpen={!!recordToDelete}
        onClose={() => setRecordToDelete(null)}
        onConfirm={handleDeleteConfirm}
        record={recordToDelete}
      />
    </div>
  );
}

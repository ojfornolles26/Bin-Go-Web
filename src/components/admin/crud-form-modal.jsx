"use client";

import { useState, useEffect } from "react";
import { X, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CrudFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingRecord,
}) {
  const [formData, setFormData] = useState({
    id: "",
    location: "",
    barangay: "",
    reporter: "",
    urgency: "Medium",
    status: "Pending",
    description: "",
  });

  useEffect(() => {
    if (editingRecord) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(editingRecord);
    } else {
      setFormData({
        id: `TKT-${Math.floor(100 + Math.random() * 900)}`,
        location: "",
        barangay: "",
        reporter: "",
        urgency: "Medium",
        status: "Pending",
        description: "",
      });
    }
  }, [editingRecord, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.location || !formData.barangay || !formData.reporter) {
      alert("Please fill out all required fields.");
      return;
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {editingRecord
                ? "Edit Record (Update)"
                : "Create New Record (Create)"}
            </h3>
            <p className="text-xs text-slate-500">
              {editingRecord
                ? `Modifying ticket ${editingRecord.id}`
                : "Fill in record fields to insert into Supabase"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Record ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.id}
                onChange={(e) =>
                  setFormData({ ...formData, id: e.target.value })
                }
                disabled={!!editingRecord}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 disabled:opacity-75 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Reporter Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Juan Cruz"
                value={formData.reporter}
                onChange={(e) =>
                  setFormData({ ...formData, reporter: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Location Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Osmeña Blvd"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Barangay <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Guadalupe"
                value={formData.barangay}
                onChange={(e) =>
                  setFormData({ ...formData, barangay: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Urgency Level
              </label>
              <select
                value={formData.urgency}
                onChange={(e) =>
                  setFormData({ ...formData, urgency: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-600 bg-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Resolution Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-600 bg-white"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Description / Issue Details
            </label>
            <textarea
              rows={3}
              placeholder="Describe the waste incident..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-600 resize-none"
            />
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="rounded-lg font-bold gap-2 shadow-xs px-5"
            >
              {editingRecord ? (
                <Save className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              <span>{editingRecord ? "Save Changes" : "Create Record"}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

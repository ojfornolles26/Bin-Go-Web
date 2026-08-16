"use client";

import { AlertTriangle } from "lucide-react";

export default function CrudDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  record,
}) {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 rounded-xl shadow-xl max-w-[300px] w-full p-5 flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-rose-500" />
          <h4 className="text-sm font-bold text-slate-900">Delete Record</h4>
        </div>
        
        <p className="text-xs text-slate-600 leading-relaxed font-normal">
          Delete <strong className="text-slate-900">{record.location}</strong> reported by <strong className="text-slate-900">{record.reporter}</strong>? This cannot be undone.
        </p>

        <div className="flex items-center gap-2 pt-3 mt-1">
          <button
            onClick={onClose}
            className="flex-1 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 h-8 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-sm transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

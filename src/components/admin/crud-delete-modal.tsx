'use client';

import { CrudRecord } from '@/lib/supabase';
import { AlertTriangle } from 'lucide-react';

interface CrudDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  record: CrudRecord | null;
}

export default function CrudDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  record,
}: CrudDeleteModalProps) {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl max-w-sm w-full p-5 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="w-9 h-9 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30">
            <AlertTriangle className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100">Delete Record (Delete)</h4>
            <p className="text-xs text-slate-400">ID: {record.id}</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-normal">
          Are you sure you want to delete <strong className="text-white">{record.location}</strong> ({record.barangay}) reported by <strong className="text-white">{record.reporter}</strong>? This action will remove the record.
        </p>

        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 h-9 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 h-9 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-95"
          >
            Delete Record
          </button>
        </div>
      </div>
    </div>
  );
}

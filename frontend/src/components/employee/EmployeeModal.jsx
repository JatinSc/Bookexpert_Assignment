/**
 * =========================
 * EMPLOYEE MODAL COMPONENT
 * =========================
 *
 * Responsibilities:
 * - Render modal overlay
 * - Control visibility via props
 * - Render children inside modal
 *
 * IMPORTANT DESIGN DECISION:
 * - Modal has NO business logic
 * - Parent controls open/close
 */

import { X } from "lucide-react";

const EmployeeModal = ({ isOpen, onClose, children }) => {
  /**
   * If modal is not open,
   * do not render anything
   */
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl p-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full p-2 bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default EmployeeModal;

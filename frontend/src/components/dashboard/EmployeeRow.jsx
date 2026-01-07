import { Pencil, Trash2 } from "lucide-react";

const EmployeeRow = ({ employee, onToggleStatus, onDelete, onEdit }) => {
    /**
     * Destructure employee object
     * ---------------------------
     * Makes JSX cleaner and readable
     */
    const {
        id,
        fullName,
        gender,
        dob,
        state,
        active,
        image,
    } = employee;

    return (
        <tr className="border-t border-white/5 hover:bg-white/5 transition-colors">
            {/* Employee ID */}
            <td className="px-6 py-4 text-sm text-gray-300">
                {id}
            </td>

            {/* Profile Image */}
            <td className="px-6 py-4">
                <div className="relative w-10 h-10">
                    <img
                        src={
                            image ||
                            "https://via.placeholder.com/40"
                        }
                        alt={fullName}
                        className="w-10 h-10 rounded-full object-cover border border-white/10"
                    />
                    <span
                        className={`no-print absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-[#0f172a] ${active ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" : "bg-gray-500"}`}
                        aria-hidden="true"
                        title={active ? "Active" : "Inactive"}
                    />
                </div>
            </td>

            {/* Full Name */}
            <td className="px-6 py-4 text-sm font-medium text-white">
                {fullName}
            </td>

            {/* Gender */}
            <td className="px-6 py-4 text-sm text-gray-300">
                {gender}
            </td>

            {/* Date of Birth */}
            <td className="px-6 py-4 text-sm text-gray-300">
                {dob}
            </td>

            {/* State */}
            <td className="px-6 py-4 text-sm text-gray-300">
                {state}
            </td>

            {/* Active / Inactive */}
            <td className="px-6 py-4 text-sm">
                {/* SCREEN VIEW: Toggle */}
                <div className="screen-only flex items-center gap-2">
                    <button
                        onClick={() => onToggleStatus(employee)}
                        aria-pressed={active}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/50 focus:ring-offset-[#0f172a] ${active
                                ? "bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                                : "bg-gray-700"
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition duration-300 ${active ? "translate-x-6" : "translate-x-1"
                                }`}
                        />
                    </button>
                </div>

                {/* PRINT VIEW: Text */}
                <span className={`print-only font-medium ${active ? "text-green-400" : "text-red-400"}`}>
                    {active ? "Active" : "Inactive"}
                </span>
            </td>



            {/* Actions (future wiring) */}
            <td className="no-print px-6 py-4 text-sm space-x-2">
                <button
                    onClick={() => onEdit(employee)}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                    aria-label="Edit"
                    title="Edit"
                >
                    <Pencil className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onDelete(id)}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/20 hover:border-red-500/50 transition-all"
                    aria-label="Delete"
                    title="Delete"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </td>
        </tr>
    );
};

export default EmployeeRow;

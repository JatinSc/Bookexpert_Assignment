import EmployeeRow from "./EmployeeRow";
import { useMemo, useState } from "react";
import { Hash, Image, User, Users, Calendar, MapPin, Activity, Settings, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * =========================
 * EMPLOYEE TABLE COMPONENT
 * =========================
 *
 * Responsibilities:
 * - Render table layout
 * - Handle empty state
 * - Delegate row rendering
 *
 * IMPORTANT DESIGN DECISION:
 * - This component does NOT fetch data
 * - It receives employees via props
 */

const EmployeeTable = ({
    employees,
    onToggleStatus,
    onDelete,
    onEdit,
}) => {
    const PAGE_SIZE = 5;
    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(employees.length / PAGE_SIZE));
    const clampedPage = Math.min(page, totalPages);
    const start = (clampedPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const visibleEmployees = useMemo(
        () => employees.slice(start, end),
        [employees, start, end]
    );

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Table Container */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    {/* Table Header */}
                    <thead className="bg-black/20 border-b border-white/10 text-xs uppercase text-gray-400 font-semibold tracking-wider">
                        <tr>
                            <th className="px-6 py-4 rounded-tl-lg">
                                <div className="flex items-center gap-2">
                                    <Hash className="w-4 h-4 text-blue-400" />
                                    ID
                                </div>
                            </th>
                            <th className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <Image className="w-4 h-4 text-blue-400" />
                                    Profile
                                </div>
                            </th>
                            <th className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-blue-400" />
                                    Full Name
                                </div>
                            </th>
                            <th className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-blue-400" />
                                    Gender
                                </div>
                            </th>
                            <th className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-400" />
                                    Date of Birth
                                </div>
                            </th>
                            <th className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-blue-400" />
                                    State
                                </div>
                            </th>
                            <th className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-blue-400" />
                                    Status
                                </div>
                            </th>
                            <th className="no-print px-6 py-4 rounded-tr-lg">
                                <div className="flex items-center gap-2">
                                    <Settings className="w-4 h-4 text-blue-400" />
                                    Actions
                                </div>
                            </th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-white/5">
                        {visibleEmployees.length > 0 ? (
                            visibleEmployees.map((employee) => (
                                <EmployeeRow
                                    key={employee.id}
                                    employee={employee}
                                    onToggleStatus={onToggleStatus}
                                    onDelete={onDelete}
                                    onEdit={onEdit}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="px-6 py-12 text-center text-gray-400">
                                    <div className="flex flex-col items-center gap-3">
                                        <User className="w-12 h-12 text-gray-600" />
                                        <p className="text-lg font-medium">No employees found</p>
                                        <p className="text-sm">Try adjusting your search or filters</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="no-print px-6 py-4 border-t border-white/10 flex items-center justify-between bg-black/20">
                    <div className="text-sm text-gray-400">
                        Showing <span className="font-medium text-white">{start + 1}</span> to{" "}
                        <span className="font-medium text-white">
                            {Math.min(start + PAGE_SIZE, employees.length)}
                        </span>{" "}
                        of <span className="font-medium text-white">{employees.length}</span> results
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className={`p-2 rounded-lg transition-all ${
                                page === 1
                                    ? "text-gray-600 cursor-not-allowed"
                                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                            }`}
                            aria-label="Previous Page"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        
                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                                        page === p
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                            : "text-gray-400 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                            className={`p-2 rounded-lg transition-all ${
                                page === totalPages
                                    ? "text-gray-600 cursor-not-allowed"
                                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                            }`}
                            aria-label="Next Page"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeTable;

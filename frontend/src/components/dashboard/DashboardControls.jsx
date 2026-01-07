import { Search, Printer, UserPlus, Users, Activity, ChevronDown } from "lucide-react";

/**
 * =========================
 * DASHBOARD CONTROLS COMPONENT
 * =========================
 *
 * Responsibilities:
 * - Search input (Modern UI)
 * - Filter controls (Top aligned)
 * - Action buttons (Pill shaped)
 */

const DashboardControls = ({
  searchTerm,
  setSearchTerm,
  genderFilter,
  setGenderFilter,
  statusFilter,
  setStatusFilter,
  onAddEmployee,
  onPrint,
}) => {
  return (
    <div className="no-print bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 mb-6 w-full shadow-2xl">
      <div className="flex flex-col xl:flex-row justify-between items-center gap-4">
        
        {/* Left Side: Search & Filters */}
        <div className="flex-1 w-full flex flex-col md:flex-row items-center gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:max-w-md group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-blue-400 group-focus-within:text-blue-300 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-12 py-3 border border-white/5 rounded-xl bg-black/20 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-black/40 transition-all duration-200 shadow-inner"
              placeholder="Search anything..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <span className="text-gray-400 text-xs font-bold bg-white/5 border border-white/5 rounded-md px-2 py-1">
                ⌘ F
              </span>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto">
             {/* Gender Filter */}
             <div className="relative group w-full md:w-auto">
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="appearance-none w-full md:w-auto bg-black/20 hover:bg-black/30 border border-white/5 text-gray-300 py-3 pl-10 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all cursor-pointer font-medium"
                >
                  <option value="" className="bg-slate-900 text-gray-300">Gender</option>
                  <option value="Male" className="bg-slate-900 text-gray-300">Male</option>
                  <option value="Female" className="bg-slate-900 text-gray-300">Female</option>
                </select>
                <Users className="absolute left-3 top-3.5 w-4 h-4 text-blue-400 pointer-events-none group-hover:text-blue-300 transition-colors" />
                <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
             </div>

             {/* Status Filter */}
             <div className="relative group w-full md:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none w-full md:w-auto bg-black/20 hover:bg-black/30 border border-white/5 text-gray-300 py-3 pl-10 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all cursor-pointer font-medium"
                >
                  <option value="" className="bg-slate-900 text-gray-300">Status</option>
                  <option value="active" className="bg-slate-900 text-gray-300">Active</option>
                  <option value="inactive" className="bg-slate-900 text-gray-300">Inactive</option>
                </select>
                <Activity className="absolute left-3 top-3.5 w-4 h-4 text-blue-400 pointer-events-none group-hover:text-blue-300 transition-colors" />
                 <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
             </div>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-3 w-full xl:w-auto justify-end mt-2 xl:mt-0">
           {/* Print Button */}
           <button
            onClick={onPrint}
            className="flex-1 xl:flex-none bg-sky-950/20 hover:bg-sky-950/80 text-white px-6 py-3 rounded-xl font-medium transition-all backdrop-blur-xl    border border-sky-800 flex items-center justify-center gap-2"
          >
            <Printer size={18} className="text-blue-300" />
            <span>Print List</span>
          </button>


           {/* Add Employee Button */}
           <button
            onClick={onAddEmployee}
            className="flex-1 xl:flex-none bg-sky-950/20 hover:bg-sky-950/80 text-white px-6 py-3 rounded-xl font-medium transition-all backdrop-blur-xl    border border-sky-800 flex items-center justify-center gap-2"
          >
            <UserPlus size={18} className="text-blue-300" />
            <span>Add Employee</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default DashboardControls;

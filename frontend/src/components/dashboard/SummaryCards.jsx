import { CheckCircle } from "lucide-react";

/**
 * =========================
 * SUMMARY CARDS COMPONENT
 * =========================
 *
 * Responsibilities:
 * - Display high-level employee statistics
 * - Derive values from employees array
 * - Render single card with donut chart
 *
 * IMPORTANT DESIGN DECISION:
 * - This component is PURELY presentational
 * - It does NOT fetch data or manage state
 * - All data comes from parent (Dashboard)
 */

const SummaryCards = ({ employees }) => {
  /**
   * Derive counts from employees data
   */
  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (emp) => emp.active
  ).length;

  const inactiveEmployees = employees.filter(
    (emp) => !emp.active
  ).length;

  /**
   * Chart Calculations
   * We use a normalized radius of 15.9155 so circumference is approx 100.
   * This makes percentage calculations direct mapping to stroke-dasharray.
   */
  const activePercentage = totalEmployees > 0 ? (activeEmployees / totalEmployees) * 100 : 0;
  const inactivePercentage = totalEmployees > 0 ? (inactiveEmployees / totalEmployees) * 100 : 0;

  return (
    <div className="no-print bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full flex flex-col shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-100">
          Status
        </h3>
        <button className="text-blue-400 text-sm font-semibold hover:text-blue-300 hover:underline transition-colors">
          View Stats
        </button>
      </div>
      <hr className="border-white/10" />

      <div className="flex flex-col items-center justify-between flex-1 mt-6 gap-8">
        {/* Donut Chart (Top in vertical layout) */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg width="160" height="160" viewBox="0 0 42 42" className="transform -rotate-90">
            {/* Background Circle */}
            <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="5"></circle>

            {/* Active Segment (Green) */}
            <circle
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke="#3b82f6" 
              strokeWidth="5"
              strokeDasharray={`${activePercentage} ${100 - activePercentage}`}
              strokeDashoffset="0"
              className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            ></circle>

            {/* Inactive Segment (Red/Gray - filling the rest) */}
            {/* We can rely on the background circle for the "rest" or add another segment if needed. 
                But typically donut charts show parts of a whole. 
                Let's add the inactive part explicitly for visual completeness if needed, 
                or just let the background show. 
                Actually, to match the UI better, let's add the second segment.
            */}
             <circle
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke="#ef4444"
              strokeWidth="5"
              strokeDasharray={`${inactivePercentage} ${100 - inactivePercentage}`}
              strokeDashoffset={-activePercentage} // Start where active ends
              className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
            ></circle>
          </svg>
          
          {/* Center Text */}
           <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-white drop-shadow-md">{totalEmployees}</span>
              <span className="text-xs text-gray-400 font-medium">Total</span>
           </div>
        </div>

        {/* Legend / Stats List */}
        <div className="space-y-6 w-full px-2">
          {/* Active stats */}
          <div className="flex items-center justify-between group">
             <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">Active</span>
             </div>
            <span className="text-xl font-bold text-gray-100">{activeEmployees}</span>
          </div>

          {/* Inactive stats */}
          <div className="flex items-center justify-between group">
             <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">Inactive</span>
             </div>
            <span className="text-xl font-bold text-gray-100">{inactiveEmployees}</span>
          </div>

          {/* Total stats */}
           <div className="flex items-center justify-between group">
             <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-600"></span>
                <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">Total</span>
             </div>
            <span className="text-xl font-bold text-gray-100">{totalEmployees}</span>
          </div>
        </div>
      </div>
      
      {/* Footer (mt-auto pushes to bottom) */}
      <div className="mt-auto pt-6 flex items-center gap-2 text-xs text-gray-500 justify-center">
        <CheckCircle className="text-green-400 w-4 h-4" />
        <span className="font-medium">Real-time updates</span> 
      </div>
    </div>
  );
};

export default SummaryCards;

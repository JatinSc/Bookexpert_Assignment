import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";
import { logoutUser } from "../services/authApi";
import { getEmployees, updateEmployee } from "../services/employeeApi";
import SummaryCards from "../components/dashboard/SummaryCards";
import DashboardControls from "../components/dashboard/DashboardControls";
import EmployeeTable from "../components/dashboard/EmployeeTable";
import { toggleEmployeeStatus } from "../services/employeeApi";
import { deleteEmployee } from "../services/employeeApi";
import EmployeeModal from "../components/employee/EmployeeModal";
import EmployeeForm from "../components/employee/EmployeeForm";
import { addEmployee } from "../services/employeeApi";
import { User as UserIcon, LogOut, ChevronDown } from "lucide-react";
import { toast } from "react-hot-toast";



/**
 * =========================
 * DASHBOARD PAGE (DATA LAYER)
 * =========================
 *
 * Responsibilities at this stage:
 * - Fetch employees from API
 * - Manage loading & error state
 * - Hold employee data in state
 *
 * IMPORTANT DESIGN DECISION:
 * - Dashboard acts as a container component
 * - UI components will be added later
 */

const Dashboard = () => {
  /**
   * Logged-in user info
   * ------------------
   * Used only for display purposes
   */
  const user = getUserFromToken();

  /**
   * Navigation hook
   */
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  /**
   * EMPLOYEE STATE
   * --------------
   * employees → stores fetched data
   * loading   → controls loading UI
   * error     → stores API errors
   */
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // Controls Edit Employee modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  //Stores employee being edited
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  /**
   * FILTER STATE
   * ------------
   * These values represent user-selected filters
   */
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  /**
   * FILTERED EMPLOYEES (DERIVED)
   * ---------------------------
   * This is NOT stored in state.
   * It is computed on every render.
   *
   * Why?
   * - Avoids duplicate state
   * - Always stays in sync with employees
   */
  const filteredEmployees = employees.filter((employee) => {
    /**
     * Name search (case-insensitive)
     */
    const matchesSearch = employee.fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    /**
     * Gender filter
     */
    const matchesGender =
      genderFilter === "" ||
      employee.gender === genderFilter;

    /**
     * Status filter
     */
    const matchesStatus =
      statusFilter === "" ||
      (statusFilter === "active" &&
        employee.active) ||
      (statusFilter === "inactive" &&
        !employee.active);

    /**
     * AND logic:
     * Employee must satisfy ALL conditions
     */
    return (
      matchesSearch &&
      matchesGender &&
      matchesStatus
    );
  });


  /**
   * Fetch employees on component mount
   * ----------------------------------
   * useEffect with empty dependency array
   * ensures API call runs only once
   */
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setError("");

        /**
         * Call employee API
         * -----------------
         * Axios returns parsed JSON in response.data
         */
        const data = await getEmployees();
        setEmployees(data);
      } catch (err) {
        setError("Failed to load employees");
        toast.error("Failed to load employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  /**
   * Handle logout
   */
  const handleLogout = () => {
    logoutUser();
    toast.success("Logged out");
    navigate("/login");
  };

  /**
 * Handle Active / Inactive toggle
 * -------------------------------
 * This function:
 * - Updates backend via API
 * - Updates local state for instant UI feedback
 */
  const handleToggleStatus = async (employee) => {
    try {
      /**
       * Optimistic UI approach:
       * - We calculate new status first
       */
      const updatedStatus = !employee.active;

      /**
       * Call API to update status
       */
      await toggleEmployeeStatus(employee.id, updatedStatus);

      /**
       * Update local state
       * ------------------
       * We map over employees and update only the changed one
       */
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === employee.id
            ? { ...emp, active: updatedStatus }
            : emp
        )
      );
      toast.success(`Marked ${updatedStatus ? "Active" : "Inactive"}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  /**
   * Handle employee deletion
   * ------------------------
   * This function:
   * - Confirms user intent
   * - Deletes employee from backend
   * - Updates local state
   */
  const handleDeleteEmployee = async (employeeId) => {
    /**
     * Confirmation dialog
     * -------------------
     * Simple & effective UX
     * (Can be replaced with modal later)
     */
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      /**
       * Call DELETE API
       */
      await deleteEmployee(employeeId);

      /**
       * Update local state
       * ------------------
       * Remove deleted employee from array
       */
      setEmployees((prevEmployees) =>
        prevEmployees.filter(
          (emp) => emp.id !== employeeId
        )
      );
      toast.success("Employee deleted");
    } catch (error) {
      toast.error("Failed to delete employee");
    }
  };

  /**
 * Handle Add Employee
 * -------------------
 * This function:
 * - Receives validated data from EmployeeForm
 * - Calls POST API
 * - Updates local state
 * - Closes modal
 */
  const handleAddEmployee = async (employeeData) => {
    try {
      /**
       * Call POST API
       * -------------
       * JSON Server automatically generates `id`
       */
      const newEmployee = await addEmployee(employeeData);

      /**
       * Update local state
       * ------------------
       * Append new employee to existing list
       */
      setEmployees((prevEmployees) => [
        ...prevEmployees,
        newEmployee,
      ]);

      /**
       * Close modal after successful add
       */
      setIsAddModalOpen(false);
      toast.success("Employee added");
    } catch (error) {
      toast.error("Failed to add employee");
    }
  };

  /**
 * Open Edit Employee modal
 * -----------------------
 * Sets selected employee
 * and opens modal
 */
  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  /**
   * Handle Edit Employee submission
   * -------------------------------
   * This function:
   * - Calls PUT API
   * - Updates local state
   * - Closes modal
   */
  const handleUpdateEmployee = async (updatedData) => {
    try {
      /**
       * Call PUT API
       */
      const updatedEmployee = await updateEmployee(
        selectedEmployee.id,
        {
          ...selectedEmployee,
          ...updatedData,
        }
      );

      /**
       * Update local state
       * ------------------
       * Replace updated employee in list
       */
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === updatedEmployee.id
            ? updatedEmployee
            : emp
        )
      );

      /**
       * Reset edit state
       */
      setIsEditModalOpen(false);
      setSelectedEmployee(null);
      toast.success("Employee updated");
    } catch (error) {
      toast.error("Failed to update employee");
    }
  };

  /**
   * Handle Print
   * ------------
   * Uses native browser print
   */
  const handlePrint = () => {
    window.print();
  };





  return (
    <div className="min-h-screen relative bg-[#0f172a] text-gray-100 font-sans selection:bg-blue-500 selection:text-white overflow-hidden">
      {/* Background Effects - "Coinwell" style nebula/aurora */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/30 blur-[120px]" />
          <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/30 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] rounded-full bg-indigo-900/20 blur-[150px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-pink-900/20 blur-[100px]" />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="bg-[#1e293b]/30 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center no-print sticky top-0 z-50">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Employee Management
          </h1>

          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen((v) => !v)}
              className="flex items-center gap-3 px-3 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-gray-100 transition"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white">
                {(user?.email?.[0] || "?").toUpperCase()}
              </span>
              <span className="hidden sm:block max-w-[180px] truncate text-sm">
                {user?.email || "User"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-300" />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg p-2 z-50">
                <div className="px-3 py-2 text-xs text-gray-400 truncate">
                  {user?.email || "User"}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 flex-1">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-12">
               <p className="text-blue-400 animate-pulse">Loading employees...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg backdrop-blur-md">
               <p>{error}</p>
            </div>
          )}

          {/* Success State */}
          {!loading && !error && (
            <>
              <div className="flex flex-col lg:flex-row gap-6 mb-6 h-full">
                {/* Left Column (80%) */}
                <div className="w-full lg:w-4/5 flex flex-col gap-4">
                   <DashboardControls 
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      genderFilter={genderFilter}
                      setGenderFilter={setGenderFilter}
                      statusFilter={statusFilter}
                      setStatusFilter={setStatusFilter}
                      onAddEmployee={() => setIsAddModalOpen(true)}
                      onPrint={handlePrint}
                    />
                   <EmployeeTable
                      employees={filteredEmployees}
                      onToggleStatus={handleToggleStatus}
                      onDelete={handleDeleteEmployee}
                      onEdit={handleEditClick}
                    />
                </div>
                
                {/* Right Column (20%) */}
                <div className="w-full lg:w-1/5">
                  <SummaryCards employees={employees} />
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      <EmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      >
        <h2 className="text-lg font-semibold mb-4">
          Add Employee
        </h2>

        <EmployeeForm
          onSubmit={handleAddEmployee}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </EmployeeModal>
      <EmployeeModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedEmployee(null);
        }}
      >
        <h2 className="text-lg font-semibold mb-4">
          Edit Employee
        </h2>

        <EmployeeForm
          initialData={selectedEmployee}
          onSubmit={handleUpdateEmployee}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedEmployee(null);
          }}
        />
      </EmployeeModal>

    </div>
  );
};

export default Dashboard;

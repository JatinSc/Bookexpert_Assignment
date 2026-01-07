import apiClient from "./apiClient";

/**
 * GET /employees
 * Fetch all employees
 */
export const getEmployees = async () => {
  const response = await apiClient.get("/employees");
  return response.data;
};

/**
 * GET /employees/:id
 * Fetch single employee
 */
export const getEmployeeById = async (id) => {
  const response = await apiClient.get(`/employees/${id}`);
  return response.data;
};

/**
 * POST /employees
 * Add new employee
 */
export const addEmployee = async (employeeData) => {
  const response = await apiClient.post("/employees", employeeData);
  return response.data;
};

/**
 * PUT /employees/:id
 * Update existing employee
 */
export const updateEmployee = async (id, employeeData) => {
  const response = await apiClient.put(`/employees/${id}`, employeeData);
  return response.data;
};

/**
 * DELETE /employees/:id
 * Delete employee
 */
export const deleteEmployee = async (id) => {
  await apiClient.delete(`/employees/${id}`);
};

/**
 * PATCH /employees/:id
 * Update partial employee data
 *
 * Decision:
 * - PATCH is used instead of PUT
 * - Only updates fields that change
 */
export const toggleEmployeeStatus = async (id, active) => {
  const response = await apiClient.patch(`/employees/${id}`, {
    active,
  });
  return response.data;
};

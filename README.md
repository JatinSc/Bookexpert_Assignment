# Employee Management Dashboard

## 📌 Project Overview

This project is a **React-based Employee Management Dashboard** built as part of a UI-focused assignment.  
The goal of the project is to demonstrate **frontend architecture, state management, UI/UX design, and clean React patterns**, rather than backend complexity.

The application allows an authenticated user to:
- Manage employees (Add, Edit, Delete)
- Toggle employee active/inactive status
- Search and filter employees
- View summary statistics
- Print a clean employee list

A **mock backend** is used to simulate real-world API interactions, keeping the focus on frontend implementation and UX.

---

## 🧰 Tech Stack Used

### Frontend
- **React** (with Vite)
- **JavaScript**
- **Tailwind CSS** (for styling and responsive UI)
- **Axios** (for API communication)

### Mock Backend
- **JSON Server** (to simulate REST APIs)

### Other
- **LocalStorage** (mock authentication token)
- **Native Browser Print API** (`window.print()`)

---

## ▶️ Steps to Run the Project Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/JatinSc/Bookexpert_Assignment.git
cd Bookexpert_Assignment/frontend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Start the development server
```bash
npm run dev
```

### 4️⃣ Start the mock backend server
```bash
npm run server
```

### 5️⃣ Open the application
- The app will be available at `http://localhost:5173`
- Mock backend will run on `http://localhost:3001`

---

## 🧠 Key Design Decisions & Assumptions

1. Frontend-First Approach
   - This assignment is treated as a UI-focused project.
   - A real backend was intentionally avoided to focus on:
     - Component architecture
     - State management
     - UX and responsiveness
     - Code readability
     - added react toast message notification for success and error for better user    experience.

2. JSON Server as Mock Backend
   - Simulates REST APIs (GET, POST, PUT, PATCH, DELETE).
   - Allows realistic API interaction without backend setup.
   - Keeps the project simple and focused on frontend logic.

3. Centralized API Layer (Axios)
   - All API calls are abstracted into a services layer.
   - Components never call APIs directly.
   - Makes backend replacement easy in the future.

4. Mock JWT Authentication
   - JWT generation and validation are simulated.
   - Token existence is used for route protection.
   - Clear separation between public and protected routes.
   - In production, authentication would be fully backend-driven.

5. Parent-Controlled State Management
   - The Dashboard acts as a container component.
   - Child components are purely presentational.
   - All CRUD operations are handled at the parent level.
   - Ensures predictable data flow and easier debugging.

6. Reusable Employee Form
   - A single form component is used for both Add and Edit.
   - Supports prefilled data for edit mode.
   - Avoids duplication and improves maintainability.

7. Image Handling Using Base64
   - Images are converted to Base64 strings before saving.
   - Ensures persistence with JSON Server.
   - Object URLs were avoided as they are not persistent.
   - Note: Base64 is not recommended for production apps, but is appropriate for a mock backend setup.

8. Client-Side Search & Filtering
   - Filtering is done on the frontend using derived state.
   - No additional API calls on filter change.
   - Improves performance and UX for dashboard-style data.

9. Print-Specific UI Handling
   - Interactive elements (toggles, buttons) are hidden during print.
   - Status is shown as plain text when printing.
   - Implemented using CSS media queries instead of JavaScript hacks.

10. UX & Accessibility Considerations
   - Loading and empty states handled gracefully.
   - Confirmation dialogs for destructive actions.
   - Clear visual hierarchy and spacing.
   - Responsive layout for different screen sizes.

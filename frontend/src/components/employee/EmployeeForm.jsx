import { useState, useRef } from "react";
import { Image as ImageIcon, Save, X } from "lucide-react";

/**
 * =========================
 * EMPLOYEE FORM COMPONENT
 * =========================
 *
 * This form is designed to be REUSABLE.
 *
 * Current usage:
 * - Add Employee
 *
 * Future usage:
 * - Edit Employee (same form, prefilled data)
 *
 * IMPORTANT DESIGN DECISIONS:
 * - No API calls here
 * - Parent controls submission & persistence
 * - Form only emits validated data
 */

const EmployeeForm = ({ onSubmit, onCancel, initialData }) => {
  /**
   * FORM STATE
   * ----------
   * Controlled inputs are used so that:
   * - Validation is easy
   * - Prefilling data (Edit) is possible
   */
  const [fullName, setFullName] = useState(initialData?.fullName || "");
  const [gender, setGender] = useState(initialData?.gender || "");
  const [dob, setDob] = useState(initialData?.dob || "");
  const [state, setState] = useState(initialData?.state || "");
  const [active, setActive] = useState(
    initialData?.active !== undefined ? initialData.active : true
  );
  const [image, setImage] = useState(initialData?.image || "");

  /**
   * Image preview state
   * -------------------
   * Stores a base64 / object URL for preview
   */
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");
  const fileInputRef = useRef(null);

  /**
   * Validation error state
   */
  const [errors, setErrors] = useState({});

  /**
   * PREFILL FORM (EDIT MODE)
   * ------------------------
   * If initialData is provided,
   * populate form fields.
   *
   * For Add Employee:
   * - initialData will be undefined
   */

  /**
   * FORM VALIDATION
   * ---------------
   * Returns true if valid,
   * otherwise sets error messages.
   */
  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!gender) {
      newErrors.gender = "Gender is required";
    }

    if (!dob) {
      newErrors.dob = "Date of birth is required";
    }

    if (!state) {
      newErrors.state = "State is required";
    }

    setErrors(newErrors);

    /**
     * If no error keys exist,
     * form is valid
     */
    return Object.keys(newErrors).length === 0;
  };

/**
 * HANDLE IMAGE SELECTION
 * ----------------------
 * Converts selected image into Base64 string
 *
 * WHY BASE64?
 * - JSON Server cannot store files
 * - Base64 persists across refresh
 * - Suitable for demo & assignments
 */
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  /**
   * FileReader reads file asynchronously
   */
  reader.onloadend = () => {
    /**
     * reader.result contains Base64 string
     * Example:
     * "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
     */
    setImage(reader.result);
    setImagePreview(reader.result);
  };

  /**
   * Convert file → Base64
   */
  reader.readAsDataURL(file);
};

  /**
   * HANDLE FORM SUBMIT
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    /**
     * Validate before submission
     */
    if (!validateForm()) return;

    /**
     * Prepare employee payload
     * -------------------------
     * This object matches db.json structure
     */
    const employeeData = {
      fullName,
      gender,
      dob,
      state,
      active,
      image,
    };

    /**
     * Pass data to parent (Dashboard)
     * Parent will:
     * - Call API
     * - Update state
     * - Close modal
     */
    onSubmit(employeeData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="text-sm text-gray-300 mb-2 block">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            placeholder="Enter full name"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-300 mb-2 block">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full appearance-none bg-black/30 hover:bg-black/40 border border-white/10 text-gray-300 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-xs text-red-400">{errors.gender}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-300 mb-2 block">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
          />
          {errors.dob && (
            <p className="mt-1 text-xs text-red-400">{errors.dob}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-300 mb-2 block">State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full appearance-none bg.black/30 bg-black/30 hover:bg-black/40 border border-white/10 text-gray-300 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
          >
            <option value="">Select state</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
          </select>
          {errors.state && (
            <p className="mt-1 text-xs text-red-400">{errors.state}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setActive(!active)}
          className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all ${active ? "bg-blue-600" : "bg-gray-700"}`}
        >
          <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition ${active ? "translate-x-8" : "translate-x-1"}`} />
        </button>
        <span className="text-sm text-gray-300">{active ? "Active" : "Inactive"}</span>
      </div>

      <div>
        <label className="text-sm text-gray-300 mb-2 block">Profile Image</label>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (!file) return;
            const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
            if (!validTypes.includes(file.type)) return;
            const reader = new FileReader();
            reader.onloadend = () => {
              setImage(reader.result);
              setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
          }}
          className="relative flex flex-col items-center justify-center w-full min-h-36 rounded-2xl border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 transition backdrop-blur-xl text-center p-6"
        >
          <ImageIcon className="w-12 h-12 text-blue-300 mb-3" />
          <p className="text-sm text-gray-300">
            Drop your image here, or{" "}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-300 hover:text-blue-200 underline decoration-blue-300/40"
            >
              browse
            </button>
          </p>
          <p className="mt-1 text-xs text-gray-400">Supports PNG, JPG, JPEG, WEBP</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        {imagePreview && (
          <div className="mt-3 inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={() => {
                setImage("");
                setImagePreview("");
              }}
              className="px-2 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              <X className="w-4 h-4 text-gray-300" />
              {/* Remove */}
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 transition"
        >
          <X className="w-4 h-4 text-gray-300" />
          <span>Cancel</span>
        </button>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition shadow-lg shadow-blue-900/30 border border-blue-500/30"
        >
          <Save className="w-4 h-4 text-white" />
          <span>Save</span>
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;

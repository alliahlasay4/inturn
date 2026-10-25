import { useState, useEffect } from "react";
import "../../styles/profile-modal.css";

import { createPortal } from "react-dom";

export default function ProfileModal({ onClose }) {

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    email: "sarah.martinez@gmail.com",
    phone: "0990909090",
    emergencyPhone: "0202020202",
    emergencyName: "Maria Martinez",
    address: `676 College Avenue, Apt 12B
Los Angeles, CA 900212`,
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    emergencyPhone: "",
    emergencyName: "",
    address: "",
  });

  const [toast, setToast] = useState(null); // { type: "success" | "error", message: "" }

  function showToast(type, message) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    // PHONE FIELDS
    if (name === "phone" || name === "emergencyPhone") {
      let numericValue = value.replace(/\D/g, "").slice(0, 11);

      // enforce starting with 09
      if (numericValue.length >= 2 && !numericValue.startsWith("09")) {
        setErrors(prev => ({
          ...prev,
          [name]: "Must start with 09",
        }));
      } else if (numericValue.length !== 11) {
        setErrors(prev => ({
          ...prev,
          [name]: "Must be 11 digits starting with 09",
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          [name]: "",
        }));
      }

      setProfile(prev => ({
        ...prev,
        [name]: numericValue,
      }));

      return;
    }


    // EMAIL
    if (name === "email") {
      setProfile(prev => ({
        ...prev,
        email: value,
      }));

      setErrors(prev => ({
        ...prev,
        email: validateEmail(value)
          ? ""
          : "Enter a valid email",
      }));

      return;
    }

    // REQUIRED TEXT FIELDS
    setProfile(prev => ({
      ...prev,
      [name]: value,
    }));

    setErrors(prev => ({
      ...prev,
      [name]: value.trim() === "" ? "This field is required" : "",
    }));
  }

  function validateAllFields() {
    const newErrors = {
      email: "",
      phone: "",
      emergencyPhone: "",
      emergencyName: "",
      address: "",
    };

    if (!profile.email.trim()) {
      newErrors.email = "This field is required";
    } else if (!validateEmail(profile.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!/^09\d{9}$/.test(profile.phone)) {
      newErrors.phone = "Must be 11 digits starting with 09";
    }

    if (!/^09\d{9}$/.test(profile.emergencyPhone)) {
      newErrors.emergencyPhone = "Must be 11 digits starting with 09";
    }


    if (!profile.emergencyName.trim()) {
      newErrors.emergencyName = "This field is required";
    }

    if (!profile.address.trim()) {
      newErrors.address = "This field is required";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every(err => err === "");
  }

  function handleSave() {
    const isValid = validateAllFields();

    if (!isValid) {
      showToast("error", "Please fix the errors before saving.");
      return;
    }

    // later: send to backend
    setIsEditing(false);

    setErrors({
      email: "",
      phone: "",
      emergencyPhone: "",
      emergencyName: "",
      address: "",
    });

    showToast("success", "Profile updated successfully.");
  }

  return createPortal (
    <div className="modal-overlay">
      <div className="profile-modal">

        {/* Toast */}
        {toast && (
          <div className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        )}

        {/* Header */}
        <div className="profile-header">
          <div className="profile-user">
            <div className="avatar">👤</div>
            <div>
              <h3>Sarah Martinez</h3>
              <p>Intern - 1404</p>
            </div>
          </div>

          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="profile-body">

          {/* LEFT COLUMN */}
          <div className="profile-column">
            <div className="section-title">
              <h4>Personal Details</h4>
              <div className="section-action">
                <span className="view-only">View Only</span>
              </div>
            </div>

            <label>Full Name</label>
            <input value="Sarah Martinez" disabled />

            <label>Gender</label>
            <input value="Female" disabled />

            <label>Date of Birth</label>
            <input value="March 20, 2002" disabled />

            <label>University / College</label>
            <input value="College of Manila" disabled />

            <label>Intern Role / Department</label>
            <input value="Software Developer" disabled />

            <label>Internship Start Date</label>
            <input value="February 16, 2026" disabled />
          </div>

          <div className="divider" />

          {/* RIGHT COLUMN */}
          <div className="profile-column">
            <div className="section-title">
              <h4>Contact Details</h4>
              <div className="section-action">

                {!isEditing ? (
                  <span className="edit" onClick={() => setIsEditing(true)}>
                    Edit
                  </span>
                ) : (
                  <span className="edit" onClick={() => setIsEditing(false)}>
                    Cancel
                  </span>
                )}
              </div>
            </div>

            <label>Personal Email</label>
            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.email && <small className="error">{errors.email}</small>}

            <label>Phone Number</label>
            <input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.phone && <small className="error">{errors.phone}</small>}

            <label>Emergency Contact</label>
            <input
              name="emergencyPhone"
              value={profile.emergencyPhone}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.emergencyPhone && (
              <small className="error">{errors.emergencyPhone}</small>
            )}

            <label>Emergency Contact (Name)</label>
            <input
              name="emergencyName"
              value={profile.emergencyName}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.emergencyName && (
              <small className="error">{errors.emergencyName}</small>
            )}

            <label>Address</label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.address && (
              <small className="error">{errors.address}</small>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="profile-footer">
          <button
            className="save-btn"
            disabled={!isEditing}
            onClick={handleSave}
          >

            Save Changes
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

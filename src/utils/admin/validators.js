import React from "react";

export const useValidators = () => {
  // Name
  const validationName = (value, minimal) => {
    if (!value || value.trim().length < minimal) {
      return `Name must be at least ${minimal} characters.`;
    }
    return null;
  };

  // Role
  const validationSelect = (value) => {
    const role = Number(value);

    if (value === "" || isNaN(role)) {
      return "Role must be either 0, 1, or other.";
    }

    return null;
  };


  // Email
  const validationEmail = (value) => {
    if (!value) return "Email is required.";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) return "Invalid email format.";
    return null;
  };

  // Phone Number
  const validationPhoneNumber = (value) => {
    if (!value) return "Phone number is required.";
    if (!/^\d{10,15}$/.test(value)) {
      return "Phone number must be 10–15 digits.";
    }
    return null;
  };

  // Username
  const validationUsername = (value, minimal = 5) => {
    if (!value) return "Username is required.";
    if (!/^[a-zA-Z0-9_]{5,}$/.test(value)) {
      return `Username must be at least ${minimal} characters, no spaces.`;
    }
    return null;
  };

  // Password
  const validationPassword = (value, minimal = 8) => {
    if (!value) return "Password is required.";
    if (value.length < minimal) {
      return `Password must be at least ${minimal} characters.`;
    }
    return null;
  };

  return {
    validationName,
    validationEmail,
    validationPhoneNumber,
    validationUsername,
    validationPassword,
    validationSelect,
  };
};

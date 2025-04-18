// src/utils/helper.js

/**
 * Returns true if `email` is a valid email address.
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Extracts up to two initials from a name string.
 * Returns an uppercase string (e.g. "John Doe" → "JD").
 */
export const getInitials = (name) => {
  if (!name || typeof name !== "string") return "";

  // Split on spaces, trim out empty segments
  const words = name.trim().split(/\s+/).filter(Boolean);

  // Build up to 2-character initials
  let initials = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

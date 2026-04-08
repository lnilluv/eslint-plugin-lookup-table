export type FieldType = "email" | "phone" | "url" | "zip" | "username";

export interface ValidationResult {
  isValid: boolean;
  errorMessage: string | null;
  sanitizedValue: string;
}

const patterns: Record<FieldType, RegExp> = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-().]{7,20}$/,
  url: /^https?:\/\/[^\s/$.?#].[^\s]*$/i,
  zip: /^\d{5}(-\d{4})?$/,
  username: /^[a-zA-Z0-9_]{3,30}$/,
};

const errorMessages: Record<FieldType, string> = {
  email: "Please enter a valid email address.",
  phone: "Please enter a valid phone number.",
  url: "Please enter a valid URL starting with http:// or https://.",
  zip: "Please enter a valid ZIP code (e.g. 12345 or 12345-6789).",
  username: "Username must be 3-30 characters using letters, numbers, or underscores.",
};

function sanitize(fieldType: FieldType, value: string): string {
  const trimmed = value.trim();
  switch (fieldType) {
    case "email":
      return trimmed.toLowerCase();
    case "phone":
      return trimmed.replace(/[^\d+]/g, "");
    case "url":
      return trimmed;
    case "zip":
      return trimmed;
    case "username":
      return trimmed.toLowerCase();
  }
}

export function validateFormField(
  fieldType: FieldType,
  value: string,
  required: boolean = false
): ValidationResult {
  const trimmed = value.trim();

  if (trimmed === "") {
    if (required) {
      return { isValid: false, errorMessage: "This field is required.", sanitizedValue: "" };
    }
    return { isValid: true, errorMessage: null, sanitizedValue: "" };
  }

  const pattern = patterns[fieldType];
  const isValid = pattern.test(trimmed);

  return {
    isValid,
    errorMessage: isValid ? null : errorMessages[fieldType],
    sanitizedValue: sanitize(fieldType, trimmed),
  };
}

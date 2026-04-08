export type FormFieldType = "email" | "phone" | "url" | "zip" | "username";

export interface ValidationResult {
  isValid: boolean;
  errorMessage: string | null;
  sanitizedValue: string;
}

function sanitizeValue(fieldType: FormFieldType, value: string): string {
  const trimmed = value.trim();

  switch (fieldType) {
    case "email":
      return trimmed.toLowerCase();
    case "phone":
      return trimmed.replace(/[^\d+]/g, "");
    case "url":
      return trimmed;
    case "zip":
      return trimmed.toUpperCase();
    case "username":
      return trimmed;
  }
}

function isValidField(fieldType: FormFieldType, value: string): boolean {
  switch (fieldType) {
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    case "phone": {
      const normalized = value.replace(/\s+/g, "");
      return /^\+?[1-9]\d{7,14}$/.test(normalized);
    }
    case "url": {
      try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
      } catch {
        return false;
      }
    }
    case "zip":
      return /^\d{5}(?:-\d{4})?$/.test(value);
    case "username":
      return /^[A-Za-z0-9_]{3,20}$/.test(value);
  }
}

export function validateFormField(fieldType: FormFieldType, value: string, required: boolean = true): ValidationResult {
  const sanitizedValue = sanitizeValue(fieldType, value);

  if (!sanitizedValue) {
    if (!required) {
      return {
        isValid: true,
        errorMessage: null,
        sanitizedValue,
      };
    }

    return {
      isValid: false,
      errorMessage: "This field is required.",
      sanitizedValue,
    };
  }

  const valid = isValidField(fieldType, sanitizedValue);

  return {
    isValid: valid,
    errorMessage: valid ? null : `Invalid ${fieldType} format.`,
    sanitizedValue,
  };
}

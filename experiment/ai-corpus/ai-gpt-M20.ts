export type InputType =
  | "email"
  | "password"
  | "username"
  | "phone"
  | "search"
  | "firstName"
  | "lastName"
  | "address"
  | "city"
  | "zip";

export type SupportedLocale = "en" | "es" | "fr";

const placeholders: Record<InputType, Record<SupportedLocale, string>> = {
  email: {
    en: "Enter your email address",
    es: "Ingrese su correo electrónico",
    fr: "Entrez votre adresse e-mail",
  },
  password: {
    en: "Enter your password",
    es: "Ingrese su contraseña",
    fr: "Entrez votre mot de passe",
  },
  username: {
    en: "Choose a username",
    es: "Elija un nombre de usuario",
    fr: "Choisissez un nom d'utilisateur",
  },
  phone: {
    en: "Enter your phone number",
    es: "Ingrese su número de teléfono",
    fr: "Entrez votre numéro de téléphone",
  },
  search: {
    en: "Search...",
    es: "Buscar...",
    fr: "Rechercher...",
  },
  firstName: {
    en: "First name",
    es: "Nombre",
    fr: "Prénom",
  },
  lastName: {
    en: "Last name",
    es: "Apellido",
    fr: "Nom de famille",
  },
  address: {
    en: "Street address",
    es: "Dirección",
    fr: "Adresse",
  },
  city: {
    en: "City",
    es: "Ciudad",
    fr: "Ville",
  },
  zip: {
    en: "ZIP / Postal code",
    es: "Código postal",
    fr: "Code postal",
  },
};

export function getInputPlaceholder(inputType: InputType, locale: SupportedLocale): string {
  return placeholders[inputType]?.[locale] ?? placeholders[inputType]?.["en"] ?? "";
}

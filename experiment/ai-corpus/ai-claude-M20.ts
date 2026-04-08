export type InputType = "email" | "phone" | "url" | "search" | "username" | "password";
export type PlaceholderLocale = "en" | "es" | "fr";

const PLACEHOLDERS: Record<PlaceholderLocale, Record<InputType, string>> = {
  en: {
    email: "Enter your email",
    phone: "Enter your phone number",
    url: "https://example.com",
    search: "Search...",
    username: "Choose a username",
    password: "Enter your password",
  },
  es: {
    email: "Ingresa tu correo electrónico",
    phone: "Ingresa tu número de teléfono",
    url: "https://ejemplo.com",
    search: "Buscar...",
    username: "Elige un nombre de usuario",
    password: "Ingresa tu contraseña",
  },
  fr: {
    email: "Saisissez votre e-mail",
    phone: "Saisissez votre numéro de téléphone",
    url: "https://exemple.com",
    search: "Rechercher...",
    username: "Choisissez un nom d'utilisateur",
    password: "Saisissez votre mot de passe",
  },
};

export function getInputPlaceholder(inputType: InputType, locale: PlaceholderLocale): string {
  return PLACEHOLDERS[locale][inputType];
}

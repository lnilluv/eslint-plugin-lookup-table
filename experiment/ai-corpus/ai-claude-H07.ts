export type LocaleCode = "en-US" | "fr-FR" | "de-DE" | "ja-JP" | "pt-BR";
export type TextDirection = "ltr" | "rtl";

export interface LocaleSettings {
  dateFormatPattern: string;
  thousandsSeparator: string;
  decimalSeparator: string;
  textDirection: TextDirection;
}

const LOCALE_SETTINGS: Record<LocaleCode, LocaleSettings> = {
  "en-US": {
    dateFormatPattern: "MM/dd/yyyy",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    textDirection: "ltr",
  },
  "fr-FR": {
    dateFormatPattern: "dd/MM/yyyy",
    thousandsSeparator: " ",
    decimalSeparator: ",",
    textDirection: "ltr",
  },
  "de-DE": {
    dateFormatPattern: "dd.MM.yyyy",
    thousandsSeparator: ".",
    decimalSeparator: ",",
    textDirection: "ltr",
  },
  "ja-JP": {
    dateFormatPattern: "yyyy/MM/dd",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    textDirection: "ltr",
  },
  "pt-BR": {
    dateFormatPattern: "dd/MM/yyyy",
    thousandsSeparator: ".",
    decimalSeparator: ",",
    textDirection: "ltr",
  },
};

export function getLocaleSettings(locale: LocaleCode): LocaleSettings {
  return LOCALE_SETTINGS[locale];
}

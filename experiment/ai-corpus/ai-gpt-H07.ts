export type LocaleCode = "en-US" | "fr-FR" | "de-DE" | "ja-JP" | "pt-BR";

export interface LocaleSettings {
  dateFormatPattern: string;
  thousandsSeparator: string;
  decimalSeparator: string;
  textDirection: "ltr" | "rtl";
}

export function getLocaleSettings(locale: LocaleCode): LocaleSettings {
  switch (locale) {
    case "en-US":
      return {
        dateFormatPattern: "MM/DD/YYYY",
        thousandsSeparator: ",",
        decimalSeparator: ".",
        textDirection: "ltr",
      };
    case "fr-FR":
      return {
        dateFormatPattern: "DD/MM/YYYY",
        thousandsSeparator: " ",
        decimalSeparator: ",",
        textDirection: "ltr",
      };
    case "de-DE":
      return {
        dateFormatPattern: "DD.MM.YYYY",
        thousandsSeparator: ".",
        decimalSeparator: ",",
        textDirection: "ltr",
      };
    case "ja-JP":
      return {
        dateFormatPattern: "YYYY/MM/DD",
        thousandsSeparator: ",",
        decimalSeparator: ".",
        textDirection: "ltr",
      };
    case "pt-BR":
      return {
        dateFormatPattern: "DD/MM/YYYY",
        thousandsSeparator: ".",
        decimalSeparator: ",",
        textDirection: "ltr",
      };
  }
}

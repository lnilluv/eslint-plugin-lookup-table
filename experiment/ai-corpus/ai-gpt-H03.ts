export interface FileTypeInfo {
  mimeType: string;
  category: string;
  canPreviewInline: boolean;
}

const fileTypeMap: Record<string, FileTypeInfo> = {
  jpg: { mimeType: "image/jpeg", category: "image", canPreviewInline: true },
  jpeg: { mimeType: "image/jpeg", category: "image", canPreviewInline: true },
  png: { mimeType: "image/png", category: "image", canPreviewInline: true },
  gif: { mimeType: "image/gif", category: "image", canPreviewInline: true },
  webp: { mimeType: "image/webp", category: "image", canPreviewInline: true },
  svg: { mimeType: "image/svg+xml", category: "image", canPreviewInline: true },
  bmp: { mimeType: "image/bmp", category: "image", canPreviewInline: true },
  pdf: { mimeType: "application/pdf", category: "document", canPreviewInline: true },
  doc: { mimeType: "application/msword", category: "document", canPreviewInline: false },
  docx: { mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", category: "document", canPreviewInline: false },
  xls: { mimeType: "application/vnd.ms-excel", category: "spreadsheet", canPreviewInline: false },
  xlsx: { mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", category: "spreadsheet", canPreviewInline: false },
  csv: { mimeType: "text/csv", category: "spreadsheet", canPreviewInline: true },
  txt: { mimeType: "text/plain", category: "text", canPreviewInline: true },
  html: { mimeType: "text/html", category: "web", canPreviewInline: true },
  css: { mimeType: "text/css", category: "web", canPreviewInline: true },
  js: { mimeType: "application/javascript", category: "code", canPreviewInline: true },
  ts: { mimeType: "application/typescript", category: "code", canPreviewInline: true },
  json: { mimeType: "application/json", category: "data", canPreviewInline: true },
  xml: { mimeType: "application/xml", category: "data", canPreviewInline: true },
  mp3: { mimeType: "audio/mpeg", category: "audio", canPreviewInline: false },
  wav: { mimeType: "audio/wav", category: "audio", canPreviewInline: false },
  mp4: { mimeType: "video/mp4", category: "video", canPreviewInline: false },
  avi: { mimeType: "video/x-msvideo", category: "video", canPreviewInline: false },
  zip: { mimeType: "application/zip", category: "archive", canPreviewInline: false },
  tar: { mimeType: "application/x-tar", category: "archive", canPreviewInline: false },
  gz: { mimeType: "application/gzip", category: "archive", canPreviewInline: false },
  md: { mimeType: "text/markdown", category: "text", canPreviewInline: true },
  yaml: { mimeType: "application/x-yaml", category: "data", canPreviewInline: true },
  yml: { mimeType: "application/x-yaml", category: "data", canPreviewInline: true },
};

export function getFileTypeInfo(extension: string): FileTypeInfo {
  const normalized = extension.replace(/^\./, "").toLowerCase();
  return fileTypeMap[normalized] ?? {
    mimeType: "application/octet-stream",
    category: "unknown",
    canPreviewInline: false,
  };
}

export type FileCategory = "document" | "image" | "video" | "audio" | "data" | "archive" | "binary";

export interface FileTypeInfo {
  mimeType: string;
  category: FileCategory;
  canPreviewInline: boolean;
}

export type KnownFileExtension =
  | "txt"
  | "md"
  | "pdf"
  | "jpg"
  | "jpeg"
  | "png"
  | "gif"
  | "webp"
  | "mp4"
  | "mp3"
  | "json"
  | "csv"
  | "zip";

const FILE_TYPE_MAP: Record<KnownFileExtension, FileTypeInfo> = {
  txt: { mimeType: "text/plain", category: "document", canPreviewInline: true },
  md: { mimeType: "text/markdown", category: "document", canPreviewInline: true },
  pdf: { mimeType: "application/pdf", category: "document", canPreviewInline: true },
  jpg: { mimeType: "image/jpeg", category: "image", canPreviewInline: true },
  jpeg: { mimeType: "image/jpeg", category: "image", canPreviewInline: true },
  png: { mimeType: "image/png", category: "image", canPreviewInline: true },
  gif: { mimeType: "image/gif", category: "image", canPreviewInline: true },
  webp: { mimeType: "image/webp", category: "image", canPreviewInline: true },
  mp4: { mimeType: "video/mp4", category: "video", canPreviewInline: true },
  mp3: { mimeType: "audio/mpeg", category: "audio", canPreviewInline: false },
  json: { mimeType: "application/json", category: "data", canPreviewInline: true },
  csv: { mimeType: "text/csv", category: "data", canPreviewInline: true },
  zip: { mimeType: "application/zip", category: "archive", canPreviewInline: false },
};

export function getFileTypeInfo(extension: string): FileTypeInfo {
  const normalized = extension.trim().toLowerCase().replace(/^\./, "");

  if (normalized in FILE_TYPE_MAP) {
    return FILE_TYPE_MAP[normalized as KnownFileExtension];
  }

  return {
    mimeType: "application/octet-stream",
    category: "binary",
    canPreviewInline: false,
  };
}

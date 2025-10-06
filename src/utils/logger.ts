// Central logging utility

export function logInfo(message: string, data?: any) {
  console.info(`[INFO] ${message}`, data || "");
}

export function logError(message: string, data?: any) {
  console.error(`[ERROR] ${message}`, data || "");
}

export function logWarning(message: string, data?: any) {
  console.warn(`[WARN] ${message}`, data || "");
}

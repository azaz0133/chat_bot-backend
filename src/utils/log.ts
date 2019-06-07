export function INFO(message: string): void {
  console.log("[INFO] " + message);
}

export function ERROR(message: string, location: string): void {
  console.log("[ERROR] " + message + "\nAT " + location);
}

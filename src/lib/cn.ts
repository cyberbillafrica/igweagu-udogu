type ClassValue = string | number | false | null | undefined;

/** Joins conditional class names without pulling in a dependency. */
export function cn(...values: ClassValue[]): string {
  return values.filter((value): value is string => typeof value === "string" && value.length > 0).join(" ");
}

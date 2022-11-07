/**
 * TODO: (AlexanderFSP) Move to lib
 */
export type Nullable<T> = T | null;

/**
 * TODO: (AlexanderFSP) Move to lib
 */
export function nullable<T>(value: T | null | undefined): Nullable<T> {
  return value || null;
}

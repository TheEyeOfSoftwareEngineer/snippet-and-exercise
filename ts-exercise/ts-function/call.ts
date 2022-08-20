/**
 * complete call functionn to only support that the second paramter is string 
 */

function call<T extends [unknown, string, ...unknown[]], R>(
  f: (...args: T) => R,
  ...args: T
): R {
  return f(...args);
}

function fill(length: number, value: string): string[] {
  return Array.from({length}, () => value)
}

call(fill, 10, 'a');

// ts-error: Argument of type 'number' is not assignable to parameter of type 'string'.
// call(fill, 10, 1); 
/**
 * create a is function to support that:
 * - is('string', 'otherstring') // false
 * - is(true, false) // false
 * - is(42,42) // true
 * - is(10, 'foo') // compiler error
 * - is([1], [1, 2], [1, 2, 3]) // false
 */

function is<T>(a: T, ...b: [T, ...T[]]): boolean {
  return b.every(_ => _ === a);
}

is('string', 'otherstring');
is(true, false);
is(42, 42);
is([1], [1, 2], [1, 2, 3])
// is(10, 'foo'); // compiler error
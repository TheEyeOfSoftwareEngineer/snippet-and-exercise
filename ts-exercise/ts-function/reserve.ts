/**
 * function overload
 * reserve function to reserve one way trip, round trip or just destination
 */

type Reservation = unknown;

type Reserve = {
  (from: Date, to: Date, destination: string): Reservation;
  (from: Date, destination: string): Reservation;
  (destination: string): Reservation;
}

let reserve = (
  fromOrDestination: Date | string,
  toOrDestination: Date | string,
  destination?: string
) => {
  if (
    fromOrDestination instanceof Date &&
    toOrDestination instanceof Date &&
    destination !== undefined
  ) {
    // round trip
  } else if (
    fromOrDestination instanceof Date &&
    destination !== undefined
  ) {
    // one way trip
  } else if (typeof fromOrDestination === 'string') {
    // only destination
  }
}

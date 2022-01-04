import { FilterType } from '../constants.js';
import { isDateAfter } from '../utils/common.js';
import { isDateBefore } from '../utils/common.js';
import { isDateToday } from '../utils/common.js';

export const filter = {
  [FilterType.EVERYTHING]: (trips) => trips,
  [FilterType.FUTURE]: (trips) => trips.filter((trip) => isDateBefore(trip.dateFrom) || isDateToday(trip.dateFrom)),
  [FilterType.PAST]: (trips) => trips.filter((trip) => isDateAfter(trip.dateTo)),
};

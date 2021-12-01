import { isDateAfter, isDateBefore, isDateToday } from './generate-mock-data.js';

const tripToFilterMap = {
  everything: (trips) => trips,
  future: (trips) => trips.filter((trip) => isDateBefore(trip.dateFrom) || isDateToday(trip.dateFrom)),
  past: (trips) => trips.filter((trip) => isDateAfter(trip.dateTo)),
};

export const generateFilter = (trips) => Object.entries(tripToFilterMap).map(
  ([filterName, filteredTrips]) => ({
    name: filterName,
    filteredTrips: filteredTrips(trips),
  }),
);



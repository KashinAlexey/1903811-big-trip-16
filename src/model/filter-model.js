import AbstractObservable from '../utils/abstract-observable.js';
import { FilterType } from '../constants.js';
import { isDateAfter, isDateBefore, isDateToday } from './generate-mock-data.js';

const Filter = {
  [FilterType.EVERYTHING]: (trips) => trips,
  [FilterType.FUTURE]: (trips) => trips.filter((trip) => isDateBefore(trip.dateFrom) || isDateToday(trip.dateFrom)),
  [FilterType.PAST]: (trips) => trips.filter((trip) => isDateAfter(trip.dateTo)),
};

export default class FilterModel extends AbstractObservable {
  //#filter = FilterType.EVERYTHING;
  #filter = Filter.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}

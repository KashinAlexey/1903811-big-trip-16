import AbstractView from './abstract-view.js';
import { FilterType } from '../constants.js';

const NoTripsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createNoTripTemplate = (filterType) => {
  const noTripTextValue = NoTripsTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${noTripTextValue}
    </p>`
  );
};
export default class NoTripView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoTripTemplate(this.#filterType);
  }
}

import { createElement } from '../util.js';

const createNoTripTemplate = (filter) => {
  let noTripText = null;

  switch (filter) {
    case 'Everthing':
      noTripText =  'Click New Event to create your first point';
      break;
    case 'Past':
      noTripText =  'There are no past events now';
      break;
    case 'Future':
      noTripText =  'There are no future events now';
      break;
    default:
      noTripText = 'Loading...';
  }

  return `<p class="trip-events__msg">${noTripText}</p>`;
};
export default class NoTripView {
  #element = null;
  #filter = null;

  constructor(filter) {
    this.#filter = filter;
  }

  get template() {
    return createNoTripTemplate(this.#filter);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

import AbstractView from './abstract-view.js';
import { SortType } from '../constants.js';

const createSortTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.entries(SortType).map(([name, type]) => `<div
      class="trip-sort__item
      trip-sort__item--${name}">
      <input
        id="sort-${name}"
        class="trip-sort__input
        visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${name}"
        ${name === 'event' || name === 'offer'? 'disabled' : ''}
        data-sort-type="${type}"
        ${name === 'day' ? 'checked' : ''}
      />
      <label
        class="trip-sort__btn"
        for="sort-${name}">
        ${type}
      </label>
    </div>`).join('')}
  </form>`
);

export default class SortView extends AbstractView {

  get template() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('input', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}

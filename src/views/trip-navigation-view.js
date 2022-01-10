import AbstractView from './abstract-view.js';
import { MenuItem } from '../constants.js';

const createTripNavigationTemplate = (currentMenu) => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${Object.entries(MenuItem).map(([name, type]) => (`<a
      href="#"
      id="trip-controls-${name}"
      class="trip-tabs__btn
      ${currentMenu === type ? 'trip-tabs__btn--active': ''}"
      data-trip-controls-type="${type}">
      ${type}
    </a>`)).join('')}
  </nav>`
);
export default class TripNavigationView extends AbstractView {

  get template() {
    return createTripNavigationTemplate();
  }

  setMenuItem = (menuItem) => {
    const item = this.element.querySelector(`[data-trip-controls-type="${menuItem}"]`);
    item.classList.toggle('trip-tabs__btn--active');
  }

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#menuClickHandler);
  }

  #menuClickHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.tripControlsType);
  }
}

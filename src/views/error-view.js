import AbstractView from './abstract-view.js';

const createNoTripTemplate = () => (
  `<p class="trip-events__msg" style="background: #ffe7e8; border: 2px solid #e66465;">
    Can't loading data. Please reload this page later
  </p>`
);

export default class ErrorView extends AbstractView {

  get template() {
    return createNoTripTemplate();
  }
}

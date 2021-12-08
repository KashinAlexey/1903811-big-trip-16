import AbstractView from './abstract-view.js';
import { formatDate } from '../utils/common.js';
import { TRIP_TYPES } from '../constants.js';
import { OFFER_TITLE_TO_NAME } from '../constants.js';
import { DAY_TIME_FORMAT } from '../constants.js';
import { destinationsList } from '../mock/trip.js';
import { getKeyByValue } from '../utils/common.js';

const createTripEditTypeListTemplate = () =>(`
  <div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">
        Event type
      </legend>
      ${TRIP_TYPES.map((type) => `<div
        class="event__type-item">
        <input
          id="event-type-${type}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${type}"
        >
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">
          ${type.charAt(0).toUpperCase() + type.slice(1)}
        </label>
      </div>`).join('')}
    </fieldset>
  </div>`
);

const createTripEditDestinationListTemplate = () => (`
  <input
    class="event__input  event__input--destination"
    id="event-destination-1"
    type="text"
    name="event-destination"
    value=""
    list="destination-list-1"
  >

  <datalist id="destination-list-1">
    ${destinationsList.map(({name}) => `<option value="${name}"></option>`).join('')}
  </datalist>`
);

const createTripEditOfferTemplate = (offers) => (`
  <section class="event__section  event__section--offers" ${offers.length === 0 ? 'hidden' : ''}>
    <h3 class="event__section-title  event__section-title--offers">
      Offers
    </h3>
    <div class="event__available-offers">
      ${offers.map(({title, price}) => `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${getKeyByValue(OFFER_TITLE_TO_NAME, title)}-1"
        type="checkbox"
        name="event-offer-${getKeyByValue(OFFER_TITLE_TO_NAME, title)}"
        checked
      >
      <label
        class="event__offer-label"
        for="event-offer-${getKeyByValue(OFFER_TITLE_TO_NAME, title)}-1">
        <span class="event__offer-title">
          ${title}
        </span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">
          ${price}
        </span>
      </label>
    </div>`).join('')}
    </div>
  </section>`
);

const createTripEditDestinationTemplate = (destination) => {
  const {description} = destination;

  return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">
      Destination
    </h3>
    <p class="event__destination-description">
      ${description}
    </p>
  </section>`;
};

const createTripEditTemplate = (trip) => {
  const {type, dateFrom, dateTo, destination, basePrice, offers} = trip;

  const destinationTemplate = createTripEditDestinationTemplate(destination);

  const offerTemplate = createTripEditOfferTemplate(offers);

  const typeListTemplate = createTripEditTypeListTemplate();

  const destinationListTemplate = createTripEditDestinationListTemplate();

  return `<li class="trip-events__item">
    <form
      class="event event--edit"
      action="#"
      method="post">

      <header class="event__header">
        <div class="event__type-wrapper">
          <label
            class="event__type  event__type-btn"
            for="event-type-toggle-1">
            <span class="visually-hidden">
              Choose event type
            </span>
            <img
              class="event__type-icon"
              width="17"
              height="17"
              src="img/icons/${type}.png"
              alt="Event type icon">
          </label>
          <input
            class="event__type-toggle  visually-hidden"
            id="event-type-toggle-1"
            type="checkbox"
          >
          ${typeListTemplate}
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label
            class="event__label  event__type-output"
            for="event-destination-1">
            ${type}
          </label>
          ${destinationListTemplate}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label
            class="visually-hidden"
            for="event-start-time-1">
            From
          </label>
          <input
            class="event__input  event__input--time"
            id="event-start-time-1"
            type="text"
            name="event-start-time"
            value="${formatDate(dateFrom, DAY_TIME_FORMAT)}"
          >
          &mdash;
          <label
            class="visually-hidden"
            for="event-end-time-1">
            To
          </label>
          <input
            class="event__input  event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            value="${formatDate(dateTo, DAY_TIME_FORMAT)}"
          >
        </div>

        <div class="event__field-group  event__field-group--price">
          <label
            class="event__label"
            for="event-price-1">
            <span class="visually-hidden">
              Price
            </span>
            &euro;
          </label>
          <input
            class="event__input  event__input--price"
            id="event-price-1"
            type="text" name="event-price"
            value="${basePrice}"
          >
        </div>

        <button
          class="event__save-btn  btn  btn--blue"
          type="submit">
          Save
        </button>

        <button
          class="event__reset-btn"
          type="reset">
          Delete
        </button>

        <button
          class="event__rollup-btn"
          type="button">
          <span class="visually-hidden">
            Open event
          </span>
        </button>
      </header>

      <section class="event__details">
        ${offerTemplate}

        ${destinationTemplate}
    </form>
  </li>`;
};
export default class TripEditView extends AbstractView {
  #trip = null;

  constructor(trip) {
    super();
    this.#trip = trip;
  }

  get template() {
    return createTripEditTemplate(this.#trip);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
  }

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick();
  }
}

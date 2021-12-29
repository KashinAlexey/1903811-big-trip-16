import { DAY_TIME_FORMAT } from '../constants.js';
import { destinationsList } from '../mock/trip.js';
import { formatDate } from '../utils/common.js';
import flatpickr from 'flatpickr';
import { getObjectFromArray } from '../utils/common.js';
import { getKeyByValue } from '../utils/common.js';
import { OFFER_TITLE_TO_NAME } from '../constants.js';
import SmartView from './smart-view.js';
import { TRIP_TYPES } from '../constants.js';
import { typeWithOffersList } from '../mock/trip.js';
import he from 'he';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const getCheckedOffers = (trip, isNewTrip) => {
  const { offers } = getObjectFromArray(typeWithOffersList, trip.type);

  const checkedOffer = [];

  for (let i = 0; i < offers.length; i++) {
    const obj = Object.assign({},offers[i]);
    obj.isChecked = false;
    checkedOffer.push(obj);
  }

  if (!isNewTrip) {
    for (let i = 0; i < checkedOffer.length; i++) {
      for (let j = 0; j < trip.offers.length; j++) {
        if (checkedOffer[i].id === trip.offers[j].id) {
          checkedOffer[i].isChecked = true;
        }
      }
    }
  }

  return checkedOffer;
};

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

const createTripEditDestinationListTemplate = (destination) => (`
  <input
    class="event__input  event__input--destination"
    id="event-destination-1"
    type="text"
    name="event-destination"
    value="${he.encode(destination.name)}"
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
      ${offers.map(({id, title, price, isChecked}) => `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${getKeyByValue(OFFER_TITLE_TO_NAME, title)}-1"
        type="checkbox"
        name="event-offer-${getKeyByValue(OFFER_TITLE_TO_NAME, title)}"
        data-event-offer-id="${id}"
        ${isChecked ? 'checked': ''}
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

const createTripEditTimeTemplate = (dateFrom, dateTo) => (`
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
  </div>`
);

const createTripEditBasePriceTemplate = (basePrice) => (`
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
      type="number"
      min = 0
      name="event-price"
      value="${basePrice}"
    />
  </div>`
);

const createTripEditTemplate = (data) => {
  const {type, dateFrom, dateTo, destination, basePrice, offers} = data;

  const destinationTemplate = createTripEditDestinationTemplate(destination);

  const offerTemplate = createTripEditOfferTemplate(offers);

  const typeListTemplate = createTripEditTypeListTemplate();

  const destinationListTemplate = createTripEditDestinationListTemplate(destination);

  const timeTemplate = createTripEditTimeTemplate(dateFrom, dateTo);

  const basePriceTemplate = createTripEditBasePriceTemplate(basePrice);

  const isSubmitDisabled = (dateFrom > dateTo);

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

        ${timeTemplate}

        ${basePriceTemplate}

        <button
          class="event__save-btn  btn  btn--blue"
          type="submit"
          ${isSubmitDisabled ? 'disabled' : ''}>
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
      </section>
    </form>
  </li>`;
};
export default class TripEditView extends SmartView {
  #dateFromPicker = null;
  #dateToPicker = null;

  constructor(trip) {
    super();
    this._data = TripEditView.parseTaskToData(trip);
    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return createTripEditTemplate(this._data);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }

    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  }

  reset = (trip) => {
    this.updateData({...trip});
  }

  static parseTaskToData = (trip) => ({...trip,
    offers: getCheckedOffers(trip, false)}
  );

  static parseDataToTask = (data) => {
    const offers = data.offers.filter((offer) => offer.isChecked);
    offers.forEach((offer) => delete offer.isChecked);

    const trip = {...data, offers};

    return trip;
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(TripEditView.parseDataToTask(this._data));
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
    this._callback.deleteClick(TripEditView.parseDataToTask(this._data));
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list')
      .addEventListener('input', this.#typeListChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('input', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers')
      .addEventListener('input', this.#offerChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#basePriceChangeHandler);
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  #setDatepicker = () => {
    this.#dateFromPicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );
    this.#dateToPicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.dateTo,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  #dateFromChangeHandler = ([userDate]) => {
    this.updateData({
      dateFrom: userDate,
    });
  }

  #dateToChangeHandler = ([userDate]) => {
    this.updateData({
      dateTo: userDate,
    });
  }

  #typeListChangeHandler = (evt) => {
    evt.preventDefault();
    const {type, offers} = getObjectFromArray(typeWithOffersList, evt.target.value);
    this.updateData({
      type,
      offers,
    });
  }

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destination = getObjectFromArray(destinationsList, evt.target.value);
    const destinationInputElement = this.element.querySelector('.event__input--destination');

    if (destination) {
      destinationInputElement.setCustomValidity('');
      this.updateData({
        destination : {...destination}
      });
    } else {
      destinationInputElement.setCustomValidity('Choose name from list');
    }
  }

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const updatedOffer = getObjectFromArray(this._data.offers, evt.target.dataset.eventOfferId);
    updatedOffer.isChecked = !updatedOffer.isChecked;
    const offers = new Set([...this._data.offers, updatedOffer]);
    this.updateData({
      offers: [...offers],
    });
  }

  #basePriceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      basePrice: +evt.target.value,
    }, true);
  };
}

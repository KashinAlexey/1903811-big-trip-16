const OFFER_TITLES_TO_NAME =  {
  luggage: 'Add luggage',
  comfort: 'Upgrade to comfort class',
  meal: 'Add meal',
  seats: 'Choose seats',
  train: 'Travel by train',
};

const typesList = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const destinationsList = ['Amsterdam', 'Geneva', 'Chamonix'];

const getKeyByValue = (object, value) => Object.keys(object).find((key) => object[key] === value); // Утилита

const createTripAddTypeListTemplate = () =>(`
  <div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${typesList.map((type) => `
      <div class="event__type-item">
        <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
        <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
      </div>`).join('')}
    </fieldset>
  </div>`
);

const createTripAddDestinationListTemplate = () => (`
  <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationsList[0]}" list="destination-list-1">

  <datalist id="destination-list-1">
    ${destinationsList.map((name) => `<option value="${name}"></option>`).join('')}
  </datalist>`
);

const createTripAddOfferTemplate = (offers) => (`
  <section class="event__section  event__section--offers" ${offers.length === 0 ? 'hidden' : ''}>
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offers.map(({title, price}) => `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getKeyByValue(OFFER_TITLES_TO_NAME, title)}-1" type="checkbox" name="event-offer-${getKeyByValue(OFFER_TITLES_TO_NAME, title)}" checked>
      <label class="event__offer-label" for="event-offer-${getKeyByValue(OFFER_TITLES_TO_NAME, title)}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`).join('')}
    </div>
  </section>`
);

const createTripAddDestinationTemplate = (destination) => (`
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${destination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="Event photo"></img>`).join('')}
      </div>
    </div>
  </section>`
);

export const createTripAddTemplate = (trip) => {
  const {type, dateFrom, dateTo, destination, basePrice, offers} = trip;

  const destinationTemplate = createTripAddDestinationTemplate(destination);

  const offerTemplate = createTripAddOfferTemplate(offers);

  const typeListTemplate = createTripAddTypeListTemplate();

  const destinationListTemplate = createTripAddDestinationListTemplate();

  return `<!-- Форма добавления новой точки маршрута-->
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          ${typeListTemplate}
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
          </label>

          ${destinationListTemplate}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        ${offerTemplate}

        ${destinationTemplate}
      </section>
    </form>
  </li>`;
};

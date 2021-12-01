import { formatDate } from '../mock/util-mock.js';
import { DAY_FORMAT } from '../constants.js';

const updateTripInfoCost = (trips) => {
  let cost = 0;

  trips.forEach((trip) => {
    const {basePrice, offers} = trip;
    cost += basePrice;
    offers.forEach((offer) => {
      const {price} = offer;
      cost += price;
    });
  });

  return cost;
};

const updateTripInfoTitle = (trips) => {
  let title = '';

  if (trips.length > 3) {
    title = `${trips[0].destination.name} -...- ${trips[trips.length - 1].destination.name}`;
  } else {
    trips.forEach((trip) => {
      const {destination} = trip;
      const {name} = destination;
      title += `${name} -`;
    });
  }

  return title.slice(0, title.length - 1);
};

const updateTripInfoDates = (trips) => {
  let date = '';

  date = `${formatDate(trips[0].dateFrom, DAY_FORMAT)} - ${formatDate(trips[trips.length - 1].dateTo, DAY_FORMAT)}`;

  return date;
};


export const createTripInfoTemplate = (trips) => (`<!-- Блок информации -->
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">
        ${updateTripInfoTitle(trips)}
      </h1>

      <p class="trip-info__dates">
        ${updateTripInfoDates(trips)}
      </p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${updateTripInfoCost(trips)}</span>
    </p>
  </section>`
);

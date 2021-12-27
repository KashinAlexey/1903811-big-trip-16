import AbstractObservable from '../utils/abstract-observable.js';
import { DAY_FORMAT } from '../constants.js';
import { formatDate } from '../utils/common.js';

const Calculation = {
  TITLE: null,
  DATES: null,
  COST: null
};

export default class CalculationModel extends AbstractObservable {
  #calculation = null;

  set calculation(calculation) {
    this.#calculation = Calculation; // TODO
  }

  get calculation() {
    return this.#calculation;
  }

  calculate = (updateType, data) => {
    this.#calculation.TITLE = this.#updateTripInfoTitle(data);
    this.#calculation.DATES = this.#updateTripInfoDates(data);
    this.#calculation.COST = this.#updateTripInfoCost(data);
    this._notify(updateType, data);
  }

  #updateTripInfoCost = (trips) => {
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

  #updateTripInfoTitle = (trips) => {
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

  #updateTripInfoDates = (trips) => {
    let date = '';

    date = `${formatDate(trips[0].dateFrom, DAY_FORMAT)} - ${formatDate(trips[trips.length - 1].dateTo, DAY_FORMAT)}`;

    return date;
  };
}

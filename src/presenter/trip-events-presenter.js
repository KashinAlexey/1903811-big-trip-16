import NoTripView from '../views/no-trip-view.js';
import { RenderPosition } from '../constants.js';
import { render } from '../utils/render.js';
import SortView from '../views/sort-view.js';
import { SortType } from '../constants.js';
import { sortNumber } from '../utils/common.js';
import { sortDate } from '../utils/common.js';
import { sortDuration } from '../utils/common.js';
import TripListView from '../views/trip-list-view';
import TripItemPresenter from './trip-item-presenter.js';
import { TRIP_COUNT } from '../constants.js';
import { updateItem } from '../utils/common.js';
export default class TripEventsPresenter {
  #tripEventsElement = null;

  #tripEventsList = new TripListView();
  #sortComponent = new SortView();

  #trips = [];
  #tripItemPresenters = new Map();

  #currentSortType = SortType.day;
  #sourcedTrips = [];

  constructor (tripEventsElement) {
    this.#tripEventsElement = tripEventsElement;
  }

  init = (trips) => {
    this.#trips = [...trips];
    this.#sourcedTrips = [...trips];

    if (this.#trips.length === 0) {
      this.#renderNoTrip();
    } else {
      this.#renderTripSort();
    }
  }

  #renderTripSort = () => {
    render(this.#tripEventsElement, this.#sortComponent, RenderPosition.AFTERBEGIN);
    this.#handlerTripSortChange();
    this.#sortComponent.setSortTypeChangeHandler(this.#handlerTripSortChange);
  }

  #renderTripList = () => {
    render(this.#tripEventsElement, this.#tripEventsList, RenderPosition.BEFOREEND);
    for (let i = 0; i < TRIP_COUNT; i++) {
      this.#renderTripItem(this.#trips[i]);
    }
  }

  #renderNoTrip = () => {
    render(this.#tripEventsElement, new NoTripView('Everthing'), RenderPosition.BEFOREEND);
  }

  #renderTripItem = (trip) => {
    const tripItemPresenter = new TripItemPresenter(this.#tripEventsList, this.#handleTripModeChange, this.#handleTripChange);
    tripItemPresenter.init(trip);
    this.#tripItemPresenters.set(trip.id, tripItemPresenter);
  }

  #renderAddTripItem = () => {}

  #destroyTripSort = () => {}

  #clearTripList = () => {
    this.#tripItemPresenters.forEach((presenter) => presenter.destroy());
    this.#tripItemPresenters.clear();
  }

  #sortTrips = (sortType) => {
    switch (sortType) {
      case SortType.price:
        this.#trips.sort((tripA, tripB) => sortNumber(tripA.basePrice, tripB.basePrice, 'Up'));
        break;
      case SortType.time:
        this.#trips.sort((tripA, tripB) => sortDuration(tripA.dateFrom, tripA.dateTo, tripB.dateFrom, tripB.dateTo, 'Up'));
        break;
      default:
        this.#trips.sort((tripA, tripB) => sortDate(tripA.dateFrom, tripB.dateFrom, 'Up'));
    }

    this.#currentSortType = sortType || 'Day';
  }

  #handlerTripSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTrips(sortType);
    this.#clearTripList();
    this.#renderTripList();
  }

  #handleTripModeChange = () => {
    this.#tripItemPresenters.forEach((presenter) => presenter.resetTripView());
  }

  #handleTripChange = (updatedTrip) => {
    this.#trips = updateItem(this.#trips, updatedTrip);
    this.#sourcedTrips = updateItem(this.#sourcedTrips, updatedTrip);
    this.#tripItemPresenters.get(updatedTrip.id).init(updatedTrip);
  }

  #handleEscKeyDown = () => {}

  #handleAddTripSaveClick = () => {}

  #handleAddTripCancelClick = () => {}

  #handleValidateUserInput = () => {}
}

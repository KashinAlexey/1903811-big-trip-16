import { RenderPosition } from '../constants.js';
import { render } from '../utils/render.js';
import NoTripView from '../views/no-trip-view.js';
import SortView from '../views/sort-view.js';
import TripListView from '../views/trip-list-view';
import { TRIP_COUNT } from '../constants.js';
import { updateItem } from '../utils/common.js';
import TripItemPresenter from './trip-item-presenter.js';
export default class TripEventsPresenter {
  #tripEventsElement = null;

  #tripEventsList = new TripListView();

  #trips = [];
  #tripItemPresenters = new Map();

  constructor (tripEventsElement) {
    this.#tripEventsElement = tripEventsElement;
  }

  init = (trips) => {
    this.#trips = [...trips];

    if (this.#trips.length === 0) {
      this.#renderNoTrip();
    } else {
      this.#renderTripSort();
      this.#renderTripList();
    }
  }

  #renderTripSort = () => {
    render(this.#tripEventsElement, new SortView(), RenderPosition.AFTERBEGIN);
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

  #destroyTripList = () => {}

  #handlerTripSortChange = () => {}

  #handleTripModeChange = () => {
    this.#tripItemPresenters.forEach((presenter) => presenter.resetTripView());
  }

  #handleTripChange = (updatedTrip) => {
    this.#trips = updateItem(this.#trips, updatedTrip);
    this.#tripItemPresenters.get(updatedTrip.id).init(updatedTrip);
  }

  #handleEscKeyDown = () => {}

  #handleAddTripSaveClick = () => {}

  #handleAddTripCancelClick = () => {}

  #handleValidateUserInput = () => {}
}

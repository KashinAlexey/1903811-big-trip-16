import { RenderPosition } from '../constants.js';
import { render } from '../utils/render.js';
import NoTripView from '../views/no-trip-view.js';
import SortView from '../views/sort-view.js';
import TripListView from '../views/trip-list-view';
import { TRIP_COUNT } from '../constants.js';
import TripItemPresenter from './trip-item-presenter.js';
export default class TripEventsPresenter {

  #tripEventsElement = null;

  tripEventsList = new TripListView();

  #tripItemPresenters = new Map();

  constructor (tripEventsElement) {
    this.#tripEventsElement = tripEventsElement;
  }

  init = (trips) => {
    if (trips.length === 0) {
      this.renderNoTrip();
    } else {
      this.renderTripSort();
      this.renderTripList(trips);
    }
  }

  renderTripSort = () => {
    render(this.#tripEventsElement, new SortView(), RenderPosition.AFTERBEGIN);
  }

  renderTripList = (trips) => {
    render(this.#tripEventsElement, this.tripEventsList, RenderPosition.BEFOREEND);
    for (let i = 0; i < TRIP_COUNT; i++) {
      this.renderTripItem(trips[i]);
    }
  }

  renderNoTrip = () => {
    render(this.#tripEventsElement, new NoTripView('Everthing'), RenderPosition.BEFOREEND);
  }

  renderTripItem = (trip) => {
    const tripItemPresenter = new TripItemPresenter(this.tripEventsList, this.handleTripModeChange);
    tripItemPresenter.init(trip);
    this.#tripItemPresenters.set(trip.id, tripItemPresenter);
  }

  renderAddTripItem = () => {}

  destroyTripSort = () => {}

  destroyTripList = () => {}

  handlerTripSortChange = () => {}

  handleTripModeChange = () => {
    this.#tripItemPresenters.forEach((presenter) => presenter.resetView());
  }

  escKeyDownHandler = () => {}

  handleAddTripSaveClick = () => {}

  handleAddTripCancelClick = () => {}

  validateUserInput = () => {}
}

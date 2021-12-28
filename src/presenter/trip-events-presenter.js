import NoTripView from '../views/no-trip-view.js';
import { RenderPosition } from '../constants.js';
import { remove, render } from '../utils/render.js';
import SortView from '../views/sort-view.js';
import { SortType } from '../constants.js';
import { sortNumber } from '../utils/common.js';
import { sortDate } from '../utils/common.js';
import { sortDuration } from '../utils/common.js';
import TripListView from '../views/trip-list-view';
import TripItemPresenter from './trip-item-presenter.js';
import { UserAction } from '../constants.js';
import { UpdateType } from '../constants.js';
import { filter } from '../utils/filter.js';
import { FilterType } from '../constants.js';
export default class TripEventsPresenter {
  #tripEventsElement = null;
  #tripsModel = null;
  #filterModel = null;

  #tripEventsListComponent = null;
  #sortComponent = null;
  #noTripComponent = null;

  #tripItemPresenters = new Map();

  #currentSortType = SortType.day;
  #filterType = FilterType.EVERYTHING;

  constructor (tripsModel, filterModel, tripEventsElement) {
    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;
    this.#tripEventsElement = tripEventsElement;
  }

  get trips(){
    this.#filterType = this.#filterModel.filter;
    const trips = this.#tripsModel.data;
    const filteredTrips = filter[this.#filterType](trips);

    switch (this.#currentSortType) {
      case SortType.price:
        trips.sort((tripA, tripB) => sortNumber(tripA.basePrice, tripB.basePrice, 'Up'));
        break;
      case SortType.time:
        trips.sort((tripA, tripB) => sortDuration(tripA.dateFrom, tripA.dateTo, tripB.dateFrom, tripB.dateTo, 'Up'));
        break;
      default:
        trips.sort((tripA, tripB) => sortDate(tripA.dateFrom, tripB.dateFrom, 'Up'));
    }

    return filteredTrips;
  }

  init = () => {
    this.#tripsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#renderTripEvents();
  }

  #renderTripEvents = () => {
    const trips = this.trips;
    const tripCount = trips.length;
    this.#tripEventsListComponent = new TripListView();

    render(this.#tripEventsElement, this.#tripEventsListComponent, RenderPosition.BEFOREEND);

    if (tripCount === 0) {
      this.#renderNoTrip();
      return;
    }

    this.#renderTripSort();
    this.#renderTripList(trips);
  }

  #clearTripEvents = ({resetSortType = false} = {}) => {
    this.#clearTripList();

    remove(this.#sortComponent);

    if (this.#noTripComponent) {
      remove(this.#noTripComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.day;
    }
  }

  #renderTripList = (trips) => {
    trips.forEach((trip) => this.#renderTripItem(trip));
  }

  #clearTripList = () => {
    this.#tripItemPresenters.forEach((presenter) => presenter.destroy());
    this.#tripItemPresenters.clear();
  }

  #renderNoTrip = () => {
    this.#noTripComponent = new NoTripView(this.#filterType);
    render(this.#tripEventsElement, this.#noTripComponent, RenderPosition.BEFOREEND);
  }

  #renderTripItem = (trip) => {
    const tripItemPresenter = new TripItemPresenter(this.#tripEventsListComponent, this.#handleTripModeChange, this.#handleViewAction);
    tripItemPresenter.init(trip);
    this.#tripItemPresenters.set(trip.id, tripItemPresenter);
  }

  #renderAddTripItem = () => {}

  #destroyTripSort = () => {}

  #renderTripSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handlerTripSortChange);
    render(this.#tripEventsElement, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #handlerTripSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTripEvents();
    this.#renderTripEvents();
  }

  #handleTripModeChange = () => {
    this.#tripItemPresenters.forEach((presenter) => presenter.resetTripView());
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_DATA:
        this.#tripsModel.updateData(updateType, update);
        break;
      case UserAction.ADD_DATA:
        this.#tripsModel.addData(updateType, update);
        break;
      case UserAction.DELETE_DATA:
        this.#tripsModel.deleteData(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripItemPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripEvents();
        this.#renderTripEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearTripEvents({resetSortType: true});
        this.#renderTripEvents();
        break;
    }
  }
}

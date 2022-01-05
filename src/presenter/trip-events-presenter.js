import ErrorView from '../views/error-view.js';
import { filter } from '../utils/filter.js';
import { FilterType } from '../constants.js';
import LoadingView from '../views/loading-view.js';
import { LoadingType } from '../constants.js';
import { Mode } from '../constants.js';
import NoTripView from '../views/no-trip-view.js';
import { RenderPosition } from '../constants.js';
import { remove, render } from '../utils/render.js';
import { State as TripPresenterViewState } from './trip-item-presenter.js';
import SortView from '../views/sort-view.js';
import { SortType } from '../constants.js';
import { sortNumber } from '../utils/common.js';
import { sortDate } from '../utils/common.js';
import { sortDuration } from '../utils/common.js';
import TripListView from '../views/trip-list-view';
import TripItemPresenter from './trip-item-presenter.js';
import TripItemAddPresenter from './trip-item-add-presenter.js';
import { UserAction } from '../constants.js';
import { UpdateType } from '../constants.js';
export default class TripEventsPresenter {
  #tripEventsElement = null;
  #tripsModel = null;
  #filterModel = null;

  #tripEventsListComponent = new TripListView();
  #sortComponent = null;
  #noTripComponent = null;
  #loadingComponent = null;

  #tripItemPresenters = new Map();
  #tripNewPresenter = null;

  #currentSortType = SortType.day;
  #filterType = FilterType.EVERYTHING;

  #updateTripInfo = null;
  #mode = Mode.DEFAULT;
  #loadingType = null;

  constructor (tripsModel, filterModel, tripEventsElement) {
    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;
    this.#tripEventsElement = tripEventsElement;

    this.#tripNewPresenter = new TripItemAddPresenter(this.#tripEventsListComponent, this.#handleViewAction);
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

  init = (callBack, loadyngType) => {
    this.#loadingType = loadyngType;
    this.#tripsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#updateTripInfo = callBack;
    this.#renderTripEvents();
  }

  destroy = () => {
    this.#clearTripEvents({resetSortType: false});
    remove(this.#tripEventsListComponent);
    this.#tripsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  createTrip = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#mode = Mode.EDITING;
      this.#filterType = FilterType.EVERYTHING;
      this.#filterModel.setFilter(UpdateType.MAJOR, this.#filterType);
      this.#tripNewPresenter.init(this.#tripsModel.getDestinations(), this.#tripsModel.getOffers(), () => {this.#mode = Mode.DEFAULT;});
    } else {
      this.#tripNewPresenter.destroy();
      this.#mode = Mode.DEFAULT;
    }
  }

  #renderTripEvents = () => {
    if (this.#loadingType === LoadingType.LOADING) {
      this.#renderLoading();
      return;
    } else if (this.#loadingType === LoadingType.ERROR) {
      remove(this.#loadingComponent);
      this.#renderError();
      return;
    } else {
      remove(this.#loadingComponent);
    }

    const trips = this.trips;
    const tripCount = trips.length;

    this.#updateTripInfo(tripCount);

    if (tripCount === 0) {
      this.#renderNoTrip();
      return;
    }

    this.#renderTripSort();
    this.#renderTripList(trips);
  }

  #clearTripEvents = ({resetSortType = false} = {}) => {
    this.#tripNewPresenter.destroy();
    this.#clearTripList();

    remove(this.#sortComponent);
    remove(this.#tripEventsListComponent);

    if (this.#noTripComponent) {
      remove(this.#noTripComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.day;
    }
  }

  #renderTripSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handlerTripSortChange);
    render(this.#tripEventsElement, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderTripList = (trips) => {
    render(this.#tripEventsElement, this.#tripEventsListComponent, RenderPosition.BEFOREEND);
    trips.forEach((trip) => this.#renderTripItem(trip));
  }

  #clearTripList = () => {
    this.#tripItemPresenters.forEach((presenter) => presenter.destroy());
    this.#tripItemPresenters.clear();
  }

  #renderNoTrip = () => {
    render(this.#tripEventsElement, this.#tripEventsListComponent, RenderPosition.BEFOREEND);

    this.#noTripComponent = new NoTripView(this.#filterType);
    render(this.#tripEventsElement, this.#noTripComponent, RenderPosition.BEFOREEND);
  }

  #renderLoading = () => {
    render(this.#tripEventsElement, this.#tripEventsListComponent, RenderPosition.BEFOREEND);
    this.#loadingComponent = new LoadingView();
    render(this.#tripEventsElement, this.#loadingComponent, RenderPosition.BEFOREEND);
  }

  #renderError = () => {
    render(this.#tripEventsElement, this.#tripEventsListComponent, RenderPosition.BEFOREEND);
    this.#loadingComponent = new ErrorView();
    render(this.#tripEventsElement, this.#loadingComponent, RenderPosition.BEFOREEND);
  }

  #renderTripItem = (trip) => {
    const tripItemPresenter = new TripItemPresenter(this.#tripEventsListComponent, this.#handleTripModeChange, this.#handleViewAction);
    tripItemPresenter.init(trip, this.#tripsModel.getDestinations(), this.#tripsModel.getOffers());
    this.#tripItemPresenters.set(trip.id, tripItemPresenter);
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
    this.#tripNewPresenter.destroy();
    this.#tripItemPresenters.forEach((presenter) => presenter.resetTripView());
  }

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_DATA:
        this.#tripItemPresenters.get(update.id).setViewState(TripPresenterViewState.SAVING);
        try {
          await this.#tripsModel.updateData(updateType, update);
        } catch(err) {
          this.#tripItemPresenters.get(update.id).setViewState(TripPresenterViewState.ABORTING);
        }
        break;
      case UserAction.ADD_DATA:
        this.#tripNewPresenter.setSaving();
        try {
          await this.#tripsModel.addData(updateType, update);
        } catch(err) {
          this.#tripNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_DATA:
        this.#tripItemPresenters.get(update.id).setViewState(TripPresenterViewState.DELETING);
        try {
          await this.#tripsModel.deleteData(updateType, update);
        } catch(err) {
          this.#tripItemPresenters.get(update.id).setViewState(TripPresenterViewState.ABORTING);
        }
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripItemPresenters.get(data.id).init(data, this.#tripsModel.getDestinations(), this.#tripsModel.getOffers());
        this.#updateTripInfo();
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

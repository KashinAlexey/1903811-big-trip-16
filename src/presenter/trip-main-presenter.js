import { RenderPosition } from '../constants.js';
import { render } from '../utils/render.js';
import TripNavigationView from '../views/navigation-view.js';
import TripInfoView from '../views/trip-info-view.js';
import FilterPresenter from './filter-presenter.js';
export default class TripMainPresenter {
  #trips = [];
  #tripsModel = null;
  #filterModel = null;
  #tripMainElement = null;
  #tripNavigationElement = null;
  #tripFiltersElement = null;

  constructor(tripsModel, filterModel, tripMainElement, tripNavigationElement, tripFiltersElement) {
    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;
    this.#tripMainElement = tripMainElement;
    this.#tripNavigationElement = tripNavigationElement;
    this.#tripFiltersElement = tripFiltersElement;
  }

  get trips(){
    const trips = this.#tripsModel.data;
    return trips;
  }

  init = () => {
    this.#trips = [...this.trips];
    this.renderTripControls();
    if (this.#trips.length !== 0) {
      this.renderTripInfo(this.#trips);
    }
  }

  renderTripInfo = (trips) => {
    render(this.#tripMainElement, new TripInfoView(trips), RenderPosition.AFTERBEGIN);
  }

  renderTripControls = () => {
    this.renderNavigation();
    this.renderFilters();
  }

  renderEventAddBtn = () => {}

  renderNavigation = () => {
    render(this.#tripNavigationElement, new TripNavigationView(), RenderPosition.BEFOREEND);
  }

  renderFilters = () => {
    const filterPresenter = new FilterPresenter(this.#tripFiltersElement, this.#filterModel, this.#tripsModel);
    filterPresenter.init();
  }
}

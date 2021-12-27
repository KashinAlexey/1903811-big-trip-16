import { RenderPosition } from '../constants.js';
import { render } from '../utils/render.js';
import TripNavigationView from '../views/navigation-view.js';
import TripInfoView from '../views/trip-info-view.js';
import FilterView from '../views/filter-view.js';
export default class TripMainPresenter {
  #trips = [];
  #tripsModel = null;

  #tripMainElement = null;
  #tripNavigationElement = null;
  #tripFiltersElement = null;

  constructor(tripsModel, tripMainElement, tripNavigationElement, tripFiltersElement) {
    this.#tripsModel = tripsModel;
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
    render(this.#tripFiltersElement, new FilterView(), RenderPosition.BEFOREEND);
  }

  destroyFilters = () => {}

  handleEventAddBtnClick = () => {}

  handleNavigationChange = () => {}

  handleFilterChange = () => {}

  updateTripInfoTitle = () => {}

  updateTripInfoDates = () => {}

  updateTripInfoCost = () => {}
}

import { RenderPosition } from '../constants.js';
import { render } from '../utils/render.js';
import TripNavigationView from '../views/navigation-view.js';
import TripInfoView from '../views/trip-info-view.js';
import FilterView from '../views/filter-view.js';
export default class TripMainPresenter {

  #tripMainElement = null;
  #tripNavigationElement = null;
  #tripFiltersElement = null;

  constructor(tripMainElement, tripNavigationElement, tripFiltersElement) {
    this.#tripMainElement = tripMainElement;
    this.#tripNavigationElement = tripNavigationElement;
    this.#tripFiltersElement = tripFiltersElement;
  }

  init = (trips) => {
    this.renderTripControls();
    if (trips.length !== 0) {
      this.renderTripInfo(trips);
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

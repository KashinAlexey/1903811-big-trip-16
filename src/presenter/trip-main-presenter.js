import FilterPresenter from './filter-presenter.js';
import { MenuItem } from '../constants.js';
import { RenderPosition } from '../constants.js';
import { remove } from '../utils/render.js';
import { render } from '../utils/render.js';
import TripNavigationView from '../views/navigation-view.js';
import TripInfoView from '../views/trip-info-view.js';
export default class TripMainPresenter {
  #tripsModel = null;
  #filterModel = null;

  #tripMainContainer = null;
  #tripNavigationContainer = null;
  #tripFiltersContainer = null;
  #tripEventAddBtnContainer = null;

  #tripNavigationComponent = null;
  #tripInfoComponent = null;
  #tripEventsPresenter = null;
  #statisticPresenter = null;
  #filterPresenter = null;

  #currentMenu = MenuItem.TABLE;

  constructor(tripsModel, filterModel, tripMainElement, tripNavigationElement, tripFiltersElement, tripEventAddBtn) {
    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;
    this.#tripMainContainer = tripMainElement;
    this.#tripNavigationContainer = tripNavigationElement;
    this.#tripFiltersContainer = tripFiltersElement;
    this.#tripEventAddBtnContainer = tripEventAddBtn;
  }

  get trips(){
    const trips = this.#tripsModel.data;
    return trips;
  }

  init = (tripEventsPresenter, statisticPresenter) => {
    this.#tripEventsPresenter = tripEventsPresenter;
    this.#statisticPresenter = statisticPresenter;

    this.renderTripControls();

    this.#tripsModel.init().finally(() => {
      this.#tripEventsPresenter.init(this.renderTripInfo);
    }
    );
  }

  renderTripInfo = (tripCount) => {
    if (this.#tripInfoComponent) {
      remove(this.#tripInfoComponent);
    }

    if (tripCount !== 0) {
      this.#tripInfoComponent = new TripInfoView(this.trips);
      render(this.#tripMainContainer, this.#tripInfoComponent, RenderPosition.AFTERBEGIN);
    }
  }

  #handleSiteMenuClick = (menuItem) => {
    const markMenuItem = () => {
      this.#tripNavigationComponent.setMenuItem(MenuItem.TABLE);
      this.#tripNavigationComponent.setMenuItem(MenuItem.STATS);
    };

    if (this.#currentMenu === menuItem) {
      return;
    }

    switch (menuItem) {
      case MenuItem.TABLE:
        this.#filterPresenter.init();
        this.#tripEventsPresenter.init(this.renderTripInfo);
        this.#statisticPresenter.destroy();
        markMenuItem();
        break;
      case MenuItem.STATS:
        this.#filterPresenter.destroy();
        this.#tripEventsPresenter.destroy();
        this.#statisticPresenter.init();
        markMenuItem();
        break;
    }

    this.#currentMenu = menuItem;
  };

  renderTripControls = () => {
    this.renderNavigation();
    this.renderFilters();
    this.renderEventAddBtn();
  }

  renderEventAddBtn = () => {
    this.#tripEventAddBtnContainer.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#tripEventsPresenter.createTrip();
    });
  };

  renderNavigation = () => {
    this.#tripNavigationComponent = new TripNavigationView();

    render(this.#tripNavigationContainer, this.#tripNavigationComponent, RenderPosition.BEFOREEND);

    this.#tripNavigationComponent.setMenuClickHandler(this.#handleSiteMenuClick);

    this.#tripNavigationComponent.setMenuItem(this.#currentMenu);
  }

  renderFilters = () => {
    this.#filterPresenter = new FilterPresenter(this.#tripFiltersContainer, this.#filterModel, this.#tripsModel);
    this.#filterPresenter.init();
  }
}

import TripMainPresenter from '../presenter/trip-main-presenter.js';
import TripEventsPresenter from '../presenter/trip-events-presenter.js';
import StatisticPresenter from '../presenter/statistic-presenter.js';

export default class MainPresenter {

  #tripMainElement = null;
  #tripNavigationElement = null;
  #tripFiltersElement = null;
  #tripEventsElement = null;

  constructor(tripMainElement, tripNavigationElement, tripFiltersElement, tripEventsElement) {
    this.#tripMainElement = tripMainElement;
    this.#tripNavigationElement = tripNavigationElement;
    this.#tripFiltersElement = tripFiltersElement;
    this.#tripEventsElement = tripEventsElement;
  }

  init = (trips) => {
    const tripMainPresenter = new TripMainPresenter(this.#tripMainElement, this.#tripNavigationElement, this.#tripFiltersElement);
    const tripEventsPresenter = new TripEventsPresenter(this.#tripEventsElement);
    const statisticPresenter = new StatisticPresenter();

    tripMainPresenter.init(trips);
    tripEventsPresenter.init(trips);
    statisticPresenter.init();
  }

  renderTripMain = () => {}

  renderTripEvents = () => {}

  renderStatistic= () => {}

  destroyTripEvents = () => {}

  destroyStatistic = () => {}
}

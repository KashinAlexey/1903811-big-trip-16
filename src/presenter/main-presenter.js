import StatisticPresenter from '../presenter/statistic-presenter.js';
import TripMainPresenter from '../presenter/trip-main-presenter.js';
import TripEventsPresenter from '../presenter/trip-events-presenter.js';
export default class MainPresenter {
  #tripsModel = null;

  #siteHeaderElement = document.querySelector('.page-header');
  #siteMainElement = document.querySelector('.page-main');
  #tripMainElement = this.#siteHeaderElement.querySelector('.trip-main');
  #tripNavigationElement = this.#tripMainElement.querySelector('.trip-controls__navigation');
  #tripFiltersElement = this.#tripMainElement.querySelector('.trip-controls__filters');
  #tripEventsElement = this.#siteMainElement.querySelector('.trip-events');

  tripMainPresenter = null;
  tripEventsPresenter = null;
  statisticPresenter = null;

  constructor(dataModel){
    this.#tripsModel = dataModel;

    this.tripMainPresenter = new TripMainPresenter(this.#tripsModel, this.#tripMainElement, this.#tripNavigationElement, this.#tripFiltersElement);
    this.tripEventsPresenter = new TripEventsPresenter(this.#tripsModel, this.#tripEventsElement);
    this.statisticPresenter = new StatisticPresenter();
  }

  init = () => {
    this.tripMainPresenter.init();
    this.tripEventsPresenter.init();
    this.statisticPresenter.init();
  }

  // renderTripMain = () => {}

  // #renderTripEvents = () => {}

  // renderStatistic= () => {}

  // destroyTripEvents = () => {}

  // destroyStatistic = () => {}
}

import { generateTrip } from '../mock/trip.js';
import StatisticPresenter from '../presenter/statistic-presenter.js';
import TripMainPresenter from '../presenter/trip-main-presenter.js';
import TripEventsPresenter from '../presenter/trip-events-presenter.js';
import { TRIP_COUNT } from '../constants.js';
export default class MainPresenter {

  #trips = null;

  #siteHeaderElement = document.querySelector('.page-header');
  #siteMainElement = document.querySelector('.page-main');
  #tripMainElement = this.#siteHeaderElement.querySelector('.trip-main');
  #tripNavigationElement = this.#tripMainElement.querySelector('.trip-controls__navigation');
  #tripFiltersElement = this.#tripMainElement.querySelector('.trip-controls__filters');
  #tripEventsElement = this.#siteMainElement.querySelector('.trip-events');

  tripMainPresenter = new TripMainPresenter(this.#tripMainElement, this.#tripNavigationElement, this.#tripFiltersElement);
  tripEventsPresenter = new TripEventsPresenter(this.#tripEventsElement);
  statisticPresenter = new StatisticPresenter();

  init = () => {
    this.#trips = this.getData();

    this.tripMainPresenter.init(this.#trips);
    this.tripEventsPresenter.init(this.#trips);
    this.statisticPresenter.init();
  }

  renderTripMain = () => {}

  renderTripEvents = () => {}

  renderStatistic= () => {}

  destroyTripEvents = () => {}

  destroyStatistic = () => {}

  getData = () => Array.from({length: TRIP_COUNT}, generateTrip);
}

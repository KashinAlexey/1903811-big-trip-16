import StatisticPresenter from '../presenter/statistic-presenter.js';
import TripMainPresenter from '../presenter/trip-main-presenter.js';
import TripEventsPresenter from '../presenter/trip-events-presenter.js';
export default class MainPresenter {
  #tripsModel = null;
  #filterModel = null;

  #siteHeaderElement = document.querySelector('.page-header');
  #siteMainElement = document.querySelector('.page-main');
  #tripMainElement = this.#siteHeaderElement.querySelector('.trip-main');
  #tripNavigationElement = this.#tripMainElement.querySelector('.trip-controls__navigation');
  #tripFiltersElement = this.#tripMainElement.querySelector('.trip-controls__filters');
  #tripEventsElement = this.#siteMainElement.querySelector('.trip-events');
  #tripEventAddBtn = this.#tripMainElement.querySelector('.trip-main__event-add-btn');

  tripMainPresenter = null;
  tripEventsPresenter = null;
  statisticPresenter = null;

  constructor(dataModel, filterModel){
    this.#tripsModel = dataModel;
    this.#filterModel = filterModel;

    this.tripMainPresenter = new TripMainPresenter(this.#tripsModel, this.#filterModel, this.#tripMainElement, this.#tripNavigationElement, this.#tripFiltersElement);
    this.tripEventsPresenter = new TripEventsPresenter(this.#tripsModel, this.#filterModel, this.#tripEventsElement);
    this.statisticPresenter = new StatisticPresenter();
  }

  init = () => {
    this.tripMainPresenter.init();
    this.tripEventsPresenter.init();
    this.statisticPresenter.init();

    this.#tripEventAddBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.tripEventsPresenter.createTrip();
    });
  }

  // renderTripMain = () => {}

  // #renderTripEvents = () => {}

  // renderStatistic= () => {}

  // destroyTripEvents = () => {}

  // destroyStatistic = () => {}
}

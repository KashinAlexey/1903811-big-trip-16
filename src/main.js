import ApiService from './api-service.js';
import { AUTHORIZATION } from './constants.js';
import DataModel from './model/data-model.js';
import { END_POINT } from './constants.js';
import FilterModel from './model/filter-model.js';
import StatisticPresenter from './presenter/statistic-presenter.js';
import TripMainPresenter from './presenter/trip-main-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';

const tripsModel = new DataModel(new ApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const tripEventAddBtn = tripMainElement.querySelector('.trip-main__event-add-btn');

const tripMainPresenter = new TripMainPresenter(tripsModel, filterModel, tripMainElement, tripNavigationElement, tripFiltersElement, tripEventAddBtn);
const tripEventsPresenter = new TripEventsPresenter(tripsModel, filterModel, tripEventsElement);
const statisticPresenter = new StatisticPresenter(tripsModel, siteMainElement);

tripMainPresenter.init(tripEventsPresenter, statisticPresenter);

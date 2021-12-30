import { generateTrip } from '../src/mock/trip.js';
import { TRIP_COUNT } from './constants.js';
import DataModel from './model/data-model.js';
import FilterModel from './model/filter-model.js';
import StatisticPresenter from './presenter/statistic-presenter.js';
import TripMainPresenter from './presenter/trip-main-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';

const trips = Array.from({length: TRIP_COUNT}, generateTrip);

const tripsModel = new DataModel();
tripsModel.data = trips;

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

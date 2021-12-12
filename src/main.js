import { TRIP_COUNT } from './constants.js';
//import TripAddView from './views/trip-add-view.js';
import { generateTrip } from './mock/trip.js';
import MainPresenter from './presenter/main-presenter.js';
//import { generateFilter } from './mock/filter.js';

const trips = Array.from({length: TRIP_COUNT}, generateTrip);

//const filters = generateFilter(trips);

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const mainPresenter = new MainPresenter(tripMainElement, tripNavigationElement, tripFiltersElement, tripEventsElement);
mainPresenter.init(trips);

import { RenderPosition, TRIP_COUNT } from './constants.js';
import { render } from './util.js';
import TripNavigationView from './views/navigation-view.js';
import FilterView from './views/filter-view.js';
import SortView from './views/sort-view.js';
import TripListView from './views/trip-list-view.js';
import NoTripView from './views/no-trip-view.js';
import TripView from './views/trip-view.js';
import TripAddView from './views/trip-add-view.js';
import TripEditView from './views/trip-edit-view.js';
import TripInfoView from './views/trip-info-view.js';
import { generateTrip } from './mock/trip.js';
//import { generateFilter } from './mock/filter.js';

const trips = Array.from({length: TRIP_COUNT}, generateTrip);

//const filters = generateFilter(trips);

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(tripNavigationElement, new TripNavigationView().element, RenderPosition.BEFOREEND);

render(tripFiltersElement, new FilterView().element, RenderPosition.BEFOREEND);

if (trips.length === 0) {
  render(tripEventsElement, new NoTripView('Everthing').element, RenderPosition.BEFOREEND);
} else {
  render(tripMainElement, new TripInfoView(trips).element, RenderPosition.AFTERBEGIN);

  render(tripEventsElement, new SortView().element, RenderPosition.BEFOREEND);

  render(tripEventsElement, new TripListView().element, RenderPosition.BEFOREEND);

  const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

  render(tripEventsListElement, new TripAddView(trips[0]).element, RenderPosition.BEFOREEND);

  render(tripEventsListElement, new TripEditView(trips[1]).element, RenderPosition.BEFOREEND);

  for (let i = 2; i < TRIP_COUNT; i++) {
    render(tripEventsListElement, new TripView(trips[i]).element, RenderPosition.BEFOREEND);

  }
}

import { RenderPosition, TRIP_COUNT } from './constants.js';
import { render } from './util.js';
import TripNavigationView from './views/navigation-view.js';
import FilterView from './views/filter-view.js';
import SortView from './views/sort-view.js';
import TripListView from './views/trip-list-view.js';
import NoTripView from './views/no-trip-view.js';
import TripView from './views/trip-view.js';
//import TripAddView from './views/trip-add-view.js';
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

const renderTrip = (tripListElement, trip) => {
  const tripComponent = new TripView(trip);
  const tripEditComponent = new TripEditView(trip);

  const replaceTripToForm = () => {
    tripListElement.replaceChild(tripEditComponent.element, tripComponent.element);
  };

  const replaceFormToTrip = () => {
    tripListElement.replaceChild(tripComponent.element, tripEditComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToTrip();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  tripComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceTripToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  tripEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToTrip();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  tripEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToTrip();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  tripEditComponent.element.querySelector('.event__reset-btn').addEventListener('click', () => {
    // onClickDeleteEditBtn
  });

  render(tripListElement, tripComponent.element, RenderPosition.BEFOREEND);
};

render(tripEventsElement, new TripListView().element, RenderPosition.BEFOREEND);

const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

if (trips.length === 0) {
  render(tripEventsElement, new NoTripView('Everthing').element, RenderPosition.BEFOREEND);

  tripMainElement.querySelector('.trip-main__event-add-btn').addEventListener('click', () => {
    // onClickNewTripBtn
  });
} else {
  render(tripMainElement, new TripInfoView(trips).element, RenderPosition.AFTERBEGIN);

  render(tripEventsElement, new SortView().element, RenderPosition.AFTERBEGIN);

  for (let i = 0; i < TRIP_COUNT; i++) {
    renderTrip(tripEventsListElement, trips[i]);
  }
}

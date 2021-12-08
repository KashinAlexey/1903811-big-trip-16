import { RenderPosition } from './constants.js';
import { TRIP_COUNT } from './constants.js';
import { render } from './utils/render.js';
import { replace } from './utils/render.js';
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

const renderTrip = (tripListElement, trip) => {
  const tripComponent = new TripView(trip);
  const tripEditComponent = new TripEditView(trip);

  const replaceTripToForm = () => {
    replace(tripEditComponent, tripComponent);
  };

  const replaceFormToTrip = () => {
    replace(tripComponent, tripEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToTrip();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  tripComponent.setEditClickHandler(() => {
    replaceTripToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  tripEditComponent.setFormSubmitHandler(() => {
    replaceFormToTrip();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  tripEditComponent.setEditClickHandler(() => {
    replaceFormToTrip();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  tripEditComponent.setDeleteClickHandler(() => {
    // onClickDeleteEditBtn
  });

  render(tripListElement, tripComponent.element, RenderPosition.BEFOREEND);
};

const renderTripEvents = (tripEventsList, tripEvents) => {
  if (trips.length === 0) {
    render(tripEventsElement, new NoTripView('Everthing'), RenderPosition.BEFOREEND);

    tripMainElement.querySelector('.trip-main__event-add-btn').addEventListener('click', () => {
      // onClickNewTripBtn
    });
  } else {
    render(tripMainElement, new TripInfoView(trips), RenderPosition.AFTERBEGIN);
    render(tripEventsElement, new SortView(), RenderPosition.AFTERBEGIN);
    render(tripEventsElement, tripEventsList, RenderPosition.BEFOREEND);

    for (let i = 0; i < TRIP_COUNT; i++) {
      renderTrip(tripEventsList, tripEvents[i]);
    }
  }
};

render(tripNavigationElement, new TripNavigationView(), RenderPosition.BEFOREEND);

render(tripFiltersElement, new FilterView(), RenderPosition.BEFOREEND);

renderTripEvents(new TripListView(), trips);

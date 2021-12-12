import { RenderPosition } from '../constants.js';
import { render } from '../utils/render.js';
import { replace } from '../utils/render.js';
import NoTripView from '../views/no-trip-view.js';
import SortView from '../views/sort-view.js';
import TripListView from '../views/trip-list-view';
import TripView from '../views/trip-view';
import TripEditView from '../views/trip-edit-view';
import { TRIP_COUNT } from '../constants.js';

export default class TripEventsPresenter {

  #tripEventsElement = null;

  tripEventsList = new TripListView();

  constructor (tripEventsElement) {
    this.#tripEventsElement = tripEventsElement;
  }

  init = (trips) => {
    if (trips.length === 0) {
      this.renderNoTrip();
    } else {
      this.renderTripSort();
      this.renderTripList(trips);
    }
  }

  renderTripSort = () => {
    render(this.#tripEventsElement, new SortView(), RenderPosition.AFTERBEGIN);
  }

  renderTripList = (trips) => {
    render(this.#tripEventsElement, this.tripEventsList, RenderPosition.BEFOREEND);
    for (let i = 0; i < TRIP_COUNT; i++) {
      this.renderTripItem(trips[i]);
    }
  }

  renderNoTrip = () => {
    render(this.#tripEventsElement, new NoTripView('Everthing'), RenderPosition.BEFOREEND);
  }

  renderTripItem = (trip) => {
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

    render(this.tripEventsList, tripComponent.element, RenderPosition.BEFOREEND);
  }

  renderAddTripItem = () => {}

  destroyTripSort = () => {}

  destroyTripList = () => {}

  handlerTripSortChange = () => {}

  handleTripModeChange = () => {}

  escKeyDownHandler = () => {}

  handleAddTripSaveClick = () => {}

  handleAddTripCancelClick = () => {}

  validateUserInput = () => {}
}

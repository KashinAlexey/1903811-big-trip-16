import { RenderPosition } from '../constants.js';
import { remove, render } from '../utils/render.js';
import { replace } from '../utils/render.js';
import TripView from '../views/trip-view';
import TripEditView from '../views/trip-edit-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export default class TripItemPresenter {
  #tripEventsList = null;
  #changeMode = null;


  tripComponent = null;
  tripEditComponent = null;

  #mode = Mode.DEFAULT;

  constructor (tripEventsList, changeMode) {
    this.#tripEventsList = tripEventsList;
    this.#changeMode = changeMode;
  }

  init = (trip) => {
    const previousTripComponent = this.tripComponent;
    const previousTripEditComponent = this.tripEditComponent;

    this.tripComponent = new TripView(trip);
    this.tripEditComponent = new TripEditView(trip);

    this.tripComponent.setEditClickHandler(this.handleEditClick);
    this.tripEditComponent.setFormSubmitHandler(this.handleFormSubmit);
    this.tripEditComponent.setEditClickHandler(this.handleEditClick);
    this.tripEditComponent.setDeleteClickHandler(this.handleDeleteClick);

    if (previousTripComponent === null || previousTripEditComponent === null) {
      render(this.#tripEventsList, this.tripComponent.element, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.tripComponent, previousTripComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.tripEditComponent, previousTripEditComponent);
    }

    remove(previousTripComponent);
    remove(previousTripEditComponent);
  }

  destroy = () => {}

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.replaceFormToTrip();
    }
  }

  replaceTripToForm = () => {
    replace(this.tripEditComponent, this.tripComponent);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  }

  replaceFormToTrip = () => {
    replace(this.tripComponent, this.tripEditComponent);
    document.removeEventListener('keydown', this.escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  resetTripView = () => {}

  handleEditClick = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.replaceTripToForm();
      document.addEventListener('keydown', this.escKeyDownHandler);
    } else {
      this.replaceFormToTrip();
    }
  }

  handleFavoriteClick = () => {}

  handleFormSubmit = () => {
    this.replaceFormToTrip();
  }

  handleDeleteClick = () => {}

  escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.replaceFormToTrip();
    }
  }
}

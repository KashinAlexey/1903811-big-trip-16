import { RenderPosition } from '../constants.js';
import { remove } from '../utils/render.js';
import { render } from '../utils/render.js';
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
  #changeData = null;

  #tripComponent = null;
  #tripEditComponent = null;

  #trip = null;
  #mode = Mode.DEFAULT;

  constructor (tripEventsList, changeMode, changeData) {
    this.#tripEventsList = tripEventsList;
    this.#changeMode = changeMode;
    this.#changeData = changeData;
  }

  init = (trip) => {
    this.#trip = trip;

    const previousTripComponent = this.#tripComponent;
    const previousTripEditComponent = this.#tripEditComponent;

    this.#tripComponent = new TripView(trip);
    this.#tripEditComponent = new TripEditView(trip);

    this.#tripComponent.setEditClickHandler(this.#handleEditClick);
    this.#tripComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#tripEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#tripEditComponent.setEditClickHandler(this.#handleEditClick);
    this.#tripEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (previousTripComponent === null || previousTripEditComponent === null) {
      render(this.#tripEventsList, this.#tripComponent.element, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripComponent, previousTripComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#tripEditComponent, previousTripEditComponent);
    }

    remove(previousTripComponent);
    remove(previousTripEditComponent);
  }

  destroy = () => {
    remove(this.#tripComponent);
    remove(this.#tripEditComponent);
  }

  #replaceTripToForm = () => {
    replace(this.#tripEditComponent, this.#tripComponent);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToTrip = () => {
    replace(this.#tripComponent, this.#tripEditComponent);
    document.removeEventListener('keydown', this.#handleEscKeyDown);
    this.#mode = Mode.DEFAULT;
  }

  resetTripView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToTrip();
    }
  }

  #handleEditClick = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#replaceTripToForm();
      document.addEventListener('keydown', this.#handleEscKeyDown);
    } else {
      this.#replaceFormToTrip();
    }
  }

  #handleFavoriteClick = () => {
    this.#changeData({...this.#trip, isFavorite: !this.#trip.isFavorite});
  }

  #handleFormSubmit = (trip) => {
    this.#replaceFormToTrip();
    this.#changeData({...trip});
  }

  #handleDeleteClick = () => {}

  #handleEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToTrip();
    }
  }
}

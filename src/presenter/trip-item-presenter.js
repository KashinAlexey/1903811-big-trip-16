import { Mode } from '../constants.js';
import { RenderPosition } from '../constants.js';
import { remove } from '../utils/render.js';
import { render } from '../utils/render.js';
import { replace } from '../utils/render.js';
import TripView from '../views/trip-view';
import TripEditView from '../views/trip-edit-view';
import { UserAction } from '../constants.js';
import { UpdateType } from '../constants.js';

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
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

  init = (trip, destination, offers) => {
    this.#trip = trip;

    const previousTripComponent = this.#tripComponent;
    const previousTripEditComponent = this.#tripEditComponent;

    this.#tripComponent = new TripView(trip);
    this.#tripEditComponent = new TripEditView(trip, destination, offers);

    this.#tripComponent.setEditClickHandler(this.#handleEditClick);
    this.#tripComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#tripEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#tripEditComponent.setEditClickHandler(this.#handleEditClick);
    this.#tripEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (previousTripComponent === null || previousTripEditComponent === null) {
      render(this.#tripEventsList, this.#tripComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripComponent, previousTripComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#tripComponent, previousTripEditComponent);
      this.#mode = Mode.DEFAULT;
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
    document.addEventListener('keydown', this.#handleEscKeyDown);
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
      this.#tripEditComponent.reset(this.#trip);
      this.#replaceFormToTrip();
    }
  }

  setViewState = (state) => {
    if (this.#mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this.#tripEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this.#tripEditComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this.#tripEditComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this.#tripComponent.shake(resetFormState);
        this.#tripEditComponent.shake(resetFormState);
        break;
    }
  }

  #handleEditClick = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#replaceTripToForm();
    } else {
      this.#tripEditComponent.reset(this.#trip);
      this.#replaceFormToTrip();
    }
  }

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_DATA,
      UpdateType.MINOR,
      {...this.#trip, isFavorite: !this.#trip.isFavorite});
  }

  #handleFormSubmit = (trip) => {
    //this.#replaceFormToTrip();
    this.#changeData(
      UserAction.UPDATE_DATA,
      UpdateType.PATCH,
      {...trip});
  }

  #handleDeleteClick = (trip) => {
    //this.destroy();
    this.#changeData(
      UserAction.DELETE_DATA,
      UpdateType.MINOR,
      {...trip});
  }

  #handleEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#tripEditComponent.reset(this.#trip);
      this.#replaceFormToTrip();
    }
  }
}

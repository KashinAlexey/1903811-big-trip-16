import { RenderPosition } from '../constants.js';
import { remove } from '../utils/render.js';
import { render } from '../utils/render.js';
import TripAddView from '../views/trip-add-view.js';
import { UserAction } from '../constants.js';
import { UpdateType } from '../constants.js';

export default class TripItemAddPresenter {
  #tripEventsList = null;
  #changeData = null;
  #tripAddComponent = null;
  #callback = null;

  constructor (tripEventsList, changeData) {
    this.#tripEventsList = tripEventsList;
    this.#changeData = changeData;
  }

  init = (destinations, offers, callBack) => {
    if (this.#tripAddComponent !== null) {
      return;
    }

    this.#callback = callBack;
    this.#tripAddComponent = new TripAddView(destinations, offers);

    this.#tripAddComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#tripAddComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#tripEventsList, this.#tripAddComponent.element, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#handleEscKeyDown);
  }

  destroy = () => {
    if (this.#tripAddComponent === null) {
      return;
    }

    remove(this.#tripAddComponent);
    this.#tripAddComponent = null;
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  }

  setSaving = () => {
    this.#tripAddComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting = () => {
    const resetFormState = () => {
      this.#tripAddComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#tripAddComponent.shake(resetFormState);
  }

  #handleFormSubmit = (trip) => {
    this.#changeData(
      UserAction.ADD_DATA,
      UpdateType.MINOR,
      {...trip},
    );
    this.#callback();
  }

  #handleDeleteClick = () => {
    this.#callback();
    this.destroy();
  }

  #handleEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#callback();
      this.destroy();
    }
  }
}

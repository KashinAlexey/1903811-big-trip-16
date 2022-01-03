import { RenderPosition } from '../constants.js';
import { remove } from '../utils/render.js';
import { render } from '../utils/render.js';
import TripAddView from '../views/trip-add-view.js';
import { UserAction } from '../constants.js';
import { UpdateType } from '../constants.js';
import { generateId } from '../mock/util-mock.js';

export default class TripItemAddPresenter {
  #tripEventsList = null;
  #changeData = null;
  #tripAddComponent = null;
  #destroyCallback = null;

  constructor (tripEventsList, changeData) {
    this.#tripEventsList = tripEventsList;
    this.#changeData = changeData;
  }

  init = (callback, destinations, offers) => {
    this.#destroyCallback = callback;

    if (this.#tripAddComponent !== null) {
      return;
    }

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

    this.#destroyCallback?.();

    remove(this.#tripAddComponent);
    this.#tripAddComponent = null;

    document.removeEventListener('keydown', this.#handleEscKeyDown);
  }

  #handleFormSubmit = (trip) => {
    this.#changeData(
      UserAction.ADD_DATA,
      UpdateType.MINOR,
      {id: generateId(),...trip}
    );
    this.destroy();
  }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #handleEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}

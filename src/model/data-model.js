import AbstractObservable from '../utils/abstract-observable.js';

export default class DataModel extends AbstractObservable {
  #data = [];

  set data(data) {
    this.#data = [...data];
  }

  get data() {
    return this.#data;
  }

  updateData = (updateType, update) => {
    const index = this.#data.findIndex((data) => data.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#data = [
      ...this.#data.slice(0, index),
      update,
      ...this.#data.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addData = (updateType, update) => {
    this.#data = [
      update,
      ...this.#data,
    ];

    this._notify(updateType, update);
  }

  deleteData = (updateType, update) => {
    const index = this.#data.findIndex((data) => data.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#data = [
      ...this.#data.slice(0, index),
      ...this.#data.slice(index + 1),
    ];

    this._notify(updateType);
  }
}

import AbstractObservable from '../utils/abstract-observable.js';
export default class DataModel extends AbstractObservable {
  #data = [];
  #destinations = [];
  #offers = [];
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  init = async () => {
    try {
      const data = await this.#apiService.data;
      const destinations = await this.#apiService.getDestinations();
      const offers = await this.#apiService.getOffers();
      this.#data = data.map(this.#adaptToClient);
      this.#destinations = destinations;
      this.#offers = offers;
    } catch(err) {
      this.#data = [];
    }
  }

  get data() {
    return this.#data;
  }

  getDestinations() {
    return this.#destinations;
  }

  getOffers() {
    return this.#offers;
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

  #adaptToClient = (data) => {
    const adaptedData = {...data,
      basePrice: data['base_price'],
      dateFrom: data['date_from'] !== null ? new Date(data['date_from']) : data['date_from'],
      dateTo: data['date_to'] !== null ? new Date(data['date_to']) : data['date_to'],
      isFavorite: data['is_favorite'],
    };

    delete adaptedData['base_price'];
    delete adaptedData['date_from'];
    delete adaptedData['date_to'];
    delete adaptedData['is_favorite'];

    return adaptedData;
  }
}

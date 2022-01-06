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

  get data() {
    return this.#data;
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
      this.#data = null;
    }
  }

  getDestinations() {
    return this.#destinations;
  }

  getOffers() {
    return this.#offers;
  }

  updateData = async (updateType, update) => {
    const index = this.#data.findIndex((data) => data.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting data');
    }

    try {
      const response = await this.#apiService.updateData(update);
      const updatedData = this.#adaptToClient(response);
      this.#data = [
        ...this.#data.slice(0, index),
        update,
        ...this.#data.slice(index + 1),
      ];
      this._notify(updateType, updatedData);
    } catch(err) {
      throw new Error('Can\'t update data');
    }
  }

  addData = async (updateType, update) => {
    try {
      const response = await this.#apiService.addData(update);
      const newData = this.#adaptToClient(response);
      this.#data = [
        newData,
        ...this.#data
      ];
      this._notify(updateType, newData);
    } catch(err) {
      throw new Error('Can\'t add data');
    }
  }

  deleteData = async (updateType, update) => {
    const index = this.#data.findIndex((data) => data.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting data');
    }

    try {
      await this.#apiService.deleteData(update);
      this.#data = [
        ...this.#data.slice(0, index),
        ...this.#data.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete data');
    }
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

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get data() {
    return this.#load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  async getDestinations() {
    return this.#load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  async getOffers() {
    return this.#load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  updateData = async (data) => {
    const response = await this.#load({
      url: `points/${data.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(data)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  addData = async (data) => {
    const response = await this.#load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(data)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  deleteData = async (data) => {
    const response = await this.#load({
      url: `points/${data.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(
      `${this.#endPoint}/${url}`,
      {method, body, headers},
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  #adaptToServer = () => {
    // const adaptedTask = {...task,
    //   'due_date': task.dueDate instanceof Date ? task.dueDate.toISOString() : null, // На сервере дата хранится в ISO формате
    //   'is_archived': task.isArchive,
    //   'is_favorite': task.isFavorite,
    //   'repeating_days': task.repeating,
    // };

    // Ненужные ключи мы удаляем
    // delete adaptedTask.dueDate;
    // delete adaptedTask.isArchive;
    // delete adaptedTask.isFavorite;
    // delete adaptedTask.repeating;

    // return adaptedTask;
  }

  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError = (err) => {
    throw err;
  }
}

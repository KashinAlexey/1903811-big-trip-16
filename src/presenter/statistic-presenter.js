import StatsView from '../views/stats-view.js';
import { RenderPosition } from '../constants.js';
import { render } from '../utils/render.js';
import { remove } from '../utils/render.js';
export default class StatisticPresenter {
  #tripEventsElement = null;
  #tripsModel = null;
  #statsComponent = null;

  constructor (tripsModel, tripEventsElement) {
    this.#tripsModel = tripsModel;
    this.#tripEventsElement = tripEventsElement;

    this.#statsComponent = new StatsView();
  }

  init = () => {
    render(this.#tripEventsElement, this.#statsComponent, RenderPosition.BEFOREEND);
  }

  destroy = () => {
    remove(this.#statsComponent);
  }
}

import FilterView from '../views/filter-view.js';
import { FilterType } from '../constants.js';
import { replace, remove } from '../utils/render.js';
import { RenderPosition } from '../constants.js';
import { render } from '../utils/render.js';
import { UpdateType } from '../constants.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #tripsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, tripsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#tripsModel = tripsModel;
  }

  get filters() {
    return [
      {
        type: FilterType.EVERYTHING,
        name: 'EVERYTHING',
      },
      {
        type: FilterType.FUTURE,
        name: 'FUTURE',
      },
      {
        type: FilterType.PAST,
        name: 'PAST',
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    this.#tripsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    if (prevFilterComponent === null) {
      render(this.#filterContainer, this.#filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  destroy = () => {
    remove(this.#filterComponent);
    this.#filterComponent = null;

    this.#tripsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);

    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  }

  #handleModelEvent = () => {
    this.init();
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}

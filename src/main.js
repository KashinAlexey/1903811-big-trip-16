import { RenderPosition, TRIP_COUNT } from './constants.js';
import { renderTemplate } from './util.js';
import { createTripNavigationTemplate } from './views/navigation-view.js';
import { createFilterTemplate } from './views/filter-view.js';
import { createSortTemplate } from './views/sort-view.js';
import { createTripListTemplate } from './views/trip-list-view.js';
import { createTripTemplate } from './views/trip-view.js';
import { createTripAddTemplate } from './views/trip-add-view.js'
import { createTripEditTemplate } from './views/trip-edit-view.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

renderTemplate(tripNavigationElement, createTripNavigationTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripFiltersElement, createFilterTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripEventsElement, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripEventsElement, createTripListTemplate(), RenderPosition.BEFOREEND);

const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

renderTemplate(tripEventsListElement, createTripAddTemplate(), RenderPosition.BEFOREEND);

renderTemplate(tripEventsListElement, createTripEditTemplate(), RenderPosition.BEFOREEND);

for (let i = 0; i < TRIP_COUNT; i++) {
  renderTemplate(tripEventsListElement, createTripTemplate(), RenderPosition.BEFOREEND);
}





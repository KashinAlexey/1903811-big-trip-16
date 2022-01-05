export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export const TRIP_COUNT = 5;

export const SHAKE_ANIMATION_TIMEOUT = 600;

export const TRIP_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const OFFER_TITLE_TO_NAME =  {
  luggage: 'Add luggage',
  comfort: 'Upgrade to comfort class',
  meal: 'Add meal',
  seats: 'Choose seats',
  train: 'Travel by train',
};

export const DAY_TIME_FORMAT = 'DD/MM/YY HH:mm';
export const DAY_FORMAT = 'MMM D';
export const TIME_FORMAT = 'HH:mm';

export const SortType = {
  day: 'Day',
  event: 'Event',
  time: 'Time',
  price: 'Price',
  offer: 'Offer',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const UserAction = {
  UPDATE_DATA: 'UPDATE_DATA',
  ADD_DATA: 'ADD_DATA',
  DELETE_DATA: 'DELETE_DATA',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const MenuItem = {
  TABLE: 'Table',
  STATS: 'Stats',
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const LoadingType = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

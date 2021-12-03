const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const TRIP_COUNT = 0;

const TRIP_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const OFFER_TITLE_TO_NAME =  {
  luggage: 'Add luggage',
  comfort: 'Upgrade to comfort class',
  meal: 'Add meal',
  seats: 'Choose seats',
  train: 'Travel by train',
};

const DAY_TIME_FORMAT = 'DD/MM/YY HH:mm';
const DAY_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';

export { RenderPosition, TRIP_COUNT, DAY_TIME_FORMAT, TIME_FORMAT, DAY_FORMAT, TRIP_TYPES, OFFER_TITLE_TO_NAME };

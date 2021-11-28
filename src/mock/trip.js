import { generateRandomInteger, generateBoolean, generateText, generateWord, generateDate, generatePictureSrc, generateArray, getSing, generateId } from './generate-mock-data.js';

// Данные
const MAX_OFFERS_COUNT = 5;
const MAX_OFFER_PRICE = 10000;
const MAX_PICTURES_COUNT = 6;
const MAX_BASE_PRICE = 1000;
const DAY_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const OFFER_TITLES =  ['Upgrade to comfort class', 'Add luggage', 'Add meal', 'Choose seats', 'Travel by train'];
const TRIP_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const generateOffer = () => (
  {
    id: 0, // ?
    title: OFFER_TITLES[generateRandomInteger(0, OFFER_TITLES.length - 1)],
    price: generateRandomInteger(1, MAX_OFFER_PRICE),
  }
);

const generatePicture = () => (
  {
    src: generatePictureSrc(),
    description: generateText(20, 100)
  }
);

export const generateDestination = () => (
  {
    name: generateWord(5, 10),
    description: generateText(20, 200),
    pictures: generateArray(MAX_PICTURES_COUNT, generatePicture),
  }
);

export const generateTrip = () => {
  const offers = generateArray(generateRandomInteger(0, MAX_OFFERS_COUNT), generateOffer);
  const basePrice = generateRandomInteger(0, MAX_BASE_PRICE); // base_price
  const dateFrom = generateDate(getSing()*7, DAY_FORMAT); // date_from '2021-11-25T12:29:07.572Z'
  const dateTo = generateDate(getSing()*7, DAY_FORMAT); //date_to '2021-11-26T01:30:58.160Z'
  const destination = generateDestination();
  const id = generateId(3); // ?
  const isFavorite = generateBoolean(); // is_favorite
  const type = TRIP_TYPES[generateRandomInteger(0, TRIP_TYPES.length - 1)];

  return {
    id,
    type,
    dateFrom,
    dateTo,
    destination,
    basePrice,
    isFavorite,
    offers,
  };
};

import { generateRandomInteger, generateBoolean, generateText, generateWord, generateDate, generatePictureSrc, generateRndSizeArray, getSing, generateId, getRndArrayElement, generateFixSizeArray, getRndSizeArray } from './util-mock.js';
import { TRIP_TYPES } from '../constants.js';

// Данные
const MAX_DESTINATION_COUNT = 20;
const MAX_OFFER_PRICE = 10000;
const MAX_PICTURES_COUNT = 6;
const MAX_BASE_PRICE = 1000;
const OFFER_TITLES =  ['Upgrade to comfort class', 'Add luggage', 'Add meal', 'Choose seats', 'Travel by train'];

const generateOffer = (title) => (
  {
    id: generateId(3),
    title,
    price: generateRandomInteger(1, MAX_OFFER_PRICE),
  }
);

export const offersList = OFFER_TITLES.map((title) => generateOffer(title));

export const generateTypeWithOffers = (type) => (
  {
    type,
    offers: getRndSizeArray(offersList),
  }
);

export const generateDestination = () => {
  const name =  generateWord(5, 10);

  return {
    name,
    description: `${name} - ${generateText(20, 200)}`,
    pictures: generateRndSizeArray(MAX_PICTURES_COUNT, () => (
      {
        src: generatePictureSrc(),
        description: generateText(20, 100)
      }
    ))
  };
};

export const destinationsList = generateFixSizeArray(MAX_DESTINATION_COUNT, generateDestination);

export const typeWithOffersList = TRIP_TYPES.map((type) => generateTypeWithOffers(type));

export const generateTrip = () => {
  const offers = getRndSizeArray(offersList);
  const basePrice = generateRandomInteger(0, MAX_BASE_PRICE); // base_price
  const dateFrom = generateDate(getSing()*7, getSing()*12); // date_from '2021-11-25T12:29:07.572Z'
  const dateTo = generateDate(getSing()*7, getSing()*12); //date_to  '2021-11-26T01:30:58.160Z'
  const destination = getRndArrayElement(destinationsList);
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

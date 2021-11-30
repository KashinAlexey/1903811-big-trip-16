/*
import { generateRandomInteger, generateRandomFloat, generateBoolean, generateText, generateWord, generateDate, generatePictureSrc, generateArray, getSing, generateId } from './generate-mock-data.js';

import { isDateAfter, isDateBefore, isDateToday, formatDate } from './generate-mock-data.js';
*/

import dayjs from 'dayjs';

export const generateRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateRandomFloat = (min = 0, max = 1, simbolsCount) => +((Math.random() * (max - min)) + min).toFixed(simbolsCount);

export const generateBoolean = () => Boolean(generateRandomInteger(0, 1));

export const getSing = () => generateRandomInteger(0, 1) === 1 ? 1 : -1;

export const generateText = (min = 100, max = 300) => {
  const TEXT = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ut dolor ratione sint sapiente dolores, assumenda iure numquam doloremque? Iusto, nisi? Reiciendis illum inventore qui quisquam sunt, blanditiis numquam minus sequi. Eum harum corporis officia, sit aut iure deserunt. Reprehenderit ab cumque, numquam consequatur enim obcaecati molestiae consequuntur quo animi deleniti tempore non qui voluptate fugiat, eos in quod optio dolor harum minus. Nihil dolore saepe at maxime totam, a dignissimos deserunt, soluta dolorem explicabo modi suscipit! Voluptatum suscipit beatae itaque, eum excepturi nihil fugiat soluta corrupti in explicabo nulla omnis. Harum voluptatum quia officiis commodi enim nobis officia dicta. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ut dolor ratione sint sapiente dolores, assumenda iure numquam doloremque? Iusto, nisi? Reiciendis illum inventore qui quisquam sunt, blanditiis numquam minus sequi. Eum harum corporis officia, sit aut iure deserunt. Reprehenderit ab cumque, numquam consequatur enim obcaecati molestiae consequuntur quo animi deleniti tempore non qui voluptate fugiat.';

  return TEXT.slice(0, generateRandomInteger(min, Math.min(TEXT.length - 1), max));
};

export const generateWord = (min = 5, max = 10) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let word = '';

  for (let i = 0; i <= max; i++) {
    if (i === 0) {
      word += alphabet[generateRandomInteger(0, alphabet.length - 1)].toUpperCase();
    } else {
      word += alphabet[generateRandomInteger(0, alphabet.length - 1)];
    }
  }

  return word.slice(0, generateRandomInteger(min, max));
};

export const generatePictureSrc = () => `http://picsum.photos/300/200?r=${generateRandomFloat(1, 2, 10)}`;

// TODO maxSize, minSize
export const generateRndSizeArray = (size = 0, foo = () => {}) => Array.from({length: generateRandomInteger(0, size)}, foo);

export const generateFixSizeArray = (size = 0, foo = () => {}) => Array.from({length: size}, foo);

export const getRndArrayElement = (arr = [], empty) => arr[generateRandomInteger(0, arr.length-1)] || empty;

export const getRndSizeArray = (arr) => arr.slice(0, generateRandomInteger(0, arr.length));

export const generateId = (count = 10) => {
  let id='';
  const r = crypto.getRandomValues(new Uint8Array(count));
  for (;count--;) {
    const n = 63 & r[count];
    let str = '';
    if (n < 36) {
      str = n.toString(36);
    } else if (n < 62) {
      str = (n-26).toString(36).toUpperCase();
    } else if (n < 63) {
      str = '_';
    } else {
      str = '-';
    }
    id += str;
  }
  return id;
};

export const generateDate = (dayGap = 7, hourGap = 12, minuteGap = 60) => dayjs().add(generateRandomInteger(Math.min(0, dayGap), Math.max(0, dayGap)), 'day').add(generateRandomInteger(Math.min(0, hourGap), Math.max(0, hourGap)), 'hour').add(generateRandomInteger(Math.min(0, minuteGap), Math.max(0, minuteGap)), 'minute').toDate();

export const formatDate = (date, dayFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ') => dayjs(date).format(dayFormat);

export const isDateAfter = (date) => date && dayjs().isAfter(date, 'D');

export const isDateBefore = (date) => date && dayjs().isBefore(date, 'D');

export const isDateToday = (date) => date && dayjs(date).isSame(dayjs(), 'D');

export const calculateDateDiff = (startDay, endDay) => {
  const dateDiff = Math.abs(startDay - endDay) / 1000 / 60;
  let timeString;

  if (dateDiff < 60 ) {
    timeString = `${`0${dateDiff}`.slice(-2)}M`;
  } else if (dateDiff < 1440) {
    timeString = `${`0${Math.trunc(dateDiff / 60)}`.slice(-2)}H ${`0${Math.trunc(dateDiff % 60)}`.slice(-2)}M`;
  } else {
    timeString = `${`0${Math.trunc(dateDiff / 1440)}`.slice(-2)}D ${`0${Math.trunc((dateDiff % 1440) / 60)}`.slice(-2)}H ${`0${Math.trunc((dateDiff % 1440) % 60)}`.slice(-2)}M`;
  }

  return timeString;
};



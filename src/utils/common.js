import dayjs from 'dayjs';

// Working with date-time
export const getKeyByValue = (object, value) => Object.keys(object).find((key) => object[key] === value);

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

// Updating item in array
export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

// Compare functions in arr.sort()
const getWeightForNull = (A, B) => {
  if (A === null && B === null) {
    return 0;
  }

  if (A === null) {
    return 1;
  }

  if (B === null) {
    return -1;
  }

  return null;
};

export const sortDate = (dayA, dayB, type) => {
  const weight = getWeightForNull(dayA, dayB);

  return type === 'Up'? weight ?? dayjs(dayA).diff(dayjs(dayB)) : weight ?? dayjs(dayB).diff(dayjs(dayA));
};

export const sortNumber = (numberA, numberB, type) => {
  const weight = getWeightForNull(numberA, numberB);

  return type === 'Up'? weight ?? numberB - numberA : weight ?? numberA - numberB;
};

export const sortDuration = (startA, endA, startB, endB, type) => {
  const durationA = Math.abs(endA - startA);
  const durationB = Math.abs(endB - startB);
  const weight = getWeightForNull(durationA, durationB);

  return type === 'Up'? weight ?? durationB - durationA : weight ?? durationA - durationB;
};


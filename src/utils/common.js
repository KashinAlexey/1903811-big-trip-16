import dayjs from 'dayjs';

// Working with date-time
export const formatDate = (date, dayFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ') => dayjs(date).format(dayFormat);

export const isDateAfter = (date) => date && dayjs().isAfter(date, 'D');

export const isDateBefore = (date) => date && dayjs().isBefore(date, 'D');

export const isDateToday = (date) => date && dayjs(date).isSame(dayjs(), 'D');

export const calculateDateDiff = (startDay, endDay) => {
  const dateDiff = Math.abs(startDay - endDay) / 1000 / 60;
  let timeString;

  if (dateDiff < 60 ) {
    timeString = `${`0${Math.trunc(dateDiff)}`.slice(-2)}M`;
  } else if (dateDiff < 1440) {
    timeString = `${`0${Math.trunc(dateDiff / 60)}`.slice(-2)}H ${`0${Math.trunc(dateDiff % 60)}`.slice(-2)}M`;
  } else {
    timeString = `${`0${Math.trunc(dateDiff / 1440)}`.slice(-2)}D ${`0${Math.trunc((dateDiff % 1440) / 60)}`.slice(-2)}H ${`0${Math.trunc((dateDiff % 1440) % 60)}`.slice(-2)}M`;
  }

  return timeString;
};

// Compare functions in arr.sort(foo)
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

// Working with object
export const getObjectFromArray = (arr, value) => {
  for (let i=0; i< arr.length; i++) {
    if (Object.values(arr[i]).includes(value)) {
      return arr[i];
    }
  }
  return null;
};

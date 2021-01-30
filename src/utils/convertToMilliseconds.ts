const convertToMilliseconds = (hours?: number, minutes?: number) => {
  let milliseconds = 0;

  const convertMinutesToMilliseconds = (minutes: number) => {
    const seconds = minutes * 60;

    return seconds * 1000;
  };
  const convertHoursToMinutesToMilliseconds = (hour: number) =>
    convertMinutesToMilliseconds(hour * 60);

  if (hours) {
    milliseconds += convertHoursToMinutesToMilliseconds(hours);
  }

  if (minutes) {
    milliseconds += convertMinutesToMilliseconds(minutes);
  }

  return milliseconds;
};

export default convertToMilliseconds;

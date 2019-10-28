const intervalSwitch = (tipTimer: any, intervalSetter: Function) => {
  switch (tipTimer) {
    case '5 minutes':
      intervalSetter(0, 5);
      break;
    case '10 minutes':
      intervalSetter(0, 10);
      break;
    case '15 minutes':
      intervalSetter(0, 15);
      break;
    case '30 minutes':
      intervalSetter(0, 30);
      break;
    case '1 hour':
      intervalSetter(1, 0);
      break;
    case '2 hours':
      intervalSetter(2, 0);
      break;
    case '4 hours':
      intervalSetter(4, 0);
      break;
    case '8 hours':
      intervalSetter(8, 0);
      break;
    case '1 day':
      intervalSetter(24, 0);
      break;
    case '1 week':
      intervalSetter(168, 0);
      break;
    case '1 month':
      intervalSetter(730, 0);
      break;
  }
};

export default intervalSwitch;

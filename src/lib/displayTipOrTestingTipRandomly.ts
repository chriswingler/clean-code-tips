import displayTip from './displayTip';
import displayTestingTip from './displayTestingTip';

const displayTipOrTestingTipRandomly = () => {
  const rand = Math.round(Math.random() * 1);

  rand === 0 ? displayTip() : displayTestingTip();
};

export default displayTipOrTestingTipRandomly;

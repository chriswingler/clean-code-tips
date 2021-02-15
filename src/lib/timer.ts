// @ts-ignore
import * as vscode from 'vscode';
import displayTip from './displayTip';
import displayTestingTip from './displayTestingTip';
import convertToMilliseconds from './convertToMilliseconds';
import intervalSwitch from './intervalSwitch';

const {testingTipSelectedInConfig} = vscode.workspace.getConfiguration();

const timer = (): void => {
  let prevIntervalId: NodeJS.Timeout;

  const tipTimer = vscode.workspace.getConfiguration().get('tipTimer');

  if (typeof tipTimer !== 'string') {
    return;
  }

  const displayTipOrTestingTipRandomly = () => {
    // initial tip
    const rand = Math.round(Math.random() * 1);

    rand === 0 ? displayTip() : displayTestingTip();
  };

  if (testingTipSelectedInConfig) {
    displayTipOrTestingTipRandomly();
  } else {
    displayTip();
  }

  const intervalSetter = (hours: number, minutes: number) => {
    const milliseconds = convertToMilliseconds(hours, minutes);

    clearInterval(prevIntervalId);

    prevIntervalId = setInterval(() => {
      if (testingTipSelectedInConfig) {
        displayTipOrTestingTipRandomly();
      } else {
        displayTip();
      }
    }, milliseconds);
  };

  intervalSwitch(tipTimer, intervalSetter);
};

export default timer;

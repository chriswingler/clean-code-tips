import * as vscode from 'vscode';
import displayTip from './displayTip';
import convertToMilliseconds from './convertToMilliseconds';
import intervalSwitch from './intervalSwitch';

const timer = (): void => {
  let prevIntervalId: NodeJS.Timeout;

  const tipTimer = vscode.workspace.getConfiguration().get('tipTimer');

  // initial tip
  displayTip();

  // Shorthand
  const intervalSetter = (hours: number, minutes: number) => {
    let milliseconds = convertToMilliseconds(hours, minutes);

    clearInterval(prevIntervalId);

    prevIntervalId = setInterval(() => {
      displayTip();
    }, milliseconds);
  };

  intervalSwitch(tipTimer, intervalSetter);
};

export default timer;

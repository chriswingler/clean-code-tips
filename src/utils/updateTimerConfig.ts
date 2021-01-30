import * as vscode from 'vscode';

const updateTimerConfig = async () => {
  const config = vscode.workspace.getConfiguration();
  await config.update('tipTimer', config, vscode.ConfigurationTarget.Global);
};

export default updateTimerConfig;

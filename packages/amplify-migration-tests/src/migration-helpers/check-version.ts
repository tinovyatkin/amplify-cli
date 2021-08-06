import { getCLIPath, getScriptRunnerPath, nspawn as spawn } from 'amplify-e2e-core';

export function versionCheck(cwd: string, testingWithLatestCodebase = false, version: { v?: string } = {}): Promise<void> {
  return new Promise((resolve, reject) => {
<<<<<<< HEAD
    spawn(getScriptRunnerPath(testingWithLatestCodebase), [getCLIPath(testingWithLatestCodebase), '-v'], { cwd, stripColors: true })
=======
    spawn(getScriptRunnerPath(), [getCLIPath(testingWithLatestCodebase), '-v'], { cwd, stripColors: true })
>>>>>>> e1ed94dca (test: win-e2e)
      .wait(/\d+\.\d+\.\d+/, v => (version.v = v.trim()))
      .run((err: Error) => {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
  });
}

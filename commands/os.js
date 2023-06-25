import os from "os";
import { ValidationError } from "../ValidationError.js";

const commandsFactory = {
  "--EOL": () => JSON.stringify(os.EOL),
  "--cpus": () => os.cpus(),
  "--homedir": () => os.homedir(),
  "--username": () => os.userInfo().username,
  "--architecture": () => os.arch(),
};

export const osCommand = async (args) => {
  const [param] = args;
  const command = commandsFactory[param];
  if (!param || !command) {
    throw new ValidationError();
  }
  console.log(command());
};

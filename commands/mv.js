import { cpCommand } from "./cp.js";
import { rmCommand } from "./rm.js";

export const mvCommand = async (args) => {
  await cpCommand(args);
  await rmCommand(args);
};

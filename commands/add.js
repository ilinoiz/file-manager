import { ValidationError } from "../ValidationError.js";
import fs from "fs/promises";

export const addCommand = async (args) => {
  const [fileName] = args;
  if (!fileName) {
    throw new ValidationError();
  }
  await fs.open(fileName, 'w');
};

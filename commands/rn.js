import { ValidationError } from "../ValidationError.js";
import fs from "fs/promises";
import path from "path";

export const rnCommand = async (args) => {
  const [pathToFile, newFileName] = args;
  if (!pathToFile || !newFileName) {
    throw new ValidationError();
  }
  const sourceFileDir = path.dirname(pathToFile);

  await fs.rename(pathToFile, path.join(sourceFileDir, newFileName));
};

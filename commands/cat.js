import { ValidationError } from "../ValidationError.js";
import fs from "fs";
import { pathExists } from "../utils.js";

export const catCommand = async (args) => {
  const [filePath] = args;
  if (!filePath) {
    throw new ValidationError();
  }

  const isFileExists = await pathExists(filePath);
  if (!isFileExists) {
    throw new Error();
  }

  const stream = fs.createReadStream(filePath);
  stream.pipe(process.stdout);
};

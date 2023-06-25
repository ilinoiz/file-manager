import { ValidationError } from "../ValidationError.js";
import fs from "fs";

export const catCommand = (args) => {
  const [filePath] = args;
  if (!filePath) {
    throw new ValidationError();
  }
  const stream = fs.createReadStream(filePath);
  stream.pipe(process.stdout);
};

import { ValidationError } from "../ValidationError.js";
import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";

export const cpCommand = async (args) => {
  const [filePath, newPathFolder] = args;
  if (!filePath || !newPathFolder) {
    throw new ValidationError();
  }
  const readStream = fs.createReadStream(filePath);
  const newPath = path.join(newPathFolder, path.basename(filePath));
  const writeStream = fs.createWriteStream(newPath);
  await pipeline(readStream, writeStream);
};

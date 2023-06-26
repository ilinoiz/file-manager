import { ValidationError } from "../ValidationError.js";
import fs from "fs";
import zlib from "zlib";
import { pipeline } from "stream/promises";
import { pathExists } from "../utils.js";

export const decompressCommand = async (args) => {
  const [pathToFile, pathToDestination] = args;
  if (!pathToFile || !pathToDestination) {
    throw new ValidationError();
  }

  const isFileExists = await pathExists(pathToFile);
  if (!isFileExists) {
    throw new Error();
  }

  const readStream = fs.createReadStream(pathToFile);
  const writeStream = fs.createWriteStream(pathToDestination);

  await pipeline(readStream, zlib.createBrotliDecompress(), writeStream);
};

import { ValidationError } from "../ValidationError.js";
import fs from "fs";
import zlib from "zlib";
import { pipeline } from "stream/promises";

export const decompressCommand = async (args) => {
  const [pathToFile, pathToDestination] = args;
  if (!pathToFile || !pathToDestination) {
    throw new ValidationError();
  }

  const readStream = fs.createReadStream(pathToFile);
  const writeStream = fs.createWriteStream(pathToDestination);

  await pipeline(readStream, zlib.createBrotliDecompress(), writeStream);
};

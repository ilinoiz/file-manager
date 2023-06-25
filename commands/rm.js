import fs from "fs/promises";
import { ValidationError } from "../ValidationError.js";

export const rmCommand = async (args) => {
  const [filePath] = args;
  if (!filePath) {
    throw new ValidationError();
  }
  await fs.rm(filePath);
};

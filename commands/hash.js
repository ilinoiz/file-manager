import { ValidationError } from "../ValidationError.js";
import fs from "fs/promises";
import crypto from "crypto";

export const hashCommand = async (args) => {
  const [filePath] = args;
  if (!filePath) {
    throw new ValidationError();
  }
  const fileData = await fs.readFile(filePath, "utf8");
  const hash = crypto.createHash("sha256");
  hash.update(fileData);

  console.log(hash.digest("hex"));
};

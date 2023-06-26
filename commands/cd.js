import { ValidationError } from "../ValidationError.js";

export const cdCommand = (args) => {
  const [newPath] = args;
  if (!newPath) {
    throw new ValidationError();
  }
  process.chdir(newPath);
};

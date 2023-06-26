import { rl } from "../index.js";

export const exitCommand = (userName) => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  rl.close();
};

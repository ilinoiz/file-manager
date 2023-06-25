import { rl } from "../index.js";

export const exitCommand = (args) => {
  console.log(`Thank you for using File Manager, ${args}, goodbye!`);
  rl.close();
};

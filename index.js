import os from "os";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output, argv } from "node:process";
import { exitCommand } from "./commands/exit.js";
import { CommandsRunner } from "./CommandsRunner.js";

let userName;
let commandRunner;

export const rl = readline.createInterface({ input, output });

const parseArguments = (args, commandName) => {
  if (!args || args.length < 3) {
    console.log("Invalid input");
    return;
  }
  const command = args.find((arg) => arg.includes(commandName));
  return command.split("=")[1];
};

const init = (() => {
  userName = parseArguments(argv, "--username");
  commandRunner = new CommandsRunner(userName);
  console.log(`Welcome to file manager, ${userName}!`);
  process.chdir(os.homedir());
  console.log(`You are currently in ${process.cwd()}`);
})();

rl.on("SIGINT", () => {
  exitCommand(userName);
});

rl.on("line", async (input) => {
  await commandRunner.run(input);
});

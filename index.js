import os from "os";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output, argv } from "node:process";
import { exitCommand } from "./commands/exit.js";
import { Command } from "./Command.js";
import { upCommand } from "./commands/up.js";
import { lsCommand } from "./commands/ls.js";
import { cdCommand } from "./commands/cd.js";
import { catCommand } from "./commands/cat.js";
import { addCommand } from "./commands/add.js";
import { rnCommand } from "./commands/rn.js";
import { cpCommand } from "./commands/cp.js";
import { rmCommand } from "./commands/rm.js";
import { mvCommand } from "./commands/mv.js";
import { osCommand } from "./commands/os.js";
import { hashCommand } from "./commands/hash.js";
import { compressCommand } from "./commands/compress.js";
import { decompressCommand } from "./commands/decompress.js";

export const rl = readline.createInterface({ input, output });

const inputParser = (args, commandName) => {
  if (!args || args.length < 3) {
    console.log("Invalid input");
    return;
  }
  const command = args.find((arg) => arg.includes(commandName));
  return command.split("=")[1];
};

const commandsFactory = {
  ".exit": () => exitCommand(userName),
  up: () => upCommand(),
  ls: () => lsCommand(),
  cd: (args) => cdCommand(args),
  cat: (args) => catCommand(args),
  add: (args) => addCommand(args),
  rn: (args) => rnCommand(args),
  cp: (args) => cpCommand(args),
  rm: (args) => rmCommand(args),
  mv: (args) => mvCommand(args),
  os: (args) => osCommand(args),
  hash: (args) => hashCommand(args),
  compress: (args) => compressCommand(args),
  decompress: (args) => decompressCommand(args),
};

const commandRunner = async (commandName, args) => {
  const command = commandsFactory[commandName];
  try {
    await command(args);
  } catch (error) {
    if (error.name === "ValidationError") {
      console.log("Invalid input");
    } else {
      // console.log("Operation failed");
      throw error;
    }
  }
};

let userName;

const init = (() => {
  userName = inputParser(argv, "--username");
  console.log(`Welcome to file manager, ${userName}!`);
  process.chdir(os.homedir());
  console.log(`You are currently in ${process.cwd()}`);
})();

rl.on("SIGINT", () => {
  exitCommand(userName);
});

rl.on("line", async (input) => {
  const command = commandParser(input);
  await commandRunner(command.name, command.args);
  if (command.name !== ".exit") {
    console.log(`You are currently in ${process.cwd()}`);
  }
});

const commandParser = (input) => {
  const result = input.split(" ");
  // console.log(`result=${result}`);
  const command = new Command(result[0], result.slice(1));
  // console.log(`command=${command}`)
  return command;
};

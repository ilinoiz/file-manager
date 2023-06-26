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

export class CommandsRunner {
  constructor(userName) {
    this.userName = userName;
  }
  commandsList = {
    ".exit": () => exitCommand(this.userName),
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

  parseInput = (input) => {
    const result = input.split(/\s+/);
    const command = new Command(result[0], result.slice(1));
    return command;
  };

  run = async (input) => {
    const commandInfo = this.parseInput(input);
    const command = this.commandsList[commandInfo.name];
    try {
      await command(commandInfo.args);
      if (command.name !== ".exit") {
        console.log(`You are currently in ${process.cwd()}`);
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        console.log("Invalid input");
      } else {
        console.log("Operation failed");
      }
    }
  };
}

import path from "path";

export const upCommand = () => {
  const currentDirectory = process.cwd().split(path.sep);
  let newDirectory = currentDirectory.slice(0, currentDirectory.length - 1);
  newDirectory =
    newDirectory.length === 1
      ? newDirectory + path.sep
      : path.join(...newDirectory);
  process.chdir(newDirectory);
};

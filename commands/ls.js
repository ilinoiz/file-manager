import fs from "fs/promises";

export const lsCommand = async () => {
  const currDir = process.cwd();
  const files = await fs.readdir(currDir, { withFileTypes: true });
  console.table(
    files
      .map((file) => {
        return {
          name: file.name,
          type: file.isDirectory() ? "directory" : "file",
        };
      })
      .sort(
        (a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name)
      )
  );
};

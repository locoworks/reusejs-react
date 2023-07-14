/**
 * Write data to a file at the specified path.
 * This function writes the provided data to a file at the specified path. If an error occurs during the writing process, it logs the error to the console.
 *
 * @param {string} path - The path of the file to write.
 * @param {string} data - The data to be written to the file.
 * @returns {void}
 */
import fs from "node:fs";

export const writeToFile = async (path, data) => {
  try {
    await fs.promises.writeFile(path, data, "utf8");
  } catch (err) {
    console.log("Error while writing to file: ", path);
  }
};

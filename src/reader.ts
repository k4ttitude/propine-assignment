import { createReadStream } from "fs";
import readline from "readline";

export const readDataByLine = async (callback: (line:string) => void) => {
  const stream = createReadStream("./src/data/transactions.csv");
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  for await (const line of rl) {
    callback(line)
  }
};

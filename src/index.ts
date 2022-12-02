import { readDataByLine } from "./reader.js";

const delimeter = ",";

const main = async () => {
  const portfolios = new Map<string, number>();

  let count = -1;
  await readDataByLine((line) => {
    count++;
    if (count === 0) {
      return;
    }

    const parts = line.split(delimeter);
    if (parts.length !== 4) {
      console.info(`Skipped line ${count}`);
      return;
    }

    const [_timestamp, transaction_type, token, amount] = parts;
    const parsedAmount = parseFloat(amount);
    const creditAmount =
      parsedAmount * (transaction_type === "DEPOSIT" ? 1 : -1);

    const tokenAmount = portfolios.get(token) || 0;
    portfolios.set(token, tokenAmount + creditAmount);
    console.info(`${token} ${creditAmount}`)
  });

  portfolios.forEach((value, key) => console.log({ key, value }));
};

main();

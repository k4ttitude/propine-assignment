import { fetchPrices } from "./prices.js";
import { readDataByLine } from "./reader.js";

const delimeter = ",";

type Transaction = {
  timestamp: string;
  transaction_type: string;
  amount: number;
};

const readTokenTransactions = async () => {
  const tokens = new Map<string, Transaction[]>();

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

    const [timestamp, transaction_type, token, amount] = parts;
    const parsedAmount = parseFloat(amount);
    const tokenTransactions = tokens.get(token) || [];
    tokenTransactions.push({
      timestamp,
      transaction_type,
      amount: parsedAmount,
    });
    tokens.set(token, tokenTransactions);
  });

  return tokens;
};

const main = async () => {
  const tokenTransactions = await readTokenTransactions();
  const portfolios = Array.from(tokenTransactions.entries()).map(
    ([token, transactions]) => ({
      token,
      amount: transactions
        .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
        .reduce((total, { timestamp, amount, transaction_type }) => {
          const newAmount =
            total + amount * (transaction_type === "DEPOSIT" ? 1 : -1);
          if (newAmount < 0) {
            console.error("Invalid WITHDRAWAL:", token, amount, timestamp);
            return total;
          }
          return newAmount;
        }, 0),
    })
  );

  const prices = await fetchPrices(portfolios.map((p) => p.token));
  console.info('PORFOLIO VALUES:')
  portfolios.forEach(({ token, amount }) =>
    console.log(token, amount * prices[token].USD)
  );
};

main();

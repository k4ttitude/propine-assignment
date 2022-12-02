import fetch from "node-fetch";

const CURRENCY = "USD";

export const fetchPrices = async (tokens: string[]) => {
  const queryParams = new URLSearchParams({
    fsyms: tokens.join(','),
    tsyms: CURRENCY,
    api_key: 'ae29f5f86f8596c3db8a6a77d1242e005e4b0c2570de512337df889aeeb984b8'
  })
  const res = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?${queryParams}`)

  return (await res.json()) as { [key: string]: { [CURRENCY]: number } };
};

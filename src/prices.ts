import fetch from "node-fetch";

const CURRENCY = "USD";

export const fetchPrices = async (tokens: string[]) => {
  const queryParams = new URLSearchParams({
    fsyms: tokens.join(','),
    tsyms: CURRENCY,
    api_key: process.env.API_KEY || ''
  })
  const res = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?${queryParams}`)

  return (await res.json()) as { [key: string]: { [CURRENCY]: number } };
};

const BASE_URL = "https://api.coinpaprika.com/v1";

export const fetchCoins = () => {
  return fetch(`${BASE_URL}/coins/`).then((response) => response.json());
};

export const fetchCoin = (id: string) => {
  return fetch(`${BASE_URL}/coins/${id}`).then((response) => response.json());
};

export const fetchCoinTickers = (id: string) => {
  return fetch(`${BASE_URL}/tickers/${id}`).then((response) => response.json());
};

export const fetchCoinHistory = (coinId: string) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
};

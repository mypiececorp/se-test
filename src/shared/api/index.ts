import axios from 'axios';

const URL = 'https://api.poloniex.com/';

export const client = axios.create({
  baseURL: URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const GET_MARKETS = 'markets/ticker24h';

export interface IMarket {
  symbol: string;
  open: string;
  low: string;
  high: string;
  close: string;
  quantity: string;
  amount: string;
  tradeCount: number;
  startTime: number;
  closeTime: number;
  displayName: string;
  dailyChange: string;
  bid: string;
  bidQuantity: string;
  ask: string;
  askQuantity: string;
  ts: number;
  markPrice: string;
}

export async function getPhotos() {
  const response = client
    .get<IMarket[]>(GET_MARKETS, {params: {limit: '10'}})
    .then(res => res.data);
  return response;
}

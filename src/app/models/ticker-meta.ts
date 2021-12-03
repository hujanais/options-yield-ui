import { PriceData } from './price-data';

export type TickerMetaData = {
  ticker: string;
  price: number;
  expirationDates: string[];
  historicalPrices: PriceData[];
};

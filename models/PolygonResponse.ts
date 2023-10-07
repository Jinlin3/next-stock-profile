import { StringMappingType } from "typescript"

export interface DailyOpenClose {
  status: string,
  error?: string,
  afterHours: number,
  close: number,
  from: string,
  high: number,
  low: number,
  open: number,
  preMarket: number,
  symbol: string,
  volume: number,
}

export interface PreviousClose {
  adjusted: boolean,
  queryCount: number,
  request_id: string,
  results: StockPrices[],
  resultsCount: number,
  status: string,
  ticker: string,
}

export interface Aggregates {
  adjusted: boolean,
  next_url: string,
  queryCount: number,
  request_id: string,
  results: AggregatesResults[],
  resultsCount: number,
  status: string,
  ticker: string,
}

export interface AggregatesResults {
  c: number,
  h: number,
  l: number,
  n: number,
  o: number,
  t: number,
  v: number,
  vw: number,
}

export interface StockPrices {
  T: string,
  c: number,
  h: number,
  l: number,
  o: number,
  t: number,
  v: number,
  vw: number,
}

export interface TickerNews {
  count: number,
  next_url: string,
  request_id: string,
  results: Article[],
  status: string,
}

export interface Tickers {
  count: number,
  next_url: string,
  request_id: string,
  results: TickersResults[],
  status: string,
}

export interface TickersResults {
  active: boolean,
  cik: string,
  composite_figi: string,
  currency_name: string,
  last_updated_utc: string,
  locale: string,
  market: string,
  name: string,
  primary_exchange: string,
  share_class_figi: string,
  ticker: string,
  type: string,
}

export interface Article {
  amp_url: string,
  article_url: string,
  author: string,
  description: string,
  id: string,
  image_url: string,
  keywords: string[],
  published_utc: string
  publisher: Publisher,
  tickers: string[],
  title: string,
}

export interface Publisher {
  favicon_url: string,
  homepage_url: string,
  logo_url: string,
  name: string,
}
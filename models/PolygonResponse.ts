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
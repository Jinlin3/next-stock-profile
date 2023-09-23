export interface DailyOpenClose {
  status: string,
  error?: string,
  afterHours?: number,
  close?: number,
  from?: string,
  high?: number,
  low?: number,
  open?: number,
  preMarket?: number,
  symbol?: string,
  volume?: number,
}
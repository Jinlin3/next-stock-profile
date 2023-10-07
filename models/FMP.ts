export interface FMPResponse {
  companies: companyInfo[],
}

export interface companyInfo {
  symbol: string,
  name: string,
  sector: string,
  subSector: string,
  headQuarter: string,
  dateFirstAdded: string,
  cik: string,
  founded: string,
}
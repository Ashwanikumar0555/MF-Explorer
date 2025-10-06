export interface SIPResult {
  invested: number;
  returns: number;
  total: number;
  graphData?: number[];
}

export interface SWPResult {
  invested: number;
  withdrawals: number;
  balance: number;
  graphData?: number[];
}

export interface LumpsumResult {
  invested: number;
  returns: number;
  total: number;
}

export interface CompareResult {
  sip: SIPResult;
  lumpsum: LumpsumResult;
}


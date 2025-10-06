export interface SchemeNAV {
  date: string;
  nav: string;
}

export interface Scheme {
  schemeCode: string;
  schemeName: string;
  fundHouse: string;
  schemeType: string;
  category: string;
  navs: SchemeNAV[];
}

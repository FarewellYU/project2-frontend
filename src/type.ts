export interface DetailList {
    id: number;
    countryid: string;
    gold: number;
    silver: number;
    bronze: number;
    total: number;
    itemName: string;
  }
  
  export interface Country {
    gold: number;
    silver: number;
    bronze: number;
    countryname: string;
    count: number;
    rank: number;
    countryid: string;
    flagUrl: string;
    detailList: DetailList[];
  }
  
  export interface MedalTable {
    countries: Country[];
  }
  
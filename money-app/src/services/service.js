export default class SwapiService {
  _apiBase = "https://www.nbrb.by/API/ExRates/Rates/Dynamics/";
  getResource = async url => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {  
      throw new Error(`Could not fetch, received ${res.status}`);
    }
    return await res.json();
  };

  getLastWeekCurrencys = async (id, startDate, endDate) => {
    const res = await this.getResource(`${id}?startDate=${startDate}&endDate=${endDate}`);
    return res;
  };
}
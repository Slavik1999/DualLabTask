import React, {useState, useEffect, useMemo, useCallback} from 'react'
import DataRow from './components/dataRow'
import DateRow from './components/dateRow'
import {EUR_ID, USD_ID, RUR_ID} from './constants'
import {daysInMonth} from './dayInMonth'
import DateWidget from './components/dateWidget'
import CurrSearching from './components/currSearching'
import CurrService from './services/service'

import './App.css';

const App = () =>{
  const currService = useMemo(()=>new CurrService(), [])

  const [eurArr, setEurArr] = useState([]);
  const [usdArr, setUsdArr] = useState([]);
  const [rurArr, setRurArr] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [srch, setSrch] = useState('');

  useEffect(()=>{
    let date = getLastWeekDate();
    setStartDate(date.startDate);
    setEndDate(date.endDate);
  },[])

  const getCurrData = useCallback((id) =>{
    let date = getLastWeekDate();
    let sDate = startDate ? startDate : date.startDate;
    let eDate = endDate ? endDate : date.endDate;
    
    currService.getLastWeekCurrencys(id, sDate, eDate).then(data=>{
      switch(data[0].Cur_ID){
        case EUR_ID:  
          setEurArr(data);
          break;
        case USD_ID:
          setUsdArr(data);
          break;
        case RUR_ID:
          setRurArr(data);
          break;
        default:
          ;
      }
    })
  },[endDate, startDate, currService])

  useEffect(()=>{
    getCurrData(EUR_ID);
    getCurrData(USD_ID);
    getCurrData(RUR_ID);
  },[getCurrData])
  
  const getStartDate = (value) =>{
    setStartDate(value);
  }

  const getEndDate = (value) =>{
    setEndDate(value);
  }

  const getLastWeekDate = () =>{
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const endDate = `${year}-${month}-${day}`
    const startDate = `${year}-${day < 7 ? month - 1 : month}-${day < 7 ? daysInMonth(month, year) + day - 6 : day - 6}`

    return {
      startDate,
      endDate
    }
  }
  const setSearch = (value) =>{
    setSrch(value);
  }

  return (
    <div className="App">
      <CurrSearching setSearch={setSearch}/>
      <table>
      <thead>
        <DateRow startDate={startDate} endDate={endDate}/>
      </thead>
        <tbody>
        <DataRow arr={eurArr} srch={srch}/>
        <DataRow arr={usdArr} srch={srch}/>
        <DataRow arr={rurArr} srch={srch}/>
        </tbody>
      </table>
      <DateWidget endDate={endDate} startDate= {startDate} getLastWeekDate = {getLastWeekDate} getEndDate = {getEndDate} getStartDate = {getStartDate}/>
    </div>
  );
}

export default App;

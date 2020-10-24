import React from 'react'
import {daysInMonth} from '../dayInMonth'

const DateRow =({startDate, endDate}) =>{
    
    const getDateArr = (date1, date2) =>{
        const dateArr = []
        const startDate = new Date(date1);
        const endDate = new Date(date2);
        
        const startYear = startDate.getFullYear();
        const endDay = endDate.getDate() + 1;
        const endMonth = endDate.getMonth() + 1;

        let startDay = startDate.getDate();
        let startMonth = startDate.getMonth() + 1;
        
        let monthDays;
        for(startDay; (startMonth !== endMonth) || (startDay !== endDay); startDay++){
            monthDays = daysInMonth(startMonth, startYear);
            startMonth = startDay > monthDays ? startMonth + 1 : startMonth;
            startDay = startDay >  monthDays ? startDay - monthDays : startDay;
            dateArr.push(`${startDay}/${startMonth}/${startYear%1000}`)
        }
    
        return dateArr;
    }
    const arr = startDate && endDate ? getDateArr(startDate, endDate) : [];
    return(
        <tr>
            <th></th>
            {arr.map((item,index)=>(<th key = {index}>{item}</th>))}
        </tr>   
    );
}

export default DateRow;
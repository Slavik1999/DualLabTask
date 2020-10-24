import React, {useState, useEffect} from 'react'
import {currencys} from '../constants'

const DataRow =({arr, srch}) =>{
    const [display, setDisplay] = useState('');
    const [currName, setCurrName] = useState('');

    useEffect(()=>{
        arr.forEach(item=>{
            currencys.forEach(curr=>{
                if(item.Cur_ID === curr.id){
                    setCurrName(curr.name);
                }
            })
        })
    },[arr])
    
    useEffect(()=>{
        if(srch){
           if(!currName.includes(srch)){
                setDisplay('none');
           }
           else{
                setDisplay('');
           }
        }
        else{
            setDisplay('');
        }
    },[srch, currName])

    const getMaxMinValues = ()=>{
        let maxValue = 0;
        let minValue = arr[0].Cur_OfficialRate;
        arr.forEach(item=>{
            if(item.Cur_OfficialRate > maxValue){
                maxValue = item.Cur_OfficialRate;
            }
            if(item.Cur_OfficialRate < minValue){
                maxValue = item.Cur_OfficialRate;
            }
        })
        return {
            maxValue,
            minValue
        }
    }
    const getCurrencysArr = (arr)=>{
       return arr.map((item,index)=>{
            let color = 'black';
            if(item.Cur_OfficialRate === maxMinValues.maxValue){
                color = 'red'
            }
            if(item.Cur_OfficialRate === maxMinValues.minValue){
                color =  'green'
            }
            return (<td key = {index} style={{color}}>{item.Cur_OfficialRate}</td>);
        })
    }

    const maxMinValues = arr.length ? getMaxMinValues() : '';
    const currArray = arr.length ? getCurrencysArr(arr) : <td>Loading...</td>
    return(
        <tr style={{display}}>
            <td>{currName}</td>
            {currArray}
        </tr>   
    );
}

export default DataRow;
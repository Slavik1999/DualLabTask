import React from 'react';

const CurrSearching = ({setSearch}) =>{
    return <input type='text' onChange={(e)=>setSearch(e.target.value)} placeholder="Currency..."/>
}

export default CurrSearching;
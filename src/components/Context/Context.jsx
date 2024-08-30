import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [coin,setAllCoin] = useState([]);
    const [curr,setCurr] = useState({
        name:"usd",
        symbol:"$"
    })

    const fetchAllCoin = async() => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-97BC5bBULGt8fNScwhTnbqvX'}
          };
          
             await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${curr.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchAllCoin();
    },[curr])
    const contextValue = {
       curr,setCurr, coin
    }
    return (
        <CoinContext.Provider value ={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;
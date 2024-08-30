import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../components/Context/Context'
import { Link } from 'react-router-dom';

const Home = () => {
    const { coin, curr } = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [value,setValue] = useState('');

   

    useEffect(() => {
        setDisplayCoin(coin);
    }, [coin]);

    const inputHandler = (e) => {
     setValue(e.target.value);
     if(e.target.value === ""){
        setDisplayCoin(coin);
     }
    }

    const searchData =async (e) => {
     e.preventDefault();
     const searchcoin = await coin.filter((item) => {
       return item.name.toLowerCase().includes(value.toLowerCase());
     })
     setDisplayCoin(searchcoin);
    }

    return (
        <div className='home'>
            <div className="hero">
                <h1>Largest <br /> Crypto MarketPlace</h1>
                <p>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
                <form onSubmit={searchData}>
                    <input type="text" value={value} list='coinList'  onChange={inputHandler} placeholder='Search Crypto...' />
                    <datalist id='coinList'>
                       {
                       coin.map((item,index) => {
                        return <option key={index} value={item.name}/>
                       })
                       }
                    </datalist>
                    <button type='submit'>Search</button>
                </form>
            </div>
            <div className="crypto_table">
                <div className="crypto_layout">
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p style={{ textAlign: 'center' }}>24h Change</p>
                    <p style={{ textAlign: 'right' }}>Market Cap</p>
                </div>
                {
                    displayCoin.length > 0 ?  displayCoin.slice(0, 10).map((item, index) => {
                        return (
                            <Link to={`/coin/${item.id}`} className="crypto_layout" key={index}>
                                <p>{item.market_cap_rank}</p>
                                <div>
                                    <img src={item.image} alt="" />
                                    <p>{item.name + "  -  " + item.symbol}</p>
                                </div>
                                    <p>{curr.symbol} {item.current_price.toLocaleString()}</p>
                                    <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
                                        {Math.floor(item.price_change_percentage_24h * 100)/100}</p>
                                    <p style={{textAlign:'right'}}>{curr.symbol} {item.market_cap.toLocaleString()}</p>
                                
                            </Link>
                        )
                    })
                    : <h2 className='eroor'>No Result Found!</h2>
                } 
            </div>
        </div>
    )
}

export default Home

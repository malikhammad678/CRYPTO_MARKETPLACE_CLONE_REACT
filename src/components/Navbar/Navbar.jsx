import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../Context/Context'
import { Link } from 'react-router-dom'
const Navbar = () => {

   const {setCurr} = useContext(CoinContext);

   const currHandler = (e) => {
    switch (e.target.value){
      case 'usd': {
        setCurr({name:"usd",symbol:"$"})
        break;
      }
      case 'eur': {
        setCurr({name:"eur",symbol:"Є"})
        break;
      }
      case 'pkr': {
        setCurr({name:"pkr",symbol:"Rs"})
        break;
      }
      default:{
        setCurr({name:"usd",symbol:"$"})
        break;
      }
    }

   }

  return (
    <div className='navbar'>
      <Link to={"/"}>
      <img src={logo} alt="" className='logo'/>
      </Link>
      <ul>
        <Link to={"/"}><li>Home</li></Link>
        <li>Blogs</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav_right">
        <select onChange={currHandler}>
          <option value="usd">USD</option>
          <option value="eur">EURO</option>
          <option value="pkr">PKR</option>
        </select>
        <button>Sign up <img src={arrow_icon} alt="" /></button>
      </div>
    </div>
  )
}

export default Navbar

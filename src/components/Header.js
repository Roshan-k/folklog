import React from 'react'
import Logo from "../images/logo.svg";
import Biulding from "../images/building.svg";
import Adown from "../images/down-arro.svg";
import Bell from "../images/bell.svg";
import {NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className='header-inner'>
        <div className='logo-outer'>
          <div className='logo'><NavLink to="/"><img src={Logo} alt='Logo'/></NavLink></div> 
          <div className='company'><a href="/"><img src={Biulding} alt="img"/> Folklog <img src={Adown} alt="img" /></a></div>
            </div>

            <div className='notification__profile'>
              <div className='notification'><img src={Bell} alt="img"/> <span className='dot'></span></div>
              <div className='profile'>AP</div>
            </div>
        </div>
    </header>
  )
}

export default Header
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './style.css';


const Header = (props) => {

  return(
    <header className="header">
        <div style={{display: 'flex'}}>
          <div className="logo">Chat App</div>
        </div>
          
        <ul className="menu">

            
        </ul>
    </header>
   )

 }

export default Header
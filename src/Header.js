import React from 'react';
import "./Header.css";
import logo from './RFLOGO.png';
import real_logo from './real_logo.png';
import { getUser, removeUserSession } from './Utils/Common';
import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom";

function Header(props) {
  const user = getUser();

  const handleLogout = () => {
    removeUserSession();
    props.history.push('/Morning');
  }
  return <div>
    <nav className='header'>
      <Link to="/Morning">
        <img
          className="header_logo_lg"
          src={real_logo}
          alt=""
        />
      </Link>



    </nav>




  </div >;
}

export default Header;

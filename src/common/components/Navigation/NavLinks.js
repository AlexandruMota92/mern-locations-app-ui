import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';
import { AuthContext } from '../../context/auth-context';

const NavLinks = () => {
    const auth = useContext(AuthContext);

    return <ul className='nav-links'>
        <li><NavLink to='/' exact>All USERS</NavLink></li>
        {
            //TODO: clicking MY PLACES when on that page sends to / for some reason
           auth.isLoggedIn && (
            <li><NavLink to={`${auth.userId}/locations`}>MY PLACES</NavLink></li>
           )
        }
        {
           auth.isLoggedIn && (
            <li><NavLink to='/locations/new'>NEW PLACE</NavLink></li>
           )
        }
        {
           !auth.isLoggedIn && (
            <li><NavLink to='/auth'>AUTHENTICATE</NavLink></li>
           )
        }
        {
            auth.isLoggedIn && (
               <li>
                  <button onClick={
                     auth.logout
                  }>
                     LOGOUT
                  </button>
               </li>
            )
        }
    </ul>
}

export default NavLinks;
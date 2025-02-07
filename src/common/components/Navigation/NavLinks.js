import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = () => {
    return <ul className='nav-links'>
        <li><NavLink to='/' exact>All USERS</NavLink></li>
        <li><NavLink to='/1/locations'>MY PLACES</NavLink></li>
        <li><NavLink to='/locations/new'>NEW PLACE</NavLink></li>
        <li><NavLink to='/auth'>AUTHENTICATE</NavLink></li>
    </ul>
}

export default NavLinks;
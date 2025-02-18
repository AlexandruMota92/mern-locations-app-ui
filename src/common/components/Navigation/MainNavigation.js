import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import MainHeader from './MainHeader';
import Backdrop from '../UIElements/Backdrop';
import './MainNavigation.css';

const MainNavigation = props => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const handleOpenDrawer = () => { 
        setDrawerIsOpen(true) 
    }

    const handleCloseDrawer = () => {
        setDrawerIsOpen(false);
    }

    return (
        <React.Fragment>
            { drawerIsOpen && (
                <Backdrop onClick={handleCloseDrawer}/>     
            )}
            { drawerIsOpen && (
                <SideDrawer onClick={handleCloseDrawer}>
                <nav className='main-navigation__drawer-nav'>
                    <NavLinks/>
                </nav>
            </SideDrawer>     
            )}
            {/* TODO: This throws a reactDOM error, why ? */}
            {/* <SideDrawer show={drawerIsOpen} onClick={handleCloseDrawer}>
                <nav className='main-navigation__drawer-nav'>
                    <NavLinks/>
                </nav>
            </SideDrawer> */}
            <MainHeader>
                <button onClick={handleOpenDrawer} className='main-navigation__menu-btn'>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className='main-navigation__title'>
                    <Link to='/'> Your Locations </Link>
                </h1>
                <nav className='main-navigation__header-nav'>
                    <NavLinks/>
                </nav>
            </MainHeader>
        </React.Fragment>
    )    
}

export default MainNavigation;

import axios from 'axios';
import { useState, useEffect } from 'react';
import '../styles/components/header.scss';
import Button from 'react-bootstrap/Button';
import BurgerMenu from "./BurgerMenu";
import { NavLink } from "react-router-dom";
import ButtonLink from './ButtonLink';

const Header = () => {

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [open, setOpen] = useState(false);

    const setMenuState = (menuState: any) => {
        setOpen(menuState)
    }

    const updateDimensions = () => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
   
        if (width >= 959) {
            setMenuState(false)
        }
    };

    useEffect(() => {
        window.addEventListener('resize', updateDimensions);
    })

    return (
        <header className='header'>
            {/* <SimpleLink color="blue" wrapperClass="ethernel-font logo" toPath="/" text="Ethernel"/> */}
            <BurgerMenu onClickAction={ ()=> { setMenuState(!open) } } />
            <NavLink className='logo' to="/">
                <p>AOS Movie Reviews
                </p>
                </NavLink>
            <nav className={ !open ? 'closed' : '' }>
                <Button className='nav-item' variant="primary">Movies</Button>{' '}
                <ButtonLink toPath="/login" variant="primary" text="Register" wrapperClass="nav-item" />
                <ButtonLink toPath="/" variant="primary" text="Connect" wrapperClass="nav-item" /> 
                {/* <ButtonLink wrapperClass="nav-item" color="blue" toPath="/market" text="Market"/> */}
                {/* <ButtonLink wrapperClass="nav-item text-clip" color="blue" toPath="/NFT" text="NFT collection"/> */}
                {/* <ButtonLink wrapperClass="nav-item text-clip" color="blue" toPath="/transactions" text="Transactions"/> */}
                {/* <ButtonSimple onClickEvent={toConnect()} wrapperClass={"nav-item" + (isConnected() ? ' text-clip text-clip-size ' : '')} color="color"  text={isConnected() ? connectedAccounts[0] : 'Connect'} /> */}
            </nav>
        </header> 
    );
}

export default Header;
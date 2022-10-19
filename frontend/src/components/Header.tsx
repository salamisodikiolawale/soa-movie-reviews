import axios from 'axios';
import { useState, useEffect } from 'react';
import '../styles/components/header.scss';
import Button from 'react-bootstrap/Button';

import BurgerMenu from "./BurgerMenu";

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

    const isConnected = () => {
        return true
    }

    const toConnect = () => {
    }

    useEffect(() => {
        window.addEventListener('resize', updateDimensions);
    })

    return (
        <header className='header'>
            {/* <SimpleLink color="blue" wrapperClass="ethernel-font logo" toPath="/" text="Ethernel"/> */}
            <BurgerMenu onClickAction={ ()=> { setMenuState(!open) } } />
            <nav className={ !open ? 'closed' : '' }>
                <Button variant="link">Login</Button>{' '}
                {/* <ButtonLink wrapperClass="nav-item" color="blue" toPath="/market" text="Market"/> */}
                {/* <ButtonLink wrapperClass="nav-item text-clip" color="blue" toPath="/NFT" text="NFT collection"/> */}
                {/* <ButtonLink wrapperClass="nav-item text-clip" color="blue" toPath="/transactions" text="Transactions"/> */}
                {/* <ButtonSimple onClickEvent={toConnect()} wrapperClass={"nav-item" + (isConnected() ? ' text-clip text-clip-size ' : '')} color="color"  text={isConnected() ? connectedAccounts[0] : 'Connect'} /> */}
            </nav>
        </header> 
    );
}

export default Header;
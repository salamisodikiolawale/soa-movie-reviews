import { useState, useEffect, useContext } from 'react';
import '../styles/components/header.scss';
import BurgerMenu from "./BurgerMenu";
import { NavLink } from "react-router-dom";
import ButtonLink from './ButtonLink';
import ButtonAction from './ButtonAction';
import { Context } from '../context/Context';

const Header = () => {
    const { state, dispatch } = useContext(Context);

    const [width, setWidth] = useState(0);
    const [open, setOpen] = useState(false);

    const setMenuState = (menuState: any) => {
        setOpen(menuState)
    }

    const updateDimensions = () => {
        setWidth(window.innerWidth);
   
        if (width >= 959) {
            setMenuState(false)
        }
    };

    useEffect(() => {
        window.addEventListener('resize', updateDimensions);
    })

    const toDisconnect = () => {
        sessionStorage.removeItem('JWT');
        sessionStorage.removeItem('userId');
        dispatch({
            type: "SET_USER_DATA",
            payload: {
                isConnected: !!sessionStorage.getItem('JWT'),
                userInfos: {
                    userId: sessionStorage.getItem('userId'),
                    email: null,
                    username: null,
                    subscribed_newsletter: false
                }
            }
        });
    }
    

    return (
        <header className='header'>
            {/* <SimpleLink color="blue" wrapperClass="ethernel-font logo" toPath="/" text="Ethernel"/> */}
            <BurgerMenu onClickAction={ ()=> { setMenuState(!open) } } />
            <NavLink className='logo' to="/">
                <p>AOS Movie Reviews</p>
            </NavLink>
            <nav className={ !open ? 'closed' : '' }>

                <p className='username'>{state.userData.userInfos?.username}</p>
                <ButtonLink toPath="/movies" variant="primary" text="Movies" wrapperClass="nav-item" />               
                {
                    state.userData.isConnected ? 
                    <>
                        <ButtonAction action={toDisconnect} variant="primary" text="Disconnect" wrapperClass="nav-item disconnect-btn" />
                    </>
                     :
                    <>
                        <ButtonLink toPath="/authenticate" variant="primary" text="Connect" wrapperClass="nav-item" />
                    </>
                }
            </nav>
        </header> 
    );
}

export default Header;
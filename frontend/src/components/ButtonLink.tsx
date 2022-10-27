import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import '../styles/components/button-link.scss';

const ButtonLink = ({text, toPath, wrapperClass, variant} : any) => {
    return (
        <NavLink className={'button button-link ' + wrapperClass} to={toPath}>
           <Button className="button-link--inner-btn" variant={variant}>{ text }</Button>{' '}
        </NavLink>
    )
} 
export default ButtonLink;
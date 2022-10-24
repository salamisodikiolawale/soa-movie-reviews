import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";

const ButtonLink = ({text, toPath, wrapperClass, variant} : any) => {
    return (
        <NavLink to={toPath}>
           <Button className={wrapperClass} variant={variant}>{ text }</Button>{' '}
        </NavLink>
    )
} 
export default ButtonLink;
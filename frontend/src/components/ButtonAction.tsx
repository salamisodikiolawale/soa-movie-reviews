import Button from 'react-bootstrap/Button';
import '../styles/components/button-action.scss';

const ButtonAction = ({text, action, wrapperClass, variant, type} : any) => {
    return (
        <>
        <Button className={'button button-action ' + wrapperClass} onClick={ action } type={type} variant={variant}>{ text }</Button>{' '}
        </>
    )
} 
export default ButtonAction;
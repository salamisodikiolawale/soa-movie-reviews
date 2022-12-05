import Button from 'react-bootstrap/Button';
import '../styles/components/button-action.scss';

const ButtonAction = ({text, action, wrapperClass, variant} : any) => {
    return (
        <>
        <Button className={'button-action ' + wrapperClass} onClick={ action } variant={variant}>{ text }</Button>{' '}
        </>
    )
} 
export default ButtonAction;
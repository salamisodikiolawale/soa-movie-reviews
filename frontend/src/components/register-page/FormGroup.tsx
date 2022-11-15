import { Form } from 'react-bootstrap';

const FormGroup = ({label, isRequired, name, type, onChangeMethod, placeholder, text, validText, invalidText} : any) => {

    const controlIdLabel = () : string => {
        return "formBasic" + label.replace(" ", "");
    }

    const passwordRegex = (type : string) => {
        switch (type) {
            case 'password':
              return '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.^&*_=+-]).{5,}$';
            default:
              return '(.*?)';
        }
    }

    return (
        <Form.Group className="mb-3" controlId={controlIdLabel()}>
            <Form.Label>{label}</Form.Label>
            <Form.Control 
                required={isRequired}
                type={type}
                name={name}
                onChange={(e) => onChangeMethod(e)}
                placeholder={placeholder}
                pattern={passwordRegex(type)}
            />
            { !!text && 
            <Form.Text className="text-muted">
                {text}
            </Form.Text> }

            <Form.Control.Feedback type="valid">
                {validText}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                {invalidText}
            </Form.Control.Feedback>       
        </Form.Group>
    );
}
  
export default FormGroup;
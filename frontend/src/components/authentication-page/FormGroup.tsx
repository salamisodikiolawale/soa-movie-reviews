import { Form } from 'react-bootstrap';

const FormGroup = ({label, isRequired, name, type, onChangeMethod, placeholder, text, validText, invalidText, regexPattern, value} : any) => {

    const controlIdLabel = () : string => {
        return "formBasic" + label.replace(" ", "");
    }

    return (
        <Form.Group className="my-3" controlId={controlIdLabel()}>
            <Form.Label>{label}</Form.Label>
            <Form.Control 
                required={isRequired}
                type={type}
                name={name}
                onChange={(e) => onChangeMethod(e)}
                placeholder={placeholder}
                pattern={regexPattern}
                value={value}
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
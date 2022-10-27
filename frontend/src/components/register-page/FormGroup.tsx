import { Form, Button } from 'react-bootstrap';

const FormGroup = ({label, isRequired, name, type, onChangeMethod, placeholder, text, valid, invalid} : any) => {

    const controlIdLabel = () : string => {
        return "formBasic" + label.replace(" ", "");
    }

    return (
        <Form.Group className="mb-3" controlId={controlIdLabel()}>
            <Form.Label>{label}</Form.Label>
            <Form.Control 
                required={isRequired}
                type={type}
                name={name}
                onChange={(e) => onChangeMethod(e)}
                placeholder={placeholder} />
            { !!text && 
            <Form.Text className="text-muted">
                {text}
            </Form.Text> }
            <Form.Control.Feedback type="valid">
                {valid}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                {invalid}
            </Form.Control.Feedback>
        </Form.Group>
    );
}
  
export default FormGroup;
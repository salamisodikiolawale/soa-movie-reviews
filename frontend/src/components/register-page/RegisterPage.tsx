import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import '../../styles/components/register-page.scss';
import { useState } from 'react';
import FormGroup from './FormGroup';
import Spinner from 'react-bootstrap/Spinner';

const RegisterPage = () => {

    const [validated, setValidated] = useState(false);

    const [errorMsgs, setErrorMsgs] = useState([]);

    const [successMsg, setSuccessMsg] = useState(null);

    const [isLoading, setLoading] = useState(false);

    const formRegisterData = [
        {
            label: "Username",
            type: "username",
            name: "username",
            placeholder: "Enter username",
            text: "Use an unique username",
            valid: "Nice username !",
            invalid: "Please provide a username",
            isRequired: true
        },
        {
            label: "Email",
            type: "email",
            name: "email",
            placeholder: "Enter your email",
            text: "",
            valid: "",
            invalid: "Please provide a valid email",
            isRequired: true
        },
        {
            label: "Password",
            type: "password",
            name: "password",
            placeholder: "Enter your password",
            text: "Enter a 5 character password with at least one number, one uppercase letter, one lowercase letter and one special character.",
            valid: "Valid password !",
            invalid: "Please enter a valid password",
            isRequired: true
        }
    ]

    const initFormData = () => {
        const data : { [key: string]: string; } = {};
        for (let form of formRegisterData) {
            data[form.name] = '';
        }
        return data;
    }
    
    const [formData, setFormData] = useState(initFormData())

    const handleChange = (e: any) => {
        setValidated(true)
        setFormData((previousState: any) => ({
          ...previousState, 
          [e.target.name]: e.target.value
        }))
    }

    const initializeRequestMsgs = () => {
        setSuccessMsg(null);
        setErrorMsgs([]);
    }

    const registerUser = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        initializeRequestMsgs();
        const form = e.currentTarget;

        if (!form.checkValidity()) {
            e.stopPropagation();
        } else {
            try {
               const res = await axios.post(`http://127.0.0.1:3003/user/`, 
                {
                    "username": formData.username,
                    "email": formData.email,
                    "password": formData.password
                })
                if (res.status === 200) {
                    setSuccessMsg(res.data.msg)
                } else if (res.data.errors) {    
                    setErrorMsgs(res.data.errors)
                }
            } catch (e : any) {
                setErrorMsgs(e.response.data.errors)
            }
        }
        setValidated(true)
        setLoading(false);
    }

    const formItems = formRegisterData.map((currentInput) =>
        <FormGroup key={currentInput.name}
            onChangeMethod={handleChange} 
            label={currentInput.label}
            isRequired={currentInput.isRequired} 
            type={currentInput.type}
            name={currentInput.name}
            text={currentInput.text}
            placeholder={currentInput.placeholder}
            validText={currentInput.valid}
            invalidText={currentInput.invalid}
        />
    );

    const errorMessagesToDisplay = errorMsgs.map((currentError, i) => {
        return <Alert key={i} variant="danger">
            {currentError["msg"]}
        </Alert>
    });

    return (
        <div className="register-page mx-auto">
            <h1>Register</h1>

            <Form noValidate validated={validated} onSubmit={(e) => registerUser(e)}>
                <div className="my-3">
                    { isLoading && 
                    <div className='loading-spinner'>
                        <Spinner animation="border" role="status" />
                    </div>
                    }
                    {
                    !!successMsg ? 
                    <Alert variant="success">
                        {successMsg}
                    </Alert> : errorMessagesToDisplay 
                    }
                </div>
                {formItems}
                {/* TODO to change later */}
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    );
}

export default RegisterPage;
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../../styles/components/register-page.scss';
import { useState } from 'react';
import FormGroup from './FormGroup';

const RegisterPage = () => {

    const [validated, setValidated] = useState(false);

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
        console.log(formData)
        setFormData((previousState: any) => ({
          ...previousState, 
          [e.target.name]: e.target.value
        }))
    }

    // TODO use password check
    const isPasswordValid = (password: string) => {
        var re = /^(?=.*\d)(?=.*[!@#$%.^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
        console.log(re.test(password))
        return re.test(password);
    }

    const registerUser = async (e: any) => {
        e.preventDefault();
        const form = e.currentTarget;
        setValidated(true)
        if (!form.checkValidity()) {
            e.stopPropagation();
        } else {
            const res = await axios.post(`http://127.0.0.1:3003/user/`, 
            {
                "username": formData.username,
                "email": formData.email,
                "password": formData.password
            })
            console.log(res.data)
        }
        
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
            valid={currentInput.valid}
            invalid={currentInput.invalid} />
    );

    return (
        <div className="register-page">
            <Form noValidate validated={validated} onSubmit={(e) => registerUser(e)}>
                {formItems}
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    );
}

export default RegisterPage;
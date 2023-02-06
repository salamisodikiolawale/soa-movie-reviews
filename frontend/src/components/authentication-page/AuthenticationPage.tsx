import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import '../../styles/components/authentication-page.scss';
import { useContext, useEffect, useState } from 'react';
import FormGroup from './FormGroup';
import Spinner from 'react-bootstrap/Spinner';
import ButtonAction from '../ButtonAction';
import { FormInputData } from '../../types/FormInputData';
import { Context } from '../../context/Context';
import { useNavigate } from "react-router-dom";
import BackLink from '../BackLink';

enum PageContent {
    LOGIN,
    REGISTER
}

const AuthenticationPage = () => {

    const navigateTo = useNavigate();

    const { dispatch } = useContext(Context);

    const passwordRegex = () => {
        return '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.^&*_=+-]).{5,}$';
    }

    const loginFormRegisterData : FormInputData[] = [
        {
            label: "Username or email",
            type: "identifier",
            name: "identifier",
            placeholder: "Enter username or email",
            text: "",
            valid: "",
            invalid: "Please enter your email or username to login",
            isRequired: true
        },
        {
            label: "Password",
            type: "password",
            name: "password",
            placeholder: "Enter your password",
            text: "",
            valid: "",
            invalid: "Please enter your password to login",
            isRequired: true
        }
    ]

    const registerFormRegisterData : FormInputData[] = [
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
            isRequired: true,
            regexPattern : passwordRegex()
        }
    ]

    const loginUser = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        initializeRequestMsgs();
        const form = e.currentTarget;

        if (!form.checkValidity()) {
            e.stopPropagation();
        } else {
            try {
               const res = await axios.post(`http://localhost:3003/user/login`, 
                {
                    "identifier": formData.identifier,
                    "password": formData.password   
                })
                if (res.status === 200) {
                    sessionStorage.setItem('JWT', res.data.token);
                    sessionStorage.setItem('userId', res.data.user.userId);
                    dispatch({
                        type: "SET_USER_DATA",
                        payload: {
                            isConnected: !!sessionStorage.getItem('JWT'),
                            userInfos: {
                                userId: res.data.user.userId,
                                username: res.data.user.username,
                                email: res.data.user.email,
                            }
                        }
                    });
                    setSuccessMsg(res.data.msg)
                    navigateTo('/');
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

    const registerUser = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        initializeRequestMsgs();
        const form = e.currentTarget;

        if (!form.checkValidity()) {
            e.stopPropagation();
        } else {
            try {
               const res = await axios.post(`http://localhost:3003/user/`, 
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

    const [validated, setValidated] = useState(false);

    const [errorMsgs, setErrorMsgs] = useState([]);

    const [successMsg, setSuccessMsg] = useState(null);

    const [isLoading, setLoading] = useState(false);
 
    const pagesType = {
        login : {
            pageContent: PageContent.LOGIN,
            pageTitle : 'Login',
            submitButton : 'Login',
            formGroupData : loginFormRegisterData,
            ctaButtonText : "Not registered yet ? Create a new account."
        },
        register : {
            pageContent: PageContent.REGISTER,
            pageTitle : 'Register',
            submitButton : 'Register',
            formGroupData : registerFormRegisterData,
            ctaButtonText : "Already registered ? Login."
        },
    }

    const submitMethod = (e : any) => {
        return isLoginPage() ? loginUser(e) : registerUser(e);
    }
    
    const [pageData, setPageData] = useState(pagesType.login);

    const initFormData = (formGroupData : FormInputData[]) => {
        const data : { [key: string]: string; } = {
            identifier: '',
            password: '',
            email: '',
            username: ''
        };
        for (let form of formGroupData) {
            data[form.name] = '';
        }
        return data;
    }
    const [formData, setFormData] = useState(initFormData(pageData.formGroupData));

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

    const formItems = pageData.formGroupData.map((currentInput) => 
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
            regexPattern={currentInput.regexPattern ?? '(.*?)'}
            value={formData[currentInput.name]}
        />
    );

    const errorMessagesToDisplay = errorMsgs.map((currentError, i) => {
        return <Alert key={i} variant="danger">
            {currentError["msg"]}
        </Alert>
    });
    
    const isLoginPage = () => {
        return pageData.pageContent === PageContent.LOGIN
    }

    const changePageContent = () => {
        return isLoginPage() ? setPageData(pagesType.register) : setPageData(pagesType.login);
    }

    useEffect(() => {
        setValidated(false);
        initializeRequestMsgs();
        setFormData(initFormData(pageData.formGroupData));
    }, [pageData])

    return (
        <div className="authentication-page">
            <BackLink />
            <h1> { pageData.pageTitle } </h1>

            <Form noValidate validated={validated} onSubmit={(e) => submitMethod(e)}>
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
                    { pageData.pageTitle }
                </Button>
                <ButtonAction type="button" text={ pageData.ctaButtonText } wrapperClass="link" action={() => changePageContent()} variant=""></ButtonAction>
            </Form>
        </div>
    );
}

export default AuthenticationPage;
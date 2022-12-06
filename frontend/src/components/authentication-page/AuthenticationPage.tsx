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
               const res = await axios.post(`http://127.0.0.1:3003/user/login`, 
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
                                userId: res.data.user.userId
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

    const [validated, setValidated] = useState(false);

    const [errorMsgs, setErrorMsgs] = useState([]);

    const [successMsg, setSuccessMsg] = useState(null);

    const [isLoading, setLoading] = useState(false);

    const [pageContent, setPageContent] = useState(PageContent.LOGIN);

    const pageContentData = {
        login : {
            pageTitle : 'Login',
            submitButton : 'Login',
            formGroupData : loginFormRegisterData,
            ctaButtonText : "Not registered yet ? Create a new account."
        },
        register : {
            pageTitle : 'Register',
            submitButton : 'Register',
            formGroupData : registerFormRegisterData,
            ctaButtonText : "Already registered ? Login."
        },
    }

    const submitMethod = (e : any) => {
        return isLoginPage() ? loginUser(e) : registerUser(e);
    }
    
    const [pageData, setPageData] = useState(pageContentData.login);
    const initFormData = () => {
        const data : { [key: string]: string; } = {};
        for (let form of pageData.formGroupData) {
            data[form.name] = '';
        }
        return data;
    }
    const [formData, setFormData] = useState(initFormData());

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
        return pageContent === PageContent.LOGIN
    }
    const changePageContent = () => {
        isLoginPage() ? setPageContent(PageContent.REGISTER) : setPageContent(PageContent.LOGIN)
    }

    useEffect(() => {
        initializeRequestMsgs();
        isLoginPage() ? setPageData(pageContentData.login) : setPageData(pageContentData.register);
        setFormData(initFormData());
        setValidated(false);
    }, [pageContent])

    return (
        <div className="authentication-page">
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
                <ButtonAction text={ pageData.ctaButtonText } wrapperClass="link" action={() => changePageContent()} variant=""></ButtonAction>
            </Form>
        </div>
    );
}

export default AuthenticationPage;
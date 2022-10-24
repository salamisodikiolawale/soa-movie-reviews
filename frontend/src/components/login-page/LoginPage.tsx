import { Form, Button } from 'react-bootstrap';
import '../../styles/components/login-page.scss';

const LoginPage = () => {

    const registerUser = () => {
        
    }

    return (
        <div className="login-page">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" />
                    <Form.Text className="text-muted">
                    Use an unique username
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    <Form.Text className="text-muted">
                        Enter a 5 character password with at least one number, one uppercase letter, one lowercase letter and one special character.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={() => registerUser()}>
                    Register
                </Button>
            </Form>
        </div>
    );
}

export default LoginPage;
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import loginApi from '../Utils/loginApi';

function Login() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState("");

    const success = async (text) => {
        console.log("Authenticated");
        await localStorage.setItem("loginToken", text.access);
        window.location = '/'
    }

    const tryLogin = async (e) => {
        e.preventDefault();
        console.log("Logging in with", username, password);
        await loginApi(username, password, success, (text) => {setMessage(text)});
    }

    return (
        <div style={{width: "400px", margin: "auto", marginTop: "200px", boxShadow: "5px 5px 20px #cccccccc", padding: "1em"}}>
            <Form>
                
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control onChange={(e) => {setUsername(e.target.value)}} type="text" placeholder="User Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password" />
                    {message}
                </Form.Group>

                <Button onClick={tryLogin} variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    );
}

export default Login;
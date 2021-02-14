import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/userActions';

export interface LoginPageProps {
    user: {
        name: string,
        score: number
    },
    loginUser: Function
}




const LoginPage: React.FC<LoginPageProps> = (props: LoginPageProps) => {
    const [userName, setUserName] = useState<string>(props.user.name)
    const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        props.loginUser({
            name: userName,
            score: 0
        })
    };


    return (
        <div className="container">
            <Form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => onSubmitForm(event)}
            >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control onChange={event => setUserName(event.target.value)} type="text" placeholder="Enter Your Name" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                 </Button>
            </Form>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    user: state.user
})



export default connect(mapStateToProps, { loginUser })(LoginPage);
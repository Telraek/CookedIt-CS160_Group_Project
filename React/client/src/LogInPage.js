import React, { useEffect, useState } from 'react'; // These allow us to modify the view of the page.
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import history from "./history"
import App from './App';
import Button from 'react-bootstrap/Button'

//From Formik "Reducing Boilerplate" portion of overview with slight modifications
const LogInPage = () => {

    const [validation, setValidation] = useState(false);

    const [errors, setErrors] = useState()
    //can move into validation step later, currently a function for ease of structure
    const LoginSuccess = () =>{
            history.push("/profile")
            history.go(0)
            console.log(localStorage.getItem("token"))
    }

    
    //Will verify email and password with backend Authentification API
    const postRequest = async (values) => {
        const location = 'http://localhost:5000/api/auth'

        //JSON object to be sent to backend for verification
        const settings = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email: values.email,
                password: values.password

            })
        };
        try{

            let fetchResponse = await fetch(location,settings)
            let data = await fetchResponse.json()
            console.log(data)
            //if we are verified, store auth token and redirect to profile page
            if(fetchResponse.status === 200)
            {
                LoginSuccess()
                localStorage.setItem("token", data.token) //not very security oriented, but simple
                console.Log(localStorage.getItem("token"))

            }
            else if(fetchResponse.status === 400)
            {
                setErrors("Invalid Credentials")
            }
            return data;

        }catch(e){
            return e;
        }
    }


    //modified Formik form
    //Will ask for an email and a password with some specific formatting
    return(
    <Container>
        <div style={{display: 'flex', justifyContent: 'center'}}>Login Page</div>

        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Formik
            initialValues={{ email: '', password: '' }}


            validate={values => {
                const errors = {};
                if (!values.email) {
                errors.email = 'Required';
                } else if (
                !/^[A-Z0-9._%+-]+[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setErrors("")
                postRequest(values)
                setSubmitting(false)

            }}//validation here. waiting for backend
            >


            {({ isSubmitting }) => (                //error message and requirements 
                                                    //for form fillout
            <React.Fragment>
                <Form>
                <div>{errors}</div>
                <Field type="email" name="email" />
                <div></div>
                <ErrorMessage name="email" component="div" />
                <Field type="password" name="password" />
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <ErrorMessage name="password" component="div" />
                <Button type="submit"variant = "dark" disabled={isSubmitting}>
                    Log In
                </Button>
                </div>
                </Form>
                </React.Fragment>
            )}
            </Formik>

    </div>
  </Container>
  
)};


export default LogInPage;

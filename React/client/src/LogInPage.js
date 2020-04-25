import React, { useEffect, useState } from 'react'; // These allow us to modify the view of the page.
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import history from "./history"
import App from './App';


//From Formik "Reducing Boilerplate" portion of overview with slight modifications
const LogInPage = () => {

    const [validation, setValidation] = useState(false); 
    //can move into validation step later, currently a function for ease of structure
    const LoginSuccess = () =>{
            history.push("/profile")
            history.go(0)
            console.log(localStorage.getItem("token"))
    }

    
    const postRequest = async (values) => {
        const location = 'http://localhost:5000/api/auth'
        const settings = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email: 'test.subject1@gmail.com',
                password: '123456789'

            })
        };
        try{
            let fetchResponse = await fetch(location,settings)
            let data = await fetchResponse.json()
            //console.log(data)
            if(fetchResponse.status === 200)
            {
                setValidation(true)
                LoginSuccess()
                localStorage.setItem("token", data.token) //not very security oriented, but simple
                console.Log(localStorage.getItem("token"))
            }
            return data;

        }catch(e){
            return e;
        }
    }
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
                postRequest(values)
            }}//validation here. waiting for backend
            >


            {({ isSubmitting }) => (                //error message and requirements 
                                                    //for form fillout
            <React.Fragment>
                <Form>
                <Field type="email" name="email" />
                <div></div>
                <ErrorMessage name="email" component="div" />
                <Field type="password" name="password" />
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <ErrorMessage name="password" component="div" />
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
                </div>
                </Form>
                </React.Fragment>
            )}
            </Formik>

    </div>
  </Container>
  
)};


export default LogInPage;

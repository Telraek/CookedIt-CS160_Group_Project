import React, { useEffect, useState } from 'react'; // These allow us to modify the view of the page.
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import history from "./history"


//From Formik "Reducing Boilerplate" portion of overview with slight modifications
const LogInPage = () => {


    //can move into validation step later, currently a function for ease of structure
    const LoginSuccess = () =>{
            history.push("/profile")
            history.go(0)
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
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    LoginSuccess()
                    setSubmitting(false);
                  }, 400);
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

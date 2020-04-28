import React, { useEffect, useState } from 'react'; // These allow us to modify the view of the page.
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import history from "./history"
import App from './App';
import Button from 'react-bootstrap/Button'
import { Formik, Form, Field, ErrorMessage } from 'formik';
export const Signup = () =>{

        const [email, setEmail] = useState("")
        const [password, setPassword]=useState("")


    const SignupSuccess = () =>{
        history.push("/login")
        history.go(0)
    }




    const SignUpSubmission = async (values) =>{
        const location = 'http://localhost:5000/api/users'

        //JSON object to be sent to backend for verification
        const settings = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name:values.name,
                email: values.email,
                password: values.password

            })
        };
        try{

            let fetchResponse = await fetch(location,settings)
            let data = await fetchResponse.json()

            //if we are verified, store auth token and redirect to profile page
            if(fetchResponse.status === 200)
            {
                SignupSuccess()
            }
            return data;

        }catch(e){
            return e;
        }



    }

    const signUpForm = (
        <Formik
        initialValues={{name: '', email: '', password: '' }}
        
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
            console.log(SignUpSubmission(values))
            setTimeout(() => {
            setSubmitting(false);
              }, 400);
        }}//validation here. waiting for backend
        >
        {({ isSubmitting }) => (                //error message and requirements 
                                                //for form fillout
        <React.Fragment>
            <Form>
            <div>Name</div>
            <Field type="name" name="name" />
            <div>Email Address</div>
            <Field type="email" name="email" />
            <div></div>
            <ErrorMessage name="email" component="div" />
            <div>Password</div>
            <Field type="password" name="password" />
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <ErrorMessage name="password" component="div" />
            <Button type="submit"variant = "dark" disabled={isSubmitting}>
                Sign up
            </Button>
            </div>
            </Form>
            </React.Fragment>
        )}
        </Formik>
    );



    return(
        <React.Fragment>
        <div style={{display: 'flex', justifyContent: 'center'}}>Sign up Page</div>

        <div style={{display: 'flex', justifyContent: 'center'}}>{signUpForm}</div>
        </React.Fragment>
        


    );
}

export default Signup
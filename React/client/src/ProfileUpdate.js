import React, { useEffect, useState } from 'react'; // These allow us to modify the view of the page.
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import history from "./history"
import App from './App';
import Button from 'react-bootstrap/Button'
import { Formik, Form, Field, ErrorMessage } from 'formik';
export const ProfileUpdate = () =>{

    const [errors, setErrors]=useState("")

const updateSuccess = () =>{
    history.push("/profile")
    history.go(0)
}




const updateProfile = async (values) =>{
    const location = 'http://localhost:5000/api/profile'

    //JSON object to be sent to backend for verification
    const settings = {
        method: 'post',
        headers: {
            'Authorization':localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            'bio': values.bio,
            'location': values.location,
            'recipes': "general, kenobi"
        })
    };
    try{

        let fetchResponse = await fetch(location,settings)
        let data = await fetchResponse.json()

        //if we are verified, store auth token and redirect to profile page
        if(fetchResponse.status === 200)
        {
            updateSuccess(true)
        }
        else{
            setErrors("You are not logged in")
        }
        return data;

    }catch(e){
        return e;
    }



}
const signUpForm = (
    <Formik
    initialValues={{bio: '', location: '', }}
    
    onSubmit={(values, { setSubmitting }) => {
        console.log(updateProfile(values))
        setTimeout(() => {
        setSubmitting(false);
          }, 400);
    }}//validation here. waiting for backend
    >
    {({ isSubmitting }) => (                //error message and requirements 
                                            //for form fillout
                                            //Note to self: figure out how to get 
                                            //text area working with Formik
    <React.Fragment>
        <Form>
            <div>{errors}</div>
        <Field type="bio" name="bio"/> 
        <div></div>
        <Field type="location" name="location" />
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button type="submit"variant = "dark" disabled={isSubmitting}>
            Update Profile
        </Button>
        </div>
        </Form>
        </React.Fragment>
    )}
    </Formik>
);



return(
    <React.Fragment>
    <div style={{display: 'flex', justifyContent: 'center'}}>Update Profile</div>

    <div style={{display: 'flex', justifyContent: 'center'}}>{signUpForm}</div>
    </React.Fragment>
    


);

}
export default ProfileUpdate;
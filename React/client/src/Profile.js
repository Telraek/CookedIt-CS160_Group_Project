import React, { useEffect, useState } from 'react'; // These allow us to modify the view of the page.
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import history from "./history"
import Button from 'react-bootstrap/Button'

export const Profile = () =>{
    const profilePath = 'http://localhost:5000/api/profile/me';
    const [name, setName] = useState()
    const [recipes, setRecipes] = useState()
    const [bio, setBio] = useState()
    const [location, setLocation] = useState()
    const[validation, setValidation] = useState(false)

    useEffect(() => {
        fetchData();
      },[] );


      const fetchData = async () =>{
          console.log(localStorage.getItem("token"))
          const settings = {
            headers: {
                Authorization:localStorage.getItem("token")
            },
          }


        var response = await fetch(profilePath,settings)
        const data =  await response.json();
        console.log(data)
        if(response.ok){
            console.log(data)
            setValidation(true)
            setupProfile(data)
        }
    }
    const setupProfile = (data) =>
    {
        setData(setName,data.user.name)
        setData(setRecipes, data.recipes)
        setData(setBio, data.bio)
        setData(setLocation, data.location)
    }
    const setData = (state, data) =>{
        state(data)
    }


    const redirectToLogIn = () =>
    {
        history.push("/login")
        history.go(0)

    }

    const redirectToSignUp = () =>
    {
        history.push("/signup")
        history.go(0)

    }
    const profileView =
        (
            <React.Fragment>
                <div>Recipes</div>
                <div>{recipes}</div>
                <p></p>
                <div>{bio}</div>
                <p></p>
                <div>{location}</div>
                <p></p>
                <div>{name}</div>
            </React.Fragment>
        );

    const logInView = 
    (
        <React.Fragment>
        <div>Please Log In</div>
        <Button variant = "link" onClick={redirectToLogIn}> Login</Button>
        <Button variant = "link" onClick={redirectToSignUp}> Signup</Button>
        </React.Fragment>
    );

return (
    <div>
        {validation ? (profileView): //if we're validated, render page
        (logInView)                 //otherwise, render a Please Log In Page
        } 
    </div>


);

}

export default Profile;
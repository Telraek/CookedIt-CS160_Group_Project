import React, { useEffect, useState } from 'react'; // These allow us to modify the view of the page.
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import history from "./history"

export const Profile = () =>{
    const profilePath = 'http://localhost:5000/api/profile/me';
    const [name, setName] = useState()
    const [recipes, setRecipes] = useState()
    const [bio, setBio] = useState()
    const [location, setLocation] = useState()
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
return (
<React.Fragment>
<div>{recipes}</div>
<div>{bio}</div>
<div>{location}</div>
<div>{name}</div>
</React.Fragment>

);

}

export default Profile;
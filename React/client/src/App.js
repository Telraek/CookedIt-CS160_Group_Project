import React, { useEffect, useState } from 'react'; // These allow us to modify the view of the page.
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Link from 'react-router-dom/Link'
import Button from 'react-bootstrap/Button'

import {Home} from './Home'
import {SearchResult} from './SearchResult'
import {PostPage} from './PostPage'
import ProfilePage from './Profile'
import {FourOhFour} from './FourOhFour'
import {Layout} from './StyledComponents/Layout'
import LogInPage from './LogInPage';
import Signup from './Signup';
import ProfileUpdate from './ProfileUpdate';
import CreatePost from './CreatePost';
function App() {


  // This chunk modifies the state
  useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
     try{
      //call to Express 
      const result = await fetch('http://localhost:5000/'); //we wait for express to do something
      const resultOfResult = await result.text(); //to unpack promise
      //replace .text with .json later on
          if(result.ok){
              console.log(resultOfResult); 
              //setName(resultOfResult); //changes state inside React
                                      // This will change state based on values
          }
      }
     catch (e){
      console.error(e);
      }
    }



  return (
    <React.Fragment>



      <Layout>
        <Router>

        <Link to = "">
          <Button variant = "primary"> Home</Button>{''}
        </Link>


        <Link to = "/login">
          <Button variant = "primary"> Login</Button>{''}
        </Link>

        <Link to = "/profile">
          <Button variant = "primary"> Profile</Button>{''}
        </Link>

        <Link to = "/post">
          <Button variant = "primary"> Post Example</Button>{''}
        </Link>

        <Link to = "/signup">
          <Button variant = "primary"> Signup</Button>{''}
        </Link>
        
        <Link to = "/profile/update">
          <Button variant = "primary"> Profile update</Button>{''}
        </Link>

        <Link to = "/post/create">
          <Button variant = "primary"> Create Post</Button>{''}
        </Link>

          <Switch>
            <Route exact path = "/" component={Home} />
            <Route exact path = "/login" component={LogInPage} />
            <Route exact path = "/Profile" component={ProfilePage} />
            <Route exact path = "/result" component={SearchResult} />
            <Route exact path = "/post" component={PostPage} />
            <Route exact path = "/signup" component={Signup} />
            <Route exact path = "/profile/update" component={ProfileUpdate} />
            <Route exact path = "/post/create" component={CreatePost} />
            <Route component={FourOhFour} />
          </Switch>
        </Router>
      </Layout>
    </React.Fragment>
  );
}

export default App;

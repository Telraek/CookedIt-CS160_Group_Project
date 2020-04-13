import React, { useEffect, useState } from 'react'; // These allow us to modify the view of the page.
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


import {Home} from './Home'
import {SearchResult} from './SearchResult'
import {PostPage} from './PostPage'
import {FourOhFour} from './FourOhFour'
import {Layout} from './StyledComponents/Layout'

function App() {

  const [name, setName] = useState("before hw"); //a variable and function

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
              setName(resultOfResult); //changes state inside React
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
          <Switch>
            <Route exact path = "/" component={Home} />
            <Route exact path = "/result" component={SearchResult} />
            <Route exact path = "/post" component={PostPage} />
            <Route component={FourOhFour} />
          </Switch>
        </Router>
      </Layout>
    </React.Fragment>
  );
}

export default App;

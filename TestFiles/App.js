import React, { useEffect, useState } from 'react'; // These allow us to modify the view of the page.
import logo from './logo.svg';
import './App.css';

function App() {
    
    const [name, setName] = useState("before hw"); //a variable and function

    // This chunk modifies the state
    useEffect(() => {
        fetchData();
      }, []);

      const fetchData = async () => {
       try{
        //call to Express 
        const result = await fetch('http://localhost:3001/'); //we wait for express to do something
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
      };

//States get rendered on return
//
  return (
    <div>{name}</div>
  );
}

export default App;

//React on heroku

//Express mongoDB on separate server

//React and Express separate ports to make it work

//install cors to work with React in Express


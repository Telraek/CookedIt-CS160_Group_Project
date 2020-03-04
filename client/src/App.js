import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    
    const [name, setName] = useState("before hw");
    // This chunk modifies the state
    useEffect(() => {
        fetchData();
      }, []);

      const fetchData = async () => {
       try{
        //call to Express 
        const result = await fetch('http://localhost:3001/');
        const resultOfResult = await result.text(); //to unpack promise
        //replace .text with .json
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

//React and Express separate ports

//iunstall cors to work with React in Express

//install hook
import React, { useEffect, useState } from 'react'; // These allow us to modify the view of the page.
import './App.css';
import styled from 'styled-components'
import { render } from '@testing-library/react';

//this const is probably not the best way to go about this?
export const PostPage= () => {

        //a [variable, function] pair for various JSON data

    //Properties
    const [id, setID] = useState("id"); 
    const [name, setName] = useState("name"); 
    const [difficulty, setDifficulty] = useState("difficulty");
    const [duration, setDuration] = useState("duration");
    const [stars, setStars] = useState("stars");
    const [starCount, setStarCount] = useState(0);
    const [tags, setTags] = useState([]);


    //Recipe
    const [ingredientList, setIngredients] = useState([]);
    //const [ingredientMeasurement, setMeasurements] = useState([])
    const [appliances, setAppliances] = useState([])
    const [instructions, setInstructions] = useState([])


    //These are hardcoded localhost routes meant to test GET requests for frontend while waiting on backend development
    //Property Routes
    
    //Recipe Routes
    var postRoute = 'http://localhost:5000/api/posts/5e9f7eeaa361d697cbaf60aa';


    //Recipe Routes

    //we will call this whenever there is some change the the page, basically side effects occuring (e.g. rendering the page or updating data)
    useEffect(() => {
        fetchData();
      },[] );

    //we use an async function call to our backend
    const fetchData = async () => {
    try{
    }
    catch (e){
        console.error(e);
        }
    };    


    //Pass in a backend REST API route and a setState function call
    //Will grab any type of data from the backend and change state of variables
    //Remember to keep state variables and json object types the same or else something will break
    const fetchDatum = async (loc,func) =>{
        var response = await fetch(loc)
        const data =  await response.json();
        if(response.ok){
            console.log(data)
            func(data)   
        }
    }



    //Will render out an array into a tag-like button
    const renderTags = (tagArr) =>
    {
        return tagArr.map((item,index)=>
        <TagButton>
            <div>
                {item}
            </div>
        </TagButton>
        )
    }


    //Will render out a generic List
    const renderList = (IngArr) =>
    {
        return IngArr.map((item,index)=>
            <div>{item}</div>
        )

    }

    //rendering
    //TODO: replace hardcoded tag array values with loop
    return (
        <React.Fragment>
            <Title>
                Post Page
            </Title>

            <Wrapper>
                <NameBlock><b>{name}</b></NameBlock>

                <IngredientWrapper>
                    <div><i>{difficulty}</i></div>
                    <div><i>{duration}</i></div>
                    <div><i>{stars} stars</i></div>
                    <LineBreak></LineBreak>
                    <b>Ingredient List</b>
                    {renderList(ingredientList)}
                    <LineBreak></LineBreak>
                    <b>Appliances</b>
                    {renderList(appliances)}
                    <LineBreak></LineBreak>
                    <b> Instructions </b>
                    {renderList(instructions)}
                </IngredientWrapper>

                <div>{renderTags(tags)}</div>

            </Wrapper>


        </React.Fragment>
    );
}


export default PostPage;




//Styled-component functions
//fancy formatting and rendering with the power of CSS and HTML all wrapped into React 
const TagButton = styled.button`
font-family: Arial, Helvetica, sans-serif;
font-size: 1em;
margin: 0.5em;
padding: 0.05em 0.01em
border-radius: 4px;
border: 5px solid #fcd0c7;
color:red;
`;

const NameBlock = styled.h2`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 2em;
    text-align: center;
    padding: 0em;
    background-color: white;
    color: black;

`;

const Wrapper = styled.section`
    padding: 4em;
    background: #fceec7;

`;

const IngredientWrapper = styled.section`
    padding:1em;
    background:white;

`

const Title = styled.h1`
font-family: Arial, Helvetica, sans-serif;
font-size: 2em;
text-align: center;
color: orange;
`
const LineBreak = styled.hr`
border:1;
color:red;
height: 5px;

`
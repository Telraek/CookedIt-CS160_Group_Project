import React, { useEffect, useState } from 'react'; // These allow us to modify the view of the page.
import './App.css';
import styled from 'styled-components'
import { render } from '@testing-library/react';

//this const is probably not the best way to go about this?
export const PostPage= () => {

        //a [variable, function] pair for various JSON data

    //Properties
    const [name, setName] = useState("null"); 
    const [difficulty, setDifficulty] = useState("null");
    const [duration, setDuration] = useState("0");
    const [stars, setStars] = useState("null");
    const [tags, setTags] = useState([]);


    //Recipe
    const [ingredientList, setIngredients] = useState([]);
    const [ingredientMeasurement, setMeasurements] = useState([])
    const [appliances, setAppliances] = useState([])
    const [instructions, setInstructions] = useState([])



    //we will call this whenever there is some change the the page, basically side effects occuring (e.g. rendering the page or updating data)
    useEffect(() => {
        fetchData();
      },[] );

    //we use an async function call to our backend
    const fetchData = async () => {
    try{
        //call to Express 
        var response = await fetch('http://localhost:5000/api/posts'); //fetch data from api route
        const data =  await response.json(); //we have to wait for the promise to resolve before working with the data
        //once we get a response and the promise is cleared, do stuff
            if(response.ok){
                setData(data)   
            }
        }

    catch (e){
        console.error(e);
        }
    };

    const setData =(data) =>{
        console.log(data); //check our JSON
        setName(data.properties.name)
        setDifficulty(data.properties.difficulty)
        setDuration(data.properties.duration)
        setStars(data.properties.avg_stars)
        setTags(data.properties.tags)

        setIngredients(data.recipe.ingredients.ingredient_list)
        setMeasurements(data.recipe.ingredients.ingredient_measurements)
        setAppliances(data.recipe.appliances)
        setInstructions(data.recipe.instructions)

    }

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

    const renderIngredients = (IngArr) =>
    {
        return IngArr.map((item,index)=>
        <divBlock>
            <div>{item}</div>
        </divBlock>
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
                <div>{difficulty}</div>
                <div>{duration}</div>
                <div>{stars} </div>

                
                <IngredientWrapper>
                    <b>Ingredient List</b>
                    {renderIngredients(ingredientList)}

                    <b>Appliances</b>
                    {renderIngredients(appliances)}
                    <b> Instructions </b>
                    {renderIngredients(instructions)}
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
font-size: 1em;
margin: 1em;
padding: 0.15em 0.1em
border-radius: 1px;
border: 1px solid red;
color:red;
background: transparent
`;

const NameBlock = styled.h2`
    font-family: verdana;
    font-size: 2em;
    text-align: center;
    padding: 0em;
    background-color: white;
    color: black;

`;

const Wrapper = styled.section`
    padding: 4em;
    background: #f7cb79;

`;

const IngredientWrapper = styled.section`
    padding:1em;
    background:white;

`

const Title = styled.h1`

font-size: 2em;
text-align: center;
color: orange;
`

import React, { useEffect, useState } from 'react'; // These allow us to modify the view of the page.
import './App.css';
import styled from 'styled-components'

//this const is probably not the best way to go about this?
export const PostPage= () => {

        //a [variable, function] pair for various JSON data
    const [name, setName] = useState("null"); 
    const [difficulty, setDifficulty] = useState("null");
    const [duration, setDuration] = useState("0");
    const [stars, setStars] = useState("null");
    const [tags, setTags] = useState("null");


    //we will call this whenever there is some change the the page, basically side effects occuring (e.g. rendering the page or updating data)
    useEffect(() => {
        fetchData();
      }, []);

    //we use an async function call to our backend
    const fetchData = async () => {
    try{
        //call to Express 
        var response = await fetch('http://localhost:5000/api/posts'); //fetch data from api route
        const data =  await response.json(); //we have to wait for the promise to resolve before working with the data
        //once we get a response and the promise is cleared, do stuff
            if(response.ok){   
                console.log(data); //check our JSON
                setName(data.properties.name)
                setDifficulty(data.properties.difficulty)
                setDuration(data.properties.duration)
                setStars(data.properties.avg_stars)
                setTags(data.properties.tags)
            }
        }

    catch (e){
        console.error(e);
        }
    };

    //rendering
    //TODO: replace hardcoded tag array values with loop
    return (
        <React.Fragment>
            <Wrapper>
                        
                <divBlock>{name}</divBlock>
                <div>{difficulty}</div>
                <div>{duration}</div>
                <div>{stars} </div>

                <div>
                    <TagBlock>
                        {tags[0]}, {tags[1]}
                    </TagBlock>
                    </div>


            </Wrapper>

        </React.Fragment>
    );
}


export default PostPage;




//Styled-component functions
//fancy formatting and rendering with the power of CSS and HTML all wrapped into React 
const TagBlock = styled.button`
font-size: 1em;
margin: 1em;
padding: 0.25em 1em
border: 2px solid orange;
border-radius: 3px;
color:orange;
background:transparent
`;

const divBlock = styled.div`
    text-align:center;
    background-color: orange;
    color: orange;

`;

const Wrapper = styled.section`
    padding: 4em;
    background: };

`;

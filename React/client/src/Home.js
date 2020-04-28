import React, { useEffect, useState } from 'react'; // These allow us to modify the view of the page.
import './App.css';
import styled from 'styled-components'

export const Home = () =>{



    //const [posts, setPosts] = useState([])
    const [titles, setTitles] = useState([])
    const [posts, setPosts]=  useState([])
    //we will call this whenever there is some change the the page, basically side effects occuring (e.g. rendering the page or updating data)
    useEffect(() => {
        fetchData();
      },[] );

      const fetchData = async () =>{
        const location = 'http://localhost:5000/api/posts'
        var response = await fetch(location)
        const data =  await response.json();
        if(response.ok){
            console.log(data)
            setUpTitles(data)

        }
        return data;
    }

    //Will render out a generic List
    const setUpTitles = (data) =>
    {
        var titleArray =[];
        var postsArray = [];
        data.map((item,index)=>titleArray.push(item.title))
        data.map((item,index)=>postsArray.push(item.text))
        setTitles(titleArray)
        setPosts(postsArray)
    }

        //Will render out key-value pair from two arrays 
        const renderList = (array,array2) =>
        {
            return array.map((item,index)=>
            <React.Fragment>
                <Wrapper>
            <div>{item}</div>
            <div>{array2[index]}</div>
            </Wrapper>
            <p></p>
            </React.Fragment>
        )
        }

    return(


        <React.Fragment>
            {renderList(titles,posts)}
        </React.Fragment>

    )


}



export default Home;


const Wrapper = styled.section`
    padding: 1em;
    background: #fceec7;

`;
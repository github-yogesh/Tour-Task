import React from 'react'
import home from "../img/home.jpg"

const Home = () => {
    return (
        <>
           <div className="container my-5 ">
           <div className="px-5 py-5 mx-5 text-center">
           <img src={home} alt="Home page"></img>
           <h2><b>Happy Journey</b></h2>
           </div>   
           </div> 
        </>
    )
}

export default Home

import React from 'react'
import { NavLink } from 'react-router-dom'

const error = () => {
    return (
        <>
         <div className="container my-5">
             <h1><b>Something Went wrong</b></h1>
             <NavLink to="/">Return to home page</NavLink>
         </div>   
        </>
    )
}

export default error

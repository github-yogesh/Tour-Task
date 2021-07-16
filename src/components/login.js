import React, {useState,  useContext} from 'react'
import Log from "../img/log.jpg"
import { NavLink, useHistory } from 'react-router-dom'
import { userContext } from '../App'

const Login = () => {
    const history = useHistory()
    const{state, dispatch} = useContext(userContext)
    const mystyle = {

        height: "330px",
     
    }

    const inputs = {
        border:'none', borderBottom: '1px solid #1890ff', outline: 'none'
    }

    const  [user, setuser] = useState({
        email:"", password:""
    })

    let name, value 
    const handleInput = (e) =>{
        e.preventDefault()
        name = e.target.name
        value = e.target.value
        setuser({...user, [name]:value})
    }

    const dataSubmit = async (e) =>{
        e.preventDefault()

        const {email, password} = user

        const res = await fetch("/login", {
               
            method:"POST",
        headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
  
             email, password
            
          })

        })

        const data = await res.json()

        if(res.status === 401){

            alert("please fill all details")

        }else if(res.status === 402){

            alert("Credentials does not match")

        }else{

            dispatch({type:"USER", payload:true})
            alert("Login Sucesfull")
            history.push("/")
        }
    }


    return (
        <>
           <div className="container d-flex justify-content-center my-5">
                <div className="row ">
                <div className="col text-center">
                    <img src={Log} alt="Registration img" style={mystyle} className="rounded float-right"/>
                    <div className="">
                    <NavLink to="/signup">New one? Register now.</NavLink>
                    </div>
                    </div>
                    
                    <div className="col text-center py-5">
                    <br/><br/>
                    <blockquote class="blockquote text-center">
                            <h2 class="mb-0"><b>Login</b></h2>
                    </blockquote>
                    <br/>
                        <form className="" onSubmit={dataSubmit} method="POST">
                        <i className='fas fa-mail-bulk d-inline px-2' style={{fontSize:24}}></i>    
                            <input type="email" className="d-inline"
                            value={user.email}
                            onChange={handleInput}
                             placeholder="Email.." style={inputs}  name="email" autoComplete="off" /><br/><br/>
                        <i className='fas fa-lock d-inline px-2' style={{fontSize:24}}></i>    
                            <input type="password" className="d-inline"
                            value={user.password}
                            onChange={handleInput}
                             placeholder="Password.." style={inputs}   name="password" autoComplete="off" /><br/><br/>
                            <input type="submit" value="Login" className="btn btn-primary" />
                        </form>
                       

                    </div>
                   
                </div>
            </div>
        </>
    )
}

export default Login
